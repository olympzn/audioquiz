import { useState, useEffect, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import LoadingScreen from './components/LoadingScreen';
import { Difficulty } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

  useEffect(() => {
    const syncStateFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedCategory(params.get('category'));
      setSelectedDifficulty(params.get('difficulty') as Difficulty | null);
    };

    syncStateFromUrl();
    window.addEventListener('popstate', syncStateFromUrl);
    return () => window.removeEventListener('popstate', syncStateFromUrl);
  }, []);

  const handleSelectCategory = useCallback((category: string, difficulty: Difficulty) => {
    setLoadingCategory(category);
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      window.history.pushState({}, '', `?category=${category}&difficulty=${difficulty}`);
      setSelectedCategory(category);
      setSelectedDifficulty(difficulty);
      setIsLoading(false);
      setLoadingCategory(null);
    }, 2000); // 2 seconds loading
  }, []);

  const handleBack = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname.split('?')[0]);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  }, []);

  if (isLoading && loadingCategory) {
    return <LoadingScreen category={loadingCategory} />;
  }

  if (!selectedCategory || !selectedDifficulty) {
    return <HomeScreen onSelect={handleSelectCategory} />;
  }

  return (
    <GameScreen 
      category={selectedCategory} 
      difficulty={selectedDifficulty}
      onBack={handleBack} 
    />
  );
}
