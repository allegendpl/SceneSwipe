import { create } from 'zustand';
import { Scene, SceneCategory, UserPreferences } from '../types/Scene';
import { generateMockScene } from '../utils/sceneGenerator';

interface SceneStore {
  currentScene: Scene | null;
  sceneHistory: Scene[];
  favorites: Scene[];
  userPreferences: UserPreferences;
  isGenerating: boolean;
  currentCategory: SceneCategory;
  
  // Actions
  generateNewScene: () => Promise<void>;
  likeScene: (sceneId: string) => void;
  setCategory: (category: SceneCategory) => void;
  addToHistory: (scene: Scene) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  skipScene: () => void;
}

export const useSceneStore = create<SceneStore>((set, get) => ({
  currentScene: null,
  sceneHistory: [],
  favorites: [],
  userPreferences: {
    favoriteCategories: ['nature'],
    preferredStyles: ['realistic', 'cinematic'],
    swipeCount: 0,
    likedScenes: [],
  },
  isGenerating: false,
  currentCategory: 'nature',

  generateNewScene: async () => {
    set({ isGenerating: true });
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const { currentCategory, userPreferences } = get();
    const newScene = generateMockScene(currentCategory, userPreferences);
    
    set({ 
      currentScene: newScene, 
      isGenerating: false 
    });
  },

  likeScene: (sceneId: string) => set((state) => {
    const scene = state.currentScene;
    if (!scene || scene.id !== sceneId) return state;

    const updatedScene = { ...scene, isLiked: !scene.isLiked, likes: scene.isLiked ? scene.likes - 1 : scene.likes + 1 };
    const updatedLikedScenes = scene.isLiked 
      ? state.userPreferences.likedScenes.filter(id => id !== sceneId)
      : [...state.userPreferences.likedScenes, sceneId];

    return {
      currentScene: updatedScene,
      favorites: updatedScene.isLiked 
        ? [...state.favorites, updatedScene]
        : state.favorites.filter(s => s.id !== sceneId),
      userPreferences: {
        ...state.userPreferences,
        likedScenes: updatedLikedScenes,
      }
    };
  }),

  setCategory: (category: SceneCategory) => set({ currentCategory: category }),

  addToHistory: (scene: Scene) => set((state) => ({
    sceneHistory: [scene, ...state.sceneHistory.slice(0, 19)] // Keep last 20
  })),

  updatePreferences: (preferences: Partial<UserPreferences>) => set((state) => ({
    userPreferences: { ...state.userPreferences, ...preferences }
  })),

  skipScene: () => set((state) => ({
    userPreferences: {
      ...state.userPreferences,
      swipeCount: state.userPreferences.swipeCount + 1
    }
  })),
}));
