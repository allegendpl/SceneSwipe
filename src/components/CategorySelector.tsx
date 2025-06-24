import React from 'react';
import { SceneCategory } from '../types/Scene';
import { motion } from 'framer-motion';
import { 
  Trees, 
  Building2, 
  Sparkles, 
  Rocket, 
  Palette, 
  Camera 
} from 'lucide-react';

interface CategorySelectorProps {
  currentCategory: SceneCategory;
  onCategoryChange: (category: SceneCategory) => void;
}

const categoryIcons = {
  nature: Trees,
  urban: Building2,
  fantasy: Sparkles,
  scifi: Rocket,
  abstract: Palette,
  portrait: Camera,
};

const categoryLabels = {
  nature: 'Nature',
  urban: 'Urban',
  fantasy: 'Fantasy',
  scifi: 'Sci-Fi',
  abstract: 'Abstract',
  portrait: 'Portrait',
};

const categoryColors = {
  nature: { from: '#10b981', to: '#059669' },
  urban: { from: '#6b7280', to: '#475569' },
  fantasy: { from: '#a855f7', to: '#7c3aed' },
  scifi: { from: '#3b82f6', to: '#06b6d4' },
  abstract: { from: '#ec4899', to: '#f43f5e' },
  portrait: { from: '#f97316', to: '#f59e0b' },
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  currentCategory,
  onCategoryChange,
}) => {
  const categories = Object.keys(categoryIcons) as SceneCategory[];

  return (
    <motion.div 
      className="fixed top-20 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const isActive = currentCategory === category;
            const colors = categoryColors[category];
            
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={false}
                animate={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${colors.from}, ${colors.to})` 
                    : 'rgb(31, 41, 55)',
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{categoryLabels[category]}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
