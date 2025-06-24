import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const LoadingScene: React.FC = () => {
  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Loading Image Placeholder */}
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
          
          {/* Animated Sparkles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex items-center space-x-2 text-white"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <Sparkles className="w-8 h-8" />
              <span className="text-lg font-medium">Generating...</span>
            </motion.div>
          </div>
          
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: [-300, 300] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "linear" 
            }}
          />
        </div>
        
        {/* Loading Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="h-3 bg-gray-700 rounded animate-pulse w-16" />
              <div className="h-3 bg-gray-700 rounded animate-pulse w-20" />
            </div>
            <div className="flex space-x-2">
              <div className="w-12 h-5 bg-gray-700 rounded-full animate-pulse" />
              <div className="w-16 h-5 bg-gray-700 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <motion.div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          animate={{ x: [-100, 300] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ width: '30%' }}
        />
      </motion.div>
    </motion.div>
  );
};
