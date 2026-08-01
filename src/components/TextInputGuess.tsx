import React from "react";
import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function TextInputGuess({ 
  onGuess, 
  disabled,
  answer,
  guesses,
  suggestions = []
}: { 
  onGuess: (movie: string) => void; 
  disabled: boolean;
  answer: string;
  guesses: string[];
  suggestions?: string[];
}) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setInputValue('');
    setShowSuggestions(false);
  }, [answer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConfirm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      onGuess(inputValue.trim());
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const hasGuessed = guesses.length > 0;
  const isCorrect = hasGuessed && guesses[guesses.length - 1].toLowerCase().trim() === answer.toLowerCase().trim();
  const isWrong = hasGuessed && !isCorrect && inputValue.length === 0;

  const filteredSuggestions = inputValue.trim() 
    ? suggestions
        .filter(s => s.toLowerCase().includes(inputValue.toLowerCase().trim()) && s.toLowerCase() !== inputValue.toLowerCase().trim())
        .sort((a, b) => {
          const query = inputValue.toLowerCase().trim();
          const aStarts = a.toLowerCase().startsWith(query);
          const bStarts = b.toLowerCase().startsWith(query);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return a.localeCompare(b);
        })
    : [];

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div ref={containerRef} className="w-full max-w-md mt-8 flex flex-col gap-4">
      <form onSubmit={handleConfirm} className="w-full relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          disabled={disabled}
          placeholder="Digite o nome do filme..."
          className={`w-full p-4 pl-6 pr-14 rounded-xl border-2 transition-all font-medium bg-[#1a2027] outline-none ${
            isWrong 
              ? 'border-rose-500/50 text-rose-400 focus:border-rose-500' 
              : isCorrect
                ? 'border-[#a9f442]/50 text-[#a9f442] focus:border-[#a9f442]'
                : 'border-slate-700/50 text-slate-300 focus:border-[#a9f442]/50 focus:shadow-[0_0_15px_rgba(169,244,66,0.1)]'
          }`}
        />
        {isWrong && !disabled && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500">
            <AlertCircle size={20} />
          </div>
        )}
        
        {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
          <div className="absolute top-full left-0 w-full mt-2 bg-[#1a2027] border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-6 py-3 text-slate-300 hover:bg-[#202730] hover:text-[#a9f442] transition-colors border-b border-slate-800/50 last:border-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>

      {!disabled && (
        <button
          onClick={handleConfirm}
          disabled={!inputValue.trim()}
          className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg ${
            inputValue.trim() 
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
