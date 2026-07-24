import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function MultipleChoice({ 
  options, 
  onGuess, 
  disabled,
  guesses,
  answer
}: { 
  options: string[]; 
  onGuess: (movie: string) => void; 
  disabled: boolean;
  guesses: string[];
  answer: string;
}) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [answer]);

  const handleConfirm = () => {
    if (selected) {
      onGuess(selected);
    }
  };

  return (
    <div className="w-full max-w-md mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const isGuessed = guesses.includes(option);
          const isCorrect = option === answer;
          const isSelected = selected === option;
          
          let btnStyle = 'bg-[#1a2027] border-slate-700/50 hover:border-[#a9f442]/50 hover:bg-[#202730] text-slate-300';
          
          if (isGuessed) {
              if (isCorrect) {
                   btnStyle = 'bg-[#a9f442]/20 border-[#a9f442] text-[#a9f442]';
              } else {
                   btnStyle = 'bg-rose-500/10 border-rose-500/50 text-rose-400 opacity-50 cursor-not-allowed';
              }
          } else if (disabled && isCorrect) {
              btnStyle = 'bg-[#a9f442]/20 border-[#a9f442]/80 text-[#a9f442] opacity-80';
          } else if (isSelected) {
              btnStyle = 'bg-[#a9f442]/10 border-[#a9f442] text-[#a9f442] shadow-[0_0_15px_rgba(169,244,66,0.2)]';
          }

          return (
            <button
              key={option}
              onClick={() => {
                if (!disabled && !isGuessed) {
                  setSelected(option);
                }
              }}
              disabled={disabled || isGuessed}
              className={`flex items-center w-full p-4 rounded-xl border-2 transition-all font-medium text-left ${btnStyle}`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 border shrink-0 transition-colors ${
                (isGuessed && isCorrect) || (disabled && isCorrect)
                  ? 'bg-[#a9f442]/20 border-[#a9f442]/50 text-[#a9f442]'
                  : isGuessed 
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                    : isSelected
                      ? 'bg-[#a9f442]/30 border-[#a9f442] text-[#a9f442]'
                      : 'bg-[#10141a] border-slate-700/50 text-slate-500'
              }`}>
                {letters[index]}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {!disabled && (
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={`mt-4 w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg ${
            selected 
              ? 'bg-[#a9f442] hover:bg-[#9de43c] text-[#10141a] active:scale-95 shadow-[0_0_20px_rgba(169,244,66,0.3)]' 
              : 'bg-[#1a2027] text-slate-600 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <CheckCircle2 size={24} />
          Confirmar Resposta
        </button>
      )}
    </div>
  )
}

