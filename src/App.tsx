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
  const [loadCheckpoint, setLoadCheckpoint] = useState(false);

  useEffect(() => {
    const syncStateFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedCategory(params.get('category'));
      setSelectedDifficulty(params.get('difficulty') as Difficulty | null);
      setLoadCheckpoint(params.get('continue') === 'true');
    };

    syncStateFromUrl();
    window.addEventListener('popstate', syncStateFromUrl);
    return () => window.removeEventListener('popstate', syncStateFromUrl);
  }, []);

  const handleSelectCategory = useCallback((category: string, difficulty: Difficulty, isContinue: boolean = false) => {
    setLoadingCategory(category);
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      window.history.pushState({}, '', `?category=${category}&difficulty=${difficulty}${isContinue ? '&continue=true' : ''}`);
      setSelectedCategory(category);
      setSelectedDifficulty(difficulty);
      setLoadCheckpoint(isContinue);
      setIsLoading(false);
      setLoadingCategory(null);
    }, 2000); // 2 seconds loading
  }, []);

  const handleBack = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname.split('?')[0]);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setLoadCheckpoint(false);
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
      loadCheckpoint={loadCheckpoint}
      onBack={handleBack} 
    />
  );
}
