// src/utils/image.ts
export const makeImagePath = (path: string | null, size: 'w500' | 'original' = 'w500') => {
  if (!path) return ''; // або повернути placeholder
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

