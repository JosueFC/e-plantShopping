// Shared helpers for plant thumbnails.

// Generates a simple leaf-on-green thumbnail. Used when a plant has no photo URL
// or when a photo fails to load, so a thumbnail is always visible.
export const makePlaceholder = (name = 'Plant', color = '#2f7a4f') => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>` +
    `<rect width='100%' height='100%' fill='${color}'/>` +
    `<text x='50%' y='48%' font-size='110' text-anchor='middle'>🌿</text>` +
    `<text x='50%' y='72%' font-size='30' fill='white' text-anchor='middle' font-family='sans-serif'>${name}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Swap a broken image for the placeholder (guarded so it can't loop).
export const handleImageError = (e, name) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = makePlaceholder(name);
};
