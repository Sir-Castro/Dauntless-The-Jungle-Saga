import { AdMob, RewardAdPluginEvents } from '@capacitor-community/admob';

export const AdMobManager = {
    PROD_AD_UNIT_ID: 'ca-app-pub-4926715486042434/6089872952',
    TEST_AD_UNIT_ID: 'ca-app-pub-3940256099942544/5224354917',

    initialized: false,
    preloading: false,
    adLoaded: false,

    getAdUnitId(isTesting = false) {
        return isTesting ? this.TEST_AD_UNIT_ID : this.PROD_AD_UNIT_ID;
    },

    async init(isTesting = false) {
        if (this.initialized) return;
        try {
            await AdMob.initialize({
                requestTrackingAuthorization: true,
                initializeForTesting: isTesting,
            });
            this.initialized = true;
            console.log('AdMob Initialized');

            // Preload the first ad immediately after init to prevent lag later
            this.preloadRewardedAd(this.getAdUnitId(isTesting), isTesting);
        } catch (e) {
            console.error('AdMob Initialization failed', e);
        }
    },

    async preloadRewardedAd(adUnitId = this.PROD_AD_UNIT_ID, isTesting = false) {
        if (this.preloading || this.adLoaded) return;
        this.preloading = true;
        try {
            await AdMob.prepareRewardVideoAd({
                adId: adUnitId,
                isTesting,
            });
            this.adLoaded = true;
            console.log('Ad Preloaded');
        } catch (e) {
            console.error('Ad Preload failed', e);
        } finally {
            this.preloading = false;
        }
    },

    async showRewardedAd(adUnitId = this.PROD_AD_UNIT_ID, onReward, isTesting = false) {
        if (!this.checkAdAvailability()) {
            console.warn('Ad limit reached or cooldown active. Ignoring for testing.');
        }

        return new Promise(async (resolve, reject) => {
            const listeners = [];
            const cleanup = () => {
                listeners.forEach(l => l.remove());
            };

            try {
                if (!this.initialized) await this.init(isTesting);

                let rewardReceived = false;

                // Add Reward Listener
                listeners.push(await AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
                    rewardReceived = true;
                    this.recordAdView();
                    if (onReward) onReward(reward);
                    console.log('Reward Earned', reward);
                }));

                // Add Dismissed/Failure Listeners
                listeners.push(await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
                    cleanup();
                    resolve(rewardReceived);
                }));

                const onFail = (err) => {
                    this.adLoaded = false;
                    cleanup();
                    reject(err);
                };

                listeners.push(await AdMob.addListener(RewardAdPluginEvents.FailedToLoad, onFail));
                listeners.push(await AdMob.addListener(RewardAdPluginEvents.FailedToShow, onFail));

                // If not preloaded, prepare now
                if (!this.adLoaded) {
                    await AdMob.prepareRewardVideoAd({
                        adId: adUnitId,
                        isTesting,
                    });
                }

                await AdMob.showRewardVideoAd();
                this.adLoaded = false;

                // Preload next in background
                setTimeout(() => this.preloadRewardedAd(adUnitId, isTesting), 10000);
            } catch (e) {
                this.adLoaded = false;
                cleanup();

                // Simulation / Mock for non-native environments (Web)
                if (e?.message?.includes('unimplemented') || !window.Capacitor?.isNative) {
                    console.log('Simulating Ad (Web Fallback)...');
                    setTimeout(() => {
                        this.recordAdView();
                        if (onReward) onReward({ type: 'Coins', amount: 500 });
                        resolve(true);
                    }, 2000);
                } else {
                    reject(e);
                }
            }
        });
    },

    checkAdAvailability() {
        try {
            const stats = JSON.parse(localStorage.getItem('dauntless_ad_stats') || '{"views": [], "lastView": 0}');
            const now = Date.now();
            const today = new Date().toDateString();

            const todaysViews = stats.views.filter(v => new Date(v).toDateString() === today);
            if (todaysViews.length >= 10) return false;
            if (now - stats.lastView < 15000) return false;

            return true;
        } catch (e) {
            return true;
        }
    },

    recordAdView() {
        try {
            const stats = JSON.parse(localStorage.getItem('dauntless_ad_stats') || '{"views": [], "lastView": 0}');
            stats.views.push(Date.now());
            stats.lastView = Date.now();
            localStorage.setItem('dauntless_ad_stats', JSON.stringify(stats));
        } catch (e) {}
    }
};
