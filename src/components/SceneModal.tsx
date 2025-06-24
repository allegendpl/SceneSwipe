import React from 'react';
import { Scene } from '../types/Scene';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Eye, Tag, Palette } from 'lucide-react';

interface SceneModalProps {
  scene: Scene | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SceneModal: React.FC<SceneModalProps> = ({ scene, isOpen, onClose }) => {
  if (!scene) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-lg bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={scene.imageUrl}
                alt={scene.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{scene.title}</h2>
                <p className="text-gray-300">{scene.description}</p>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Created</p>
                    <p className="text-sm text-white">{scene.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <Eye className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400">Likes</p>
                    <p className="text-sm text-white">{scene.likes.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-400">Style</p>
                    <p className="text-sm text-white">{scene.style}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <Tag className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-xs text-gray-400">Resolution</p>
                    <p className="text-sm text-white">{scene.resolution}</p>
                  </div>
                </div>
              </div>
              
              {/* Prompt */}
              <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <h3 className="text-sm font-medium text-gray-300 mb-2">AI Prompt</h3>
                <p className="text-sm text-gray-100 leading-relaxed">{scene.prompt}</p>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {scene.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 text-sm rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
