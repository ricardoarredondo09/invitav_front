import React from 'react';
import { X } from 'lucide-react';
import { BLOCK_TYPES } from '../data/constants';

export default function AddBlockModal({ onClose, onAdd }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] p-6 sm:p-10 flex flex-col scale-in-center">
        <div className="flex justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div><h2 className="text-2xl sm:text-3xl font-black tracking-tight">Agregar Bloque</h2><p className="text-slate-500 text-xs sm:text-sm mt-1">Personaliza tu invitación.</p></div>
          <button onClick={onClose} className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"><X size={20} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto pr-2 custom-scrollbar pb-4">
          {BLOCK_TYPES.map(item => (
            <button key={item.type} onClick={() => onAdd(item.type)} className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:border-pink-500 hover:bg-slate-800 transition-all text-center group active:scale-95">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 group-hover:bg-pink-500 text-slate-400 group-hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-lg">{item.icon}</div>
              <div><p className="font-bold text-xs sm:text-sm tracking-tight">{item.label}</p><p className="text-[9px] sm:text-[10px] text-slate-500 mt-1 leading-tight hidden sm:block">{item.description}</p></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}