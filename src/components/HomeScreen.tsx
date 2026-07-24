import React from 'react';
import { Film, Swords, Wand2, MonitorPlay, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomeScreen({ onSelect }: { onSelect: (category: string) => void }) {
  return (
    <div className="min-h-screen bg-[#10141a] text-slate-50 selection:bg-[#a9f442]/30 overflow-x-hidden relative font-sans">
      
      {/* Background Glows */}
      <div className="fixed top-1/4 left-0 w-[400px] h-[400px] bg-[#a9f442]/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/2"></div>
      <div className="fixed bottom-1/4 right-0 w-[500px] h-[500px] bg-[#a9f442]/10 rounded-full blur-[140px] pointer-events-none translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-4 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 min-h-screen py-8 lg:py-24 relative z-10">
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

        <main className="w-full max-w-4xl flex flex-col items-center justify-center shrink">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-widest text-white uppercase mb-4">
              AUDIOQUIZ
            </h1>
            <p className="text-slate-400 text-lg mx-auto uppercase tracking-wide">
              O jogo onde você adivinha o filme pelo som
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-3xl mb-12">
            <CategoryButton 
              icon={<img src="/marvellogo.png" alt="Marvel" className="w-16 h-auto object-contain" />}
              title="MUNDO MARVEL"
              videoBg="/marvel-bg.mp4"
              onClick={() => onSelect('marvel')}
            />
            <CategoryButton 
              icon={<img src="/disneylogo.png" alt="Disney" className="w-16 h-auto object-contain" />}
              title="MUNDO DISNEY"
              videoBg="/abedisney.mp4"
              onClick={() => onSelect('disney')}
            />
            <CategoryButton 
              icon={<MonitorPlay size={40} className="text-[#a9f442]" />}
              title="CLÁSSICOS"
              onClick={() => onSelect('classicos')}
            />
          </div>

          {/* Espaço para Anúncio Mobile (Base) */}
          <div className="flex lg:hidden w-full h-[100px] bg-[#1a2027]/80 border border-slate-700/50 rounded-2xl flex-col items-center justify-center shrink-0 mt-4 mb-4">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
            <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
          </div>
        </main>

        {/* Espaço para Anúncio Direito */}
        <aside className="hidden lg:flex w-[300px] h-[600px] bg-[#1a2027]/80 border border-slate-700/50 rounded-3xl flex-col items-center justify-center shrink-0 lg:sticky top-24">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
          <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
        </aside>
      </div>
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
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-[140px] h-[160px] md:w-[160px] md:h-[180px] rounded-3xl flex flex-col items-center justify-center p-4 bg-[#1a2027] border border-slate-700/50 transition-all group hover:bg-[#202730] shadow-lg relative overflow-hidden"
    >
      {videoBg && (
        <video 
          src={videoBg} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#a9f442]/5 to-[#1a2027]/90 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="mb-3 drop-shadow-[0_0_15px_rgba(169,244,66,0.4)] relative z-10">
        {icon}
      </div>
      <h2 className="text-xs md:text-sm font-bold text-slate-200 text-center uppercase tracking-wider relative z-10">
        {title}
      </h2>
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#a9f442] text-[#10141a] flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 z-10 shadow-lg">
        <ArrowUpRight size={18} strokeWidth={3} />
      </div>
    </motion.button>
  );
}
