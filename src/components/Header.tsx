import React from 'react';
import { Sparkles, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick, onProfileClick }) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">SceneSwipe</h1>
            <p className="text-xs text-gray-400">AI Scene Generator</p>
          </div>
        </motion.div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={onSettingsClick}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={onProfileClick}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <User className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
