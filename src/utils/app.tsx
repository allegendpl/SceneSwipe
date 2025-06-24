import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneStore } from './store/useSceneStore';
import { Scene } from './types/Scene';
import { Header } from './components/Header';
import { CategorySelector } from './components/CategorySelector';
import { SceneCard } from './components/SceneCard';
import { LoadingScene } from './components/LoadingScene';
import { ActionButtons } from './components/ActionButtons';
import { SceneModal } from './components/SceneModal';

function App() {
  const {
    currentScene,
    isGenerating,
    currentCategory,
    generateNewScene,
    likeScene,
    setCategory,
    addToHistory,
    skipScene,
  } = useSceneStore();

  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Generate initial scene
    if (!currentScene && !isGenerating) {
      generateNewScene();
    }
  }, [currentScene, isGenerating, generateNewScene]);

  const handleSkip = () => {
    if (currentScene) {
      addToHistory(currentScene);
      skipScene();
      generateNewScene();
    }
  };

  const handleLike = () => {
    if (currentScene) {
      likeScene(currentScene.id);
      addToHistory(currentScene);
      generateNewScene();
    }
  };

  const handleCategoryChange = (category: typeof currentCategory) => {
    setCategory(category);
    generateNewScene();
  };

  const handleInfoClick = (scene: Scene) => {
    setSelectedScene(scene);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScene(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow" />
      </div>

      {/* Header */}
      <Header 
        onSettingsClick={() => {}}
        onProfileClick={() => {}}
      />

      {/* Category Selector */}
      <CategorySelector
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content */}
      <div className="pt-36 pb-8 px-4 relative z-10">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingScene />
            </motion.div>
          ) : currentScene ? (
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SceneCard
                scene={currentScene}
                onLike={() => likeScene(currentScene.id)}
                onSkip={handleSkip}
                onAccept={handleLike}
                onInfoClick={handleInfoClick}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Action Buttons */}
        <ActionButtons
          onSkip={handleSkip}
          onLike={handleLike}
          onRegenerate={generateNewScene}
          disabled={isGenerating}
        />
      </div>

      {/* Scene Details Modal */}
      <SceneModal
        scene={selectedScene}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Hint Text */}
      {!isGenerating && currentScene && (
        <motion.div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-500 text-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Swipe left to skip • Swipe right to like</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;
