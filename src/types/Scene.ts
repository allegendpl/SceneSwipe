export interface Scene {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: SceneCategory;
  tags: string[];
  createdAt: Date;
  likes: number;
  isLiked: boolean;
  prompt: string;
  style: string;
  resolution: string;
  aspectRatio: string;
}

export type SceneCategory = 'nature' | 'urban' | 'fantasy' | 'scifi' | 'abstract' | 'portrait';

export interface UserPreferences {
  favoriteCategories: SceneCategory[];
  preferredStyles: string[];
  swipeCount: number;
  likedScenes: string[];
}
