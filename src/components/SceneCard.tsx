import React, { useState } from 'react';
import { Scene } from '../types/Scene';
import { Heart, Share2, Download, Info } from 'lucide-react';
import { motion, PanInfo } from 'framer-motion';

interface SceneCardProps {
  scene: Scene;
  onLike: (sceneId: string) => void;
  onSkip: () => void;
  onAccept: () => void;
  onInfoClick: (scene: Scene) => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  onLike,
  onSkip,
  onAccept,
  onInfoClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    
    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      if (info.offset.x > 0) {
        onAccept();
      } else {
        onSkip();
      }
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDrag = (event: any, info: PanInfo) => {
    setDragOffset({ x: info.offset.x, y: info.offset.y });
  };

  const getSwipeIndicator = () => {
    if (Math.abs(dragOffset.x) < 50) return null;
    
    return (
      <motion.div
        className={`absolute inset-0 flex items-center justify-center z-10 rounded-2xl ${
          dragOffset.x > 0 
            ? 'bg-green-500/20 border-2 border-green-500' 
            : 'bg-red-500/20 border-2 border-red-500'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={`text-2xl font-bold ${
          dragOffset.x > 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {dragOffset.x > 0 ? '✓' : '✗'}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      animate={{
        x: dragOffset.x,
        rotate: dragOffset.x * 0.1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {getSwipeIndicator()}
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
          )}
          <img
            src={scene.imageUrl}
            alt={scene.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <motion.button
              onClick={() => onInfoClick(scene)}
              className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Info className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-white">{scene.title}</h3>
            <motion.button
              onClick={() => onLike(scene.id)}
              className={`p-2 rounded-full transition-all duration-200 ${
                scene.isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-5 h-5 ${scene.isLiked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {scene.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400">
                {scene.likes.toLocaleString()} likes
              </span>
              <span className="text-xs text-gray-400 capitalize">
                {scene.style}
              </span>
            </div>
            <div className="flex space-x-1">
              {scene.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
