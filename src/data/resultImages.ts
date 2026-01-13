// We need to import the actual files for Vite to handle them
// Since we can't dynamically import easily without import.meta.glob (which returns promises),
// we will generate this file with static imports.
// But first, let's create the static imports.

// This file is just a re-export of the array, but we need the actual imported values.
// So we will modify this file to use import.meta.glob eager.

const cardModules = import.meta.glob('@/assets/images/result/card_*.svg', { eager: true, as: 'url' });
const iconModules = import.meta.glob('@/assets/images/result/icon_*.svg', { eager: true, as: 'url' });

// Convert to array and sort to maintain consistency
export const RESULT_ILLUSTRATIONS = Object.keys(cardModules).sort().map(key => cardModules[key]);

// Explicitly map specific cards if we can identify them.
// Since we don't have identification, we rely on the sorted order.
// We have 24 cards and 22 food items.

export const RESULT_ICONS = Object.keys(iconModules).sort().map(key => iconModules[key]);
