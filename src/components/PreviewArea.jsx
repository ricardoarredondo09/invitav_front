import React from 'react';
import { Menu, Smartphone, Monitor, Eye, Share2 } from 'lucide-react';

export default function PreviewArea({ children, isMobilePreview, setIsMobilePreview, setSidebarOpen }) {
  return (
    <main className="flex-1 relative flex flex-col bg-slate-950 overflow-hidden w-full">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('[https://www.transparenttextures.com/patterns/cubes.png](https://www.transparenttextures.com/patterns/cubes.png)')]"></div>
      
      <header className="w-full min-h-16 py-3 border-b border-slate-800/50 flex items-center justify-between px-4 md:px-8 bg-slate-900/60 backdrop-blur-xl z-10 gap-2">
        <div className="flex items-center">
          <button className="md:hidden mr-4 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
              <button onClick={() => setIsMobilePreview(true)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${isMobilePreview ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><Smartphone size={16} /> Móvil</button>
              <button onClick={() => setIsMobilePreview(false)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${!isMobilePreview ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><Monitor size={16} /> Escritorio</button>
            </div>
            <div className="h-4 w-px bg-slate-700"></div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden md:block">Vista previa</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"><Eye size={16} /> Invitado</button>
          <button className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap"><Share2 size={16} /> COMPARTIR</button>
        </div>
      </header>

      <div className="flex-1 w-full overflow-y-auto p-0 sm:p-6 md:p-12 flex justify-center custom-scrollbar scroll-smooth">
        {children}
      </div>
    </main>
  );
}