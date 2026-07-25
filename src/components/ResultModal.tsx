import { motion } from 'motion/react';
import { RotateCcw, Film } from 'lucide-react';

export default function ResultModal({ 
  status, 
  answer, 
  videoUrl, 
  score, 
  onNext 
}: { 
  status: 'won' | 'lost'; 
  answer: string;
  videoUrl: string;
  score: number;
  onNext: () => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col lg:flex-row items-center justify-center p-4 gap-4 lg:gap-8 bg-[#10141a]/90 backdrop-blur-md overflow-y-auto"
    >
      {status === 'won' && (
        <aside className="hidden lg:flex w-[250px] xl:w-[300px] h-[500px] bg-[#1a2027]/80 border border-slate-700/50 rounded-3xl flex-col items-center justify-center shrink-0 shadow-xl z-0">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
          <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
        </aside>
      )}

      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-[#1a2027] border border-slate-700/50 rounded-3xl p-8 w-full max-w-lg shadow-2xl flex flex-col items-center text-center relative overflow-hidden z-10 shrink-0 my-8 lg:my-0"
      >
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r opacity-80 ${status === 'won' ? 'from-[#a9f442] to-[#80c829]' : 'from-rose-500 to-orange-500'}`} />

        <h2 className={`text-4xl font-black mb-3 mt-4 uppercase tracking-widest ${status === 'won' ? 'text-[#a9f442]' : 'text-rose-400'}`}>
          {status === 'won' ? 'Você Acertou!' : 'Fim de Jogo'}
        </h2>
        
        {status === 'won' ? (
          <p className="text-slate-400 mb-8 text-lg uppercase tracking-wide">
            O filme é: <span className="font-bold text-white block mt-1 text-2xl">{answer}</span>
          </p>
        ) : (
          <p className="text-slate-400 mb-8 text-lg uppercase tracking-wide">
            Você selecionou a alternativa incorreta.
          </p>
        )}

        {status === 'won' && (
          <div className="w-full aspect-video bg-[#10141a] rounded-2xl overflow-hidden mb-8 relative group border border-slate-700/50 shadow-inner">
             {videoUrl ? (
               <video 
                 src={videoUrl} 
                 controls 
                 autoPlay
                 playsInline
                 className="w-full h-full object-contain"
               />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-[#10141a]/50 p-6">
                 <Film size={48} className="mb-4 opacity-30 text-[#a9f442]" />
                 <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Vídeo indisponível</span>
               </div>
             )}
          </div>
        )}

        {status === 'won' && (
          <div className="text-3xl font-black text-[#a9f442] mb-8 flex items-center gap-3">
             <span className="text-slate-500 text-lg font-bold uppercase tracking-widest">Placar:</span> +{score}
          </div>
        )}

        <button 
          onClick={onNext}
          className="w-full py-4 bg-[#a9f442] text-[#10141a] hover:bg-[#9de43c] shadow-[0_0_20px_rgba(169,244,66,0.3)] rounded-xl font-bold transition-colors flex items-center justify-center text-lg active:scale-95"
        >
          <RotateCcw className="mr-3" size={24} />
          {status === 'won' ? 'Próxima Frase' : 'Tentar Novamente'}
        </button>
      </motion.div>

      {status === 'won' && (
        <aside className="hidden lg:flex w-[250px] xl:w-[300px] h-[500px] bg-[#1a2027]/80 border border-slate-700/50 rounded-3xl flex-col items-center justify-center shrink-0 shadow-xl z-0">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Espaço para</span>
          <span className="text-[#a9f442] font-black tracking-widest uppercase text-lg mt-1">Anúncio</span>
        </aside>
      )}
    </motion.div>
  )
}
