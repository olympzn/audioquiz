import { useState, useEffect, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

  useEffect(() => {
    const syncStateFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedCategory(params.get('category'));
    };

    syncStateFromUrl();

    window.addEventListener('popstate', syncStateFromUrl);
    return () => window.removeEventListener('popstate', syncStateFromUrl);
  }, []);

  const handleSelectCategory = useCallback((category: string) => {
    setLoadingCategory(category);
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      window.history.pushState({}, '', `?category=${category}`);
      setSelectedCategory(category);
      setIsLoading(false);
      setLoadingCategory(null);
    }, 2000); // 2 seconds loading
  }, []);

  const handleBack = useCallback(() => {
    window.history.pushState({}, '', window.location.pathname);
    setSelectedCategory(null);
  }, []);

  if (isLoading && loadingCategory) {
    return <LoadingScreen category={loadingCategory} />;
  }

  if (!selectedCategory) {
    return <HomeScreen onSelect={handleSelectCategory} />;
  }

  return (
    <GameScreen 
      category={selectedCategory} 
      onBack={handleBack} 
    />
  );
}
