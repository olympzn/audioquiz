import { useState, useEffect } from 'react';
import { Info, ArrowLeft } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import MultipleChoice from './MultipleChoice';
import TextInputGuess from './TextInputGuess';
import ResultModal from './ResultModal';
import { gameLevels } from '../data/gameData';
import { GameStatus, Difficulty, Level } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export default function GameScreen({ 
  category, 
  difficulty,
  onBack 
}: { 
  category: string; 
  difficulty: Difficulty;
  onBack: () => void;
}) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [totalScore, setTotalScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [levelsPassed, setLevelsPassed] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [adTimer, setAdTimer] = useState(5);
  const [adSequence, setAdSequence] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLevels, setActiveLevels] = useState<Level[]>([]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const baseLevels = gameLevels[category] || [];
    if (difficulty === 'dificil') {
      setActiveLevels([...baseLevels].sort(() => Math.random() - 0.5));
    } else {
      setActiveLevels(baseLevels);
    }
    setLevelIndex(0);
  }, [category, difficulty]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showInterstitial && adTimer > 0) {
      timer = setTimeout(() => setAdTimer(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [showInterstitial, adTimer]);

  const currentLevel = activeLevels[levelIndex];

  const allCategoryMovies = Array.from(new Set(
    (gameLevels[category] || []).flatMap(level => level.options || [])
  ));

  const handleGuess = (guess: string) => {
    if (status !== 'playing' || !currentLevel) return;

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    const isCorrect = guess.toLowerCase().trim() === currentLevel.movieTitle.toLowerCase().trim();

    if (isCorrect) {
      setStatus('won');
      setTotalScore(prev => prev + 100);
      
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    } else {
      if (difficulty === 'dificil') {
        setStatus('lost');
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }
  };

  const handleNextLevel = () => {
    const nextPassedCount = status === 'won' ? levelsPassed + 1 : levelsPassed;
    if (status === 'won') {
        setLevelsPassed(nextPassedCount);
    }

    if (status === 'won' && nextPassedCount > 0 && nextPassedCount % 3 === 0) {
        setAdTimer(5);
        setAdSequence(1);
        setShowInterstitial(true);
    } else {
        proceedToNextLevel();
    }
  };

  const handleNextAdOrLevel = () => {
    if (adSequence === 1) {
      setAdSequence(2);
      setAdTimer(5);
    } else {
      proceedToNextLevel();
    }
  };

  const proceedToNextLevel = () => {
    setIsLoading(true);
    setShowInterstitial(false);

    setTimeout(() => {
      if (status === 'won' && levelIndex < activeLevels.length - 1) {
        setLevelIndex(prev => prev + 1);
      } else if (status === 'won') {
        setLevelIndex(0);
        if (difficulty === 'dificil') {
          setActiveLevels([...activeLevels].sort(() => Math.random() - 0.5));
        }
      } else if (status === 'lost' && difficulty === 'dificil') {
        setLevelIndex(0);
        setActiveLevels([...activeLevels].sort(() => Math.random() - 0.5));
        setTotalScore(0);
      }
      
      setGuesses([]);
      setStatus('playing');
      setIsLoading(false);
    }, 2000);
  };

  if (!currentLevel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-slate-950">
        <h2 className="text-2xl mb-4">Em breve: Mais níveis para esta categoria!</h2>
        <button onClick={onBack} className="px-6 py-3 bg-indigo-600 rounded-xl font-bold">Voltar</button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#10141a] relative overflow-hidden font-sans">
        {/* Background Glows */}
        <div className="fixed top-1/4 left-0 w-[400px] h-[400px] bg-[#a9f442]/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 z-0"></div>
        <div className="fixed bottom-1/4 right-0 w-[500px] h-[500px] bg-[#a9f442]/10 rounded-full blur-[140px] pointer-events-none translate-x-1/3 z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center z-10"
        >
          <div className="w-16 h-16 border-4 border-[#1a2027] border-t-[#a9f442] rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-[#a9f442] animate-pulse">Carregando Fase...</h2>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-wider font-bold">Prepare-se</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#10141a] text-slate-50 font-sans selection:bg-[#a9f442]/30 overflow-x-hidden relative">
      
      {/* Background Glows */}
      <div className="fixed top-1/4 left-0 w-[400px] h-[400px] bg-[#a9f442]/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 z-0"></div>
      <div className="fixed bottom-1/4 right-0 w-[500px] h-[500px] bg-[#a9f442]/10 rounded-full blur-[140px] pointer-events-none translate-x-1/3 z-0"></div>

      <header className="w-full border-b border-slate-700/50 bg-[#10141a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="text-slate-400 hover:text-[#a9f442] transition-colors bg-[#1a2027] border border-slate-700/50 p-2 rounded-full hover:bg-[#202730] mr-2"
            >
              <ArrowLeft size={20} />
            </button>
            <img src="/dioquizlogo.png" alt="Dioquiz" className="h-8 w-auto hidden sm:block object-contain drop-shadow-[0_0_8px_rgba(169,244,66,0.2)]" />
            {category === 'marvel' ? (
              <img src="/marvellogo.png" alt="Marvel" className="h-6 w-auto sm:ml-2 object-contain" />
            ) : category === 'disney' ? (
              <img src="/disneylogo.png" alt="Disney" className="h-6 w-auto sm:ml-2 object-contain" />
            ) : (
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest sm:ml-2">
                Clássicos
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Pontuação</span>
              <span className="font-mono text-lg font-bold text-[#a9f442] leading-none">{totalScore}</span>
            </div>
            <button 
              onClick={() => setShowInfo(true)}
              className="text-slate-400 hover:text-[#a9f442] transition-colors bg-[#1a2027] border border-slate-700/50 p-2 rounded-full hover:bg-[#202730]"
            >
              <Info size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 py-8 relative z-10">
        {/* Espaço para Anúncio Mobile (Topo) */}
        <div className="flex lg:hidden w-full h-[100px] bg-[#1a2027]/80 border border-slate-700/50 rounded-2xl flex-col items-center justify-center shrink-0 mb-4">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
          <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
        </div>

        {/* Espaço para Anúncio Esquerdo */}
        <aside className="hidden lg:flex w-[300px] h-[600px] bg-[#1a2027]/80 border border-slate-700/50 rounded-3xl flex-col items-center justify-center shrink-0 lg:sticky top-24">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
          <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
        </aside>

        <motion.main 
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl flex flex-col items-center shrink"
        >
          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-1.5 bg-[#a9f442]/10 text-[#a9f442] text-sm font-bold rounded-full border border-[#a9f442]/20 mb-4 tracking-widest uppercase">
              Nível {levelIndex + 1} de {activeLevels.length}
            </span>
            <p className="text-slate-400 max-w-md mx-auto text-lg leading-relaxed mb-2 uppercase tracking-wide">
              Ouça o áudio e selecione a alternativa correta
            </p>
          </div>

          <AudioPlayer src={currentLevel.audioUrl} shouldPause={status !== 'playing'} />
          
          {difficulty === 'facil' ? (
            <MultipleChoice 
              options={currentLevel.options || []}
              onGuess={handleGuess} 
              disabled={status !== 'playing'} 
              guesses={guesses}
              answer={currentLevel.movieTitle}
            />
          ) : (
            <TextInputGuess
              onGuess={handleGuess}
              disabled={status !== 'playing'}
              guesses={guesses}
              answer={currentLevel.movieTitle}
              suggestions={allCategoryMovies}
            />
          )}

          {/* Espaço para Anúncio Mobile (Base) */}
          <div className="flex lg:hidden w-full h-[100px] bg-[#1a2027]/80 border border-slate-700/50 rounded-2xl flex-col items-center justify-center shrink-0 mt-8 mb-4">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
            <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
          </div>
        </motion.main>

        {/* Espaço para Anúncio Direito */}
        <aside className="hidden lg:flex w-[300px] h-[600px] bg-[#1a2027]/80 border border-slate-700/50 rounded-3xl flex-col items-center justify-center shrink-0 lg:sticky top-24">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
          <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
        </aside>
      </div>

      <AnimatePresence>
        {status !== 'playing' && !showInterstitial && (
          <ResultModal 
            status={status}
            answer={currentLevel.movieTitle}
            videoUrl={currentLevel.videoUrl}
            score={status === 'won' ? 100 : 0}
            onNext={handleNextLevel}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10141a]/90 backdrop-blur-md"
            onClick={() => setShowInfo(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#1a2027] border border-slate-700/50 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#a9f442] opacity-80" />
              <h3 className="text-2xl font-black mb-6 text-white flex items-center gap-2 uppercase tracking-widest">
                <Info className="text-[#a9f442]" />
                Como Jogar
              </h3>
              <ul className="space-y-5 text-slate-300">
                <li className="flex items-start gap-4">
                  <span className="bg-[#a9f442]/20 text-[#a9f442] w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">1</span>
                  <span className="leading-relaxed">Ouça o clipe de áudio apertando o botão de Play.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-[#a9f442]/20 text-[#a9f442] w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">2</span>
                  <span className="leading-relaxed">Escolha a alternativa correta na lista (A, B, C, D ou E).</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-[#a9f442]/20 text-[#a9f442] w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">3</span>
                  <span className="leading-relaxed">Se acertar, você ganha <strong className="text-white">100</strong> pontos. Se errar, o jogo termina para este nível.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-[#a9f442]/20 text-[#a9f442] w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">4</span>
                  <span className="leading-relaxed">Ao acertar, assista à cena original do filme!</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowInfo(false)}
                className="w-full mt-8 py-4 bg-[#a9f442] text-[#10141a] hover:bg-[#9de43c] rounded-xl font-bold transition-colors text-lg active:scale-95 shadow-[0_0_20px_rgba(169,244,66,0.3)]"
              >
                Entendi!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInterstitial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10141a]/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#1a2027] border border-slate-700/50 p-8 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#a9f442] opacity-80" />
              
              <div className="w-full h-[250px] bg-[#10141a]/50 border border-slate-700/50 border-dashed rounded-2xl flex flex-col items-center justify-center mb-6">
                <span className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-2">Espaço para</span>
                <span className="text-[#a9f442] font-black tracking-widest uppercase text-2xl">Anúncio {adSequence} de 2</span>
                <span className="text-slate-500 text-sm mt-4">Pausa patrocinada</span>
              </div>

              <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-widest">
                Bom jogo!
              </h3>
              <p className="text-slate-400 mb-8 uppercase tracking-wide">
                Continue adivinhando os filmes.
              </p>

              <button 
                onClick={handleNextAdOrLevel}
                disabled={adTimer > 0}
                className={`w-full py-4 rounded-xl font-bold transition-all text-lg shadow-lg ${
                  adTimer > 0
                    ? 'bg-[#10141a] text-slate-500 cursor-not-allowed border border-slate-700/50'
                    : 'bg-[#a9f442] text-[#10141a] hover:bg-[#9de43c] active:scale-95 shadow-[0_0_20px_rgba(169,244,66,0.3)]'
                }`}
              >
                {adTimer > 0 ? `Aguarde ${adTimer}s` : (adSequence === 1 ? 'Pular Anúncio 1' : 'Pular / Continuar Jogando')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
