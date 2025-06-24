import { Scene, SceneCategory, UserPreferences } from '../types/Scene';

const mockImages = {
  nature: [
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  urban: [
    'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  fantasy: [
    'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  scifi: [
    'https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1694310/pexels-photo-1694310.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  abstract: [
    'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1451666/pexels-photo-1451666.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  portrait: [
    'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
};

const prompts = {
  nature: [
    'Misty forest at dawn with golden sunlight filtering through ancient trees',
    'Serene mountain lake reflecting snow-capped peaks under starry sky',
    'Cascading waterfall surrounded by lush tropical vegetation',
    'Rolling hills covered in wildflowers during spring bloom',
    'Dramatic coastal cliffs with crashing waves at sunset',
  ],
  urban: [
    'Bustling city street at night with neon reflections on wet pavement',
    'Modern skyscrapers reaching into cloudy sky with glass reflections',
    'Cozy coffee shop corner with warm lighting and urban view',
    'Street art mural on old brick wall in artistic neighborhood',
    'Busy intersection with light trails from passing traffic',
  ],
  fantasy: [
    'Enchanted castle floating on clouds above mystical realm',
    'Ancient dragon sleeping on treasure hoard in crystal cave',
    'Magical forest with glowing mushrooms and fairy lights',
    'Wizard tower with swirling galaxies visible through windows',
    'Ethereal bridge connecting floating islands in the sky',
  ],
  scifi: [
    'Futuristic city with flying vehicles and holographic displays',
    'Space station orbiting distant planet with binary suns',
    'Cyberpunk alley with neon signs and augmented reality overlays',
    'Alien landscape with strange geometric formations and purple sky',
    'Advanced laboratory with glowing energy cores and robotic assistants',
  ],
  abstract: [
    'Flowing geometric patterns in vibrant colors and gradients',
    'Crystalline structures refracting light into rainbow spectrums',
    'Fluid dynamics creating organic shapes in metallic textures',
    'Fractal patterns expanding infinitely with mathematical precision',
    'Energy waves pulsing through dimensional space-time fabric',
  ],
  portrait: [
    'Contemplative figure silhouetted against dramatic sunset sky',
    'Close-up portrait with striking eyes and soft natural lighting',
    'Artist at work in sun-drenched studio with creative energy',
    'Musician performing with passion on intimate stage setting',
    'Child discovering wonder in simple everyday moment',
  ],
};

const styles = ['Realistic', 'Cinematic', 'Artistic', 'Minimalist', 'Dramatic', 'Dreamy', 'Vintage', 'Modern'];
const tags = ['atmospheric', 'detailed', 'high-contrast', 'soft-lighting', 'vivid-colors', 'composition', 'texture', 'mood'];

export function generateMockScene(category: SceneCategory, preferences: UserPreferences): Scene {
  const categoryImages = mockImages[category];
  const categoryPrompts = prompts[category];
  
  const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];
  const randomPrompt = categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  const randomTags = tags.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
  
  return {
    id: `scene_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Scene`,
    description: randomPrompt,
    imageUrl: randomImage,
    category,
    tags: randomTags,
    createdAt: new Date(),
    likes: Math.floor(Math.random() * 1000) + 50,
    isLiked: preferences.likedScenes.length > 0 && Math.random() > 0.8,
    prompt: randomPrompt,
    style: randomStyle,
    resolution: '1024x1024',
    aspectRatio: '1:1',
  };
}
