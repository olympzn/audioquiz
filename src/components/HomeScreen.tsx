import React, { useState, useEffect } from 'react';
import { Film, Swords, Wand2, MonitorPlay, ArrowUpRight, Volume2, HelpCircle, CheckCircle2, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Difficulty, Checkpoint } from '../types';

export default function HomeScreen({ onSelect }: { onSelect: (category: string, difficulty: Difficulty, isContinue?: boolean) => void }) {
  const currentYear = new Date().getFullYear();
  const [selectedCategoryForDiff, setSelectedCategoryForDiff] = useState<string | null>(null);
  const [categoryForContinueModal, setCategoryForContinueModal] = useState<string | null>(null);
  const [checkpoints, setCheckpoints] = useState<Record<string, Checkpoint>>({});

  useEffect(() => {
    try {
      const cps: Record<string, Checkpoint> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('dioquiz_checkpoint_')) {
          const stored = localStorage.getItem(key);
          if (stored) {
            const cp = JSON.parse(stored);
            cps[cp.category] = cp;
          }
        }
      }
      setCheckpoints(cps);
    } catch (e) {
      console.error('Failed to load checkpoints', e);
    }
  }, []);

  const handleDifficultySelect = (diff: Difficulty) => {
    if (selectedCategoryForDiff) {
      onSelect(selectedCategoryForDiff, diff, false);
      setSelectedCategoryForDiff(null);
    }
  };

  const handleContinue = (category: string) => {
    const cp = checkpoints[category];
    if (cp) {
      onSelect(cp.category, cp.difficulty, true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-slate-50 selection:bg-[#a9f442]/30 overflow-x-hidden relative font-sans flex flex-col">
      <AnimatePresence>
        {categoryForContinueModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0a0d12]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#1a2027] border border-slate-700/50 p-6 md:p-8 rounded-3xl max-w-xl w-full shadow-2xl relative overflow-hidden text-center"
            >
              <button 
                onClick={() => setCategoryForContinueModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/50 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-black text-[#a9f442] uppercase tracking-widest mb-6">Jogo Salvo Encontrado</h2>
              <p className="text-slate-300 mb-8 text-lg">
                Você tem um jogo salvo na <span className="text-[#a9f442] font-black">Fase {checkpoints[categoryForContinueModal]?.levelsPassed + 1}</span> da categoria {categoryForContinueModal.toUpperCase()}.<br/>
                Deseja continuar de onde parou ou iniciar um novo jogo?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    handleContinue(categoryForContinueModal);
                    setCategoryForContinueModal(null);
                  }}
                  className="bg-[#a9f442] text-[#10141a] px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#9de43c] transition-all shadow-[0_0_20px_rgba(169,244,66,0.3)] hover:shadow-[0_0_30px_rgba(169,244,66,0.5)] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Play size={18} className="fill-current" />
                  Continuar
                </button>
                <button 
                  onClick={() => {
                    const cat = categoryForContinueModal;
                    setCategoryForContinueModal(null);
                    setSelectedCategoryForDiff(cat);
                  }}
                  className="bg-[#161b22] border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center"
                >
                  Novo Jogo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {selectedCategoryForDiff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0a0d12]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#1a2027] border border-slate-700/50 p-6 md:p-8 rounded-3xl max-w-xl w-full shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedCategoryForDiff(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/50 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-black text-[#a9f442] uppercase tracking-widest mb-6 text-center">Selecione a Dificuldade</h2>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleDifficultySelect('facil')}
                  className="bg-[#161b22] border border-slate-700 hover:border-[#a9f442] p-4 rounded-xl flex flex-col items-start transition-all group"
                >
                  <span className="text-[#a9f442] font-black uppercase tracking-widest text-lg mb-1 group-hover:scale-105 origin-left transition-transform">Fácil</span>
                  <span className="text-slate-400 text-sm text-left">As alternativas serão mostradas para você escolher.</span>
                </button>

                <button 
                  onClick={() => handleDifficultySelect('medio')}
                  className="bg-[#161b22] border border-slate-700 hover:border-amber-400 p-4 rounded-xl flex flex-col items-start transition-all group"
                >
                  <span className="text-amber-400 font-black uppercase tracking-widest text-lg mb-1 group-hover:scale-105 origin-left transition-transform">Médio</span>
                  <span className="text-slate-400 text-sm text-left">Sem alternativas! Você precisará digitar o nome do filme.</span>
                </button>

                <button 
                  onClick={() => handleDifficultySelect('dificil')}
                  className="bg-[#161b22] border border-slate-700 hover:border-rose-500 p-4 rounded-xl flex flex-col items-start transition-all group"
                >
                  <span className="text-rose-500 font-black uppercase tracking-widest text-lg mb-1 group-hover:scale-105 origin-left transition-transform">Difícil</span>
                  <span className="text-slate-400 text-sm text-left">Digite o nome. Se errar uma vez, você volta para a fase 1 com filmes aleatórios!</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#a9f442]/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#a9f442]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2"></div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col relative z-10">
        
        {/* Header */}
        <header className="w-full bg-[#161b22]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/dioquizlogo.png" alt="Dioquiz" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(169,244,66,0.3)]" />
            </div>
            <nav className="hidden md:flex gap-6">
              <button className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#a9f442] transition-colors">Como Jogar</button>
              <button className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#a9f442] transition-colors">Categorias</button>
            </nav>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto px-4 w-full flex flex-col items-center justify-start gap-12 pt-8 md:pt-12 pb-24">
          {/* Espaço para Anúncio Mobile (Topo) */}
          <div className="flex w-full max-w-4xl h-[100px] bg-[#1a2027]/80 border border-slate-700/50 rounded-2xl flex-col items-center justify-center shrink-0 mx-auto mt-4">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
            <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
          </div>

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center w-full max-w-4xl mt-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-widest text-white uppercase mb-6 drop-shadow-[0_0_20px_rgba(169,244,66,0.2)]">
              Descubra o Filme <br/> <span className="text-[#a9f442]">Pelo Som</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mx-auto uppercase tracking-widest font-medium mb-8">
              Teste seus conhecimentos cinematográficos!
            </p>


          </motion.div>

        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 mt-4">
          {/* Espaço para Anúncio Esquerdo */}
          <aside className="hidden lg:flex w-[250px] xl:w-[300px] h-[600px] bg-[#1a2027]/80 border border-slate-700/50 rounded-3xl flex-col items-center justify-center shrink-0 lg:sticky top-24">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
            <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
          </aside>

          {/* Categories */}
          <main className="w-full max-w-3xl flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <h2 className="text-center text-xl font-black text-[#a9f442] uppercase tracking-widest mb-8">Escolha sua Categoria</h2>
              <div className="flex flex-wrap justify-center gap-6 w-full mb-12">
                <div className="flex flex-col items-center gap-3">
                  <CategoryButton 
                    icon={<img src="/marvellogo.png" alt="Marvel" className="w-16 h-auto object-contain" />}
                    title="MUNDO MARVEL"
                    videoBg="/marvel-bg.mp4"
                    onClick={() => {
                      if (checkpoints['marvel']) {
                        setCategoryForContinueModal('marvel');
                      } else {
                        setSelectedCategoryForDiff('marvel');
                      }
                    }}
                  />
                  
                </div>

                <div className="flex flex-col items-center gap-3">
                  <CategoryButton 
                    icon={<img src="/disneylogo.png" alt="Disney" className="w-16 h-auto object-contain" />}
                    title="MUNDO DISNEY"
                    videoBg="/abedisney.mp4"
                    onClick={() => {
                      if (checkpoints['disney']) {
                        setCategoryForContinueModal('disney');
                      } else {
                        setSelectedCategoryForDiff('disney');
                      }
                    }}
                  />
                  
                </div>

                <div className="flex flex-col items-center gap-3">
                  <CategoryButton 
                    icon={<MonitorPlay size={40} className="text-[#a9f442]" />}
                    title="CLÁSSICOS"
                    onClick={() => {
                      if (checkpoints['classicos']) {
                        setCategoryForContinueModal('classicos');
                      } else {
                        setSelectedCategoryForDiff('classicos');
                      }
                    }}
                  />
                  
                </div>
              </div>
            </motion.div>
          </main>

          {/* Espaço para Anúncio Direito */}
          <aside className="hidden lg:flex w-[250px] xl:w-[300px] h-[600px] bg-[#1a2027]/80 border border-slate-700/50 rounded-3xl flex-col items-center justify-center shrink-0 lg:sticky top-24">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
            <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
          </aside>
        </div>

        {/* How it works */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl mt-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Como Funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            <div className="bg-[#161b22]/80 border border-slate-800 rounded-2xl p-6 flex flex-col items-start gap-4 transition-colors hover:bg-[#1a2027]/90 hover:border-slate-700 overflow-hidden group">
              <div className="w-full h-24 bg-[#1a2027] rounded-xl border border-slate-700/50 flex flex-col items-center justify-center relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl" />
                 <div className="flex items-end gap-1.5 h-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: ["20%", "100%", "40%", "80%", "30%"] }} 
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: i * 0.15 }} 
                        className="w-1.5 bg-blue-400 rounded-full" 
                      />
                    ))}
                 </div>
                 <Volume2 size={16} className="text-slate-500 absolute bottom-3 right-3" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Passo 01</span>
                <h3 className="text-base font-bold text-slate-200 mb-2">Ouça o Áudio</h3>
                <p className="text-sm text-slate-400">Preste atenção aos detalhes sonoros, vozes e efeitos de fundo.</p>
              </div>
            </div>

            <div className="bg-[#161b22]/80 border border-slate-800 rounded-2xl p-6 flex flex-col items-start gap-4 transition-colors hover:bg-[#1a2027]/90 hover:border-slate-700 overflow-hidden group">
               <div className="w-full h-24 bg-[#1a2027] rounded-xl border border-slate-700/50 flex flex-col items-center justify-center relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl" />
                 
                 <div className="flex items-center gap-2 w-1/2">
                   <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 rounded-full bg-slate-500 shrink-0" />
                   <motion.div 
                     className="h-[2px] bg-gradient-to-r from-slate-500 to-purple-400 w-full origin-left" 
                     animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0], originX: [0, 0, 1, 1] }} 
                     transition={{ repeat: Infinity, duration: 2, times: [0, 0.4, 0.6, 1] }} 
                   />
                   <motion.div animate={{ scale: [1, 1.3, 1], backgroundColor: ["#64748b", "#c084fc", "#64748b"] }} transition={{ repeat: Infinity, duration: 2, delay: 0.8 }} className="w-3 h-3 rounded-full bg-slate-500 shrink-0 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                 </div>

                 <HelpCircle size={16} className="text-slate-500 absolute bottom-3 right-3" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Passo 02</span>
                <h3 className="text-base font-bold text-slate-200 mb-2">Conecte as Pistas</h3>
                <p className="text-sm text-slate-400">Use seu conhecimento cinematográfico para identificar o filme.</p>
              </div>
            </div>

            <div className="bg-[#161b22]/80 border border-slate-800 rounded-2xl p-6 flex flex-col items-start gap-4 transition-colors hover:bg-[#1a2027]/90 hover:border-slate-700 overflow-hidden group">
               <div className="w-full h-24 bg-[#1a2027] rounded-xl border border-slate-700/50 flex flex-col items-center justify-center relative px-6">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#a9f442]/5 to-transparent rounded-xl" />
                 
                 <div className="flex flex-col gap-2 w-full">
                    <motion.div className="h-2 rounded-full bg-slate-700/50 w-full" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3 }} />
                    <motion.div className="h-2 rounded-full bg-[#a9f442]" animate={{ scaleX: [0.9, 1, 0.9], opacity: [0.5, 1, 1, 0.5], backgroundColor: ["#334155", "#334155", "#a9f442", "#334155"] }} transition={{ repeat: Infinity, duration: 3, times: [0, 0.4, 0.5, 1] }} />
                    <motion.div className="h-2 rounded-full bg-slate-700/50 w-3/4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3, delay: 0.2 }} />
                 </div>

                 <CheckCircle2 size={16} className="text-[#a9f442] absolute bottom-3 right-3" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Passo 03</span>
                <h3 className="text-base font-bold text-[#a9f442] mb-2">Dê seu Palpite</h3>
                <p className="text-sm text-slate-400">Escolha uma das alternativas corretamente e avance de fase.</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Espaço para Anúncio Mobile (Base) - Movido para abaixo de Como Funciona */}
        <div className="flex lg:hidden w-full max-w-4xl h-[250px] bg-[#1a2027]/80 border border-slate-700/50 rounded-2xl flex-col items-center justify-center shrink-0 mt-8 mb-4">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
          <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
        </div>
      </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#161b22] border-t border-slate-800 py-8 relative z-20 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm font-medium">
            &copy; {currentYear} Dioquiz. Todos os direitos reservados.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <button className="text-slate-400 hover:text-[#a9f442] text-sm transition-colors uppercase tracking-wider font-bold">
              Termos de Uso
            </button>
            <button className="text-slate-400 hover:text-[#a9f442] text-sm transition-colors uppercase tracking-wider font-bold">
              Política de Privacidade
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryButton({ 
  icon, 
  title, 
  videoBg,
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  videoBg?: string;
  onClick: () => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(e => console.log("Video play failed:", e));
    }
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-[140px] h-[160px] md:w-[160px] md:h-[180px] rounded-3xl flex flex-col items-center justify-center p-4 bg-[#1a2027] border border-slate-700/50 transition-all duration-300 group hover:bg-[#202730] shadow-lg hover:shadow-[0_10px_40px_rgba(169,244,66,0.3)] hover:border-[#a9f442]/50 relative overflow-hidden"
    >
      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a9f442]/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-20 pointer-events-none skew-x-12"></div>

      {videoBg && (
        <video 
          ref={videoRef}
          src={videoBg} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 pointer-events-none"
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#a9f442]/5 to-[#1a2027]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="mb-3 drop-shadow-[0_0_15px_rgba(169,244,66,0.4)] relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
        {icon}
      </div>
      
      <h2 className="text-xs md:text-sm font-bold text-slate-200 text-center uppercase tracking-wider relative z-10 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#a9f442] group-hover:drop-shadow-[0_0_8px_rgba(169,244,66,0.5)]">
        {title}
      </h2>
      
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#a9f442] text-[#10141a] flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 z-10 shadow-[0_0_15px_rgba(169,244,66,0.6)]">
        <ArrowUpRight size={18} strokeWidth={3} />
      </div>
    </motion.button>
  );
}
