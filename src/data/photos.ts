export type PhotoCategory = string; // free-form, user-managed

export type Photo = {
  id: string;
  uri: string;              // durable file:// URI in documentDirectory
  title: string;
  description: string;
  category: PhotoCategory;
  capturedAt: string;       // ISO date string
  width: number;
  height: number;
};

export const DEFAULT_CATEGORIES: PhotoCategory[] = ['Favorites', 'Unsorted', 'In Progress'];

export const PHOTO_CATEGORIES_KEY = '@gadportfolio/photoCategories/v1';
export const PHOTOS_KEY = '@gadportfolio/photos/v1';