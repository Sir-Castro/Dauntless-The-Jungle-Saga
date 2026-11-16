const memoryCache = new Map();

export const getCachedImage = (src) => {
    if (!src) return src;
    if (!memoryCache.has(src)) {
        const img = new window.Image();
        img.src = src;
        memoryCache.set(src, img);
    }
    return src;
};
