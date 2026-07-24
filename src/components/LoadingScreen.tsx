import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen({ category }: { category: string }) {
  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'marvel': return 'MUNDO MARVEL';
      case 'disney': return 'MUNDO DISNEY';
      case 'pixar': return 'MUNDO PIXAR';
      case 'super-herois': return 'SUPER HERÓIS';
      default: return 'CARREGANDO';
    }
  };

  return (
    <div className="min-h-screen bg-[#10141a] text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8 text-[#a9f442]"
        >
          <Loader2 size={64} strokeWidth={1.5} />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-4xl font-black text-center tracking-tight mb-4"
        >
          PREPARANDO <span className="text-[#a9f442]">{getCategoryName(category)}</span>...
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-slate-400 text-sm md:text-base text-center"
        >
          Ajustando os detalhes da sua aventura.
        </motion.p>
      </motion.div>
    </div>
  );
}
