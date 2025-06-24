import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart, RotateCcw } from 'lucide-react';

interface ActionButtonsProps {
  onSkip: () => void;
  onLike: () => void;
  onRegenerate: () => void;
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSkip,
  onLike,
  onRegenerate,
  disabled = false,
}) => {
  return (
    <motion.div
      className="flex items-center justify-center space-x-6 py-6"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.button
        onClick={onSkip}
        disabled={disabled}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          disabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-red-400 hover:bg-red-500 hover:text-white active:scale-95'
        }`}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.9 } : {}}
      >
        <X className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={onRegenerate}
        disabled={disabled}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          disabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-blue-400 hover:bg-blue-500 hover:text-white active:scale-95'
        }`}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.9 } : {}}
      >
        <RotateCcw className="w-5 h-5" />
      </motion.button>

      <motion.button
        onClick={onLike}
        disabled={disabled}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          disabled
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-800 text-green-400 hover:bg-green-500 hover:text-white active:scale-95'
        }`}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.9 } : {}}
      >
        <Heart className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
};
