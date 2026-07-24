import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AudioPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(false);
  }, [src]);

  const togglePlay = () => {
    if (!src) {
      setError(true);
      return;
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
             setError(true);
             setIsPlaying(false);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#1a2027] rounded-2xl border border-slate-700/50 shadow-xl w-full max-w-md">
      <div className="text-slate-400 text-sm mb-6 font-bold tracking-widest uppercase flex items-center gap-2">
        <Volume2 size={16} /> Ouça a Frase
      </div>
      
      <button 
        onClick={togglePlay}
        className="w-24 h-24 flex items-center justify-center bg-[#a9f442] hover:bg-[#9de43c] rounded-full text-[#10141a] transition-all shadow-[0_0_20px_rgba(169,244,66,0.3)] active:scale-95 group relative mb-4"
      >
        {isPlaying ? (
          <div className="flex items-center justify-center gap-1 h-10 w-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-[#10141a] rounded-full"
                animate={{ height: ['40%', '100%', '40%'] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15
                }}
              />
            ))}
          </div>
        ) : (
          <Play size={40} className="ml-2 fill-current group-hover:scale-110 transition-transform" />
        )}
      </button>

      {src && (
        <div className="text-[#a9f442] font-mono text-sm tracking-widest bg-[#10141a] px-4 py-1.5 rounded-full border border-slate-700/50 shadow-inner">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      )}

      {error && !src && (
        <div className="mt-6 flex items-center text-amber-400 text-sm bg-amber-400/10 px-4 py-3 rounded-lg border border-amber-400/20">
          <AlertCircle size={20} className="mr-3 shrink-0" />
          <span className="leading-snug">
            Áudio não configurado. Adicione a URL do arquivo no <b>data.ts</b>
          </span>
        </div>
      )}

      {src && (
        <audio 
          ref={audioRef} 
          src={src} 
          onEnded={() => setIsPlaying(false)} 
          onError={() => setError(true)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
    </div>
  )
}
