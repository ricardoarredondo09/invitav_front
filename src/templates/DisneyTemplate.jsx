import React from 'react';
import { Plus, MoveUp, MoveDown, Trash2, Play, Pause, Calendar, Clock, MapPin } from 'lucide-react';
import './Disney.css';
export default function DisneyTemplate({ 
  blocks, selectedBlockId, setSelectedBlockId, setActiveTab, setSidebarOpen, 
  setIsAddingBlock, moveBlock, deleteBlock, isMobilePreview, musicConfig, setMusicConfig 
}) {
  return (
    <div className={`transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] relative overflow-x-hidden font-nunito bg-[#E21836] ${
      isMobilePreview ? 'w-full sm:w-[375px] h-fit min-h-screen sm:min-h-[812px] sm:rounded-[3.5rem] sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] sm:ring-8 sm:ring-slate-800' : 'w-full max-w-5xl h-fit min-h-screen sm:rounded-2xl shadow-2xl'
    }`}>
      
      {/* Estilos CSS específicos de la plantilla de tu HTML original */}
      <style>{`
        .polka-dots {
          background-image: 
            radial-gradient(#ffffff 15%, transparent 16%),
            radial-gradient(#ffffff 15%, transparent 16%);
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
          opacity: 0.12;
        }
        .mickey-ear {
          position: absolute;
          width: 80px;
          height: 80px;
          background-color: #111111;
          border-radius: 50%;
          border: 4px solid #111111;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease;
          z-index: 0;
        }
        .ear-left { top: -20px; left: -25px; }
        .ear-right { top: -20px; right: -25px; }
        
        .photo-wrapper:hover .mickey-ear {
          transform: scale(1.15);
        }
        .btn-pro {
          transition: all 0.2s;
          box-shadow: 0 8px 0 rgba(0,0,0,0.3);
        }
        .btn-pro:active {
          transform: translateY(8px);
          box-shadow: 0 0 0 rgba(0,0,0,0.3);
        }
        @keyframes floatMapPin { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .animate-float-pin { animation: floatMapPin 2.5s ease-in-out infinite; }
      `}</style>

      {/* Fondo de lunares */}
      <div className="absolute inset-0 polka-dots pointer-events-none z-0"></div>
      
      {/* PANTALÓN TOP DECORATIVO */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[#111111] rounded-b-[50%] shadow-2xl shadow-black z-0 flex flex-col items-center pt-4">
        <div className="flex gap-8 mt-2">
          <div className="w-8 h-14 bg-white rounded-full border-4 border-gray-300 shadow-inner"></div>
          <div className="w-8 h-14 bg-white rounded-full border-4 border-gray-300 shadow-inner"></div>
        </div>
      </div>
      
      {/* Botón flotante para la música */}
      {musicConfig.enabled && (
        <button 
          onClick={() => setMusicConfig({...musicConfig, playing: !musicConfig.playing})}
          className="absolute top-4 right-4 z-50 bg-[#FFCC00] text-[#111111] w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_0_#b45309] border-2 border-[#111111] transition-transform hover:scale-110"
        >
          {musicConfig.playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
      )}

      <main className="relative z-10 w-full max-w-2xl px-6 pt-40 pb-20 flex flex-col items-center text-center mx-auto">
        {blocks.map((block) => (
          <div 
            key={block.id}
            onClick={(e) => { e.stopPropagation(); setSelectedBlockId(block.id); setActiveTab('edit'); setSidebarOpen(true); }}
            className={`relative w-full group cursor-pointer transition-all duration-300 mb-6 flex flex-col items-center ${
              selectedBlockId === block.id ? 'ring-4 ring-[#FFCC00] z-20 rounded-3xl scale-[1.02] bg-black/10' : 'hover:opacity-90'
            }`}
          >
            {/* Etiquetas del Editor Flotantes */}
            <div className={`absolute -top-3 left-4 sm:left-8 px-3 py-1 bg-[#111111] text-[#FFCC00] text-[9px] font-black rounded-full shadow-lg transition-all z-30 uppercase tracking-widest border border-[#FFCC00]/50 ${selectedBlockId === block.id ? 'opacity-100' : 'opacity-0'}`}>
              Editando: {block.type}
            </div>
            <div className={`absolute top-4 right-4 flex gap-1 z-30 transition-all duration-300 ${selectedBlockId === block.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:group-hover:opacity-100'}`}>
              <div className="flex bg-[#111111]/90 backdrop-blur-md shadow-xl border border-[#FFCC00]/30 rounded-lg p-1 text-white">
                <button className="p-1.5 hover:bg-white/10 rounded" onClick={(e) => {e.stopPropagation(); moveBlock(blocks.findIndex(b=>b.id===block.id), 'up');}}><MoveUp size={14}/></button>
                <button className="p-1.5 hover:bg-white/10 rounded" onClick={(e) => {e.stopPropagation(); moveBlock(blocks.findIndex(b=>b.id===block.id), 'down');}}><MoveDown size={14}/></button>
                <div className="w-px h-4 bg-white/20 mx-1 self-center"></div>
                <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className="p-1.5 hover:bg-red-500/20 rounded text-red-400"><Trash2 size={14}/></button>
              </div>
            </div>

            {/* RENDERIZADOR EXACTO A TU HTML */}
            <DisneyBlockRenderer type={block.type} content={block.content} />
          </div>
        ))}

        <div onClick={() => setIsAddingBlock(true)} className="w-full py-12 border-2 border-dashed border-white/30 rounded-3xl flex flex-col items-center justify-center text-white/50 hover:text-[#FFCC00] hover:border-[#FFCC00] hover:bg-black/20 transition-all cursor-pointer group mt-4">
          <div className="w-12 h-12 bg-white/10 group-hover:bg-[#FFCC00]/20 rounded-full flex items-center justify-center transition-all mb-3"><Plus size={24} /></div>
          <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest text-center px-4">Añadir Nuevo Bloque</span>
        </div>
      </main>
    </div>
  );
}

// Lógica Visual de cada bloque de Disney IDÉNTICA al HTML original
function DisneyBlockRenderer({ type, content }) {
  switch(type) {
    case 'hero':
      return (
        <div className="w-full flex flex-col items-center">
          
          <div className="relative mb-6 photo-wrapper cursor-pointer mt-4">
            <div className="mickey-ear ear-left"></div>
            <div className="mickey-ear ear-right"></div>
            
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-8 border-[#FFCC00] overflow-hidden z-10 bg-white shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <img src={content.image} alt="Festejado" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </div>
            
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-6 z-20">
              <div className="w-7 h-12 bg-white rounded-full border-4 border-gray-200 shadow-lg"></div>
              <div className="w-7 h-12 bg-white rounded-full border-4 border-gray-200 shadow-lg"></div>
            </div>
          </div>

          <div className="bg-[#FFCC00] text-[#111111] px-8 py-2 rounded-full transform rotate-2 mb-6 shadow-[0_6px_0_#b45309] border-4 border-[#111111] animate-pulse">
            <p className="font-bangers text-2xl md:text-3xl tracking-wide">
              🎟️ ¡Pase VIP para: <span className="text-[#E21836]">{content.guestName}</span>! 🎟️
            </p>
          </div>

          <h1 className="font-bangers text-6xl md:text-8xl text-white drop-shadow-[0_6px_6px_rgba(0,0,0,0.8)] mb-2 tracking-wider">
            {content.title}
          </h1>
        </div>
      );
    
    case 'text':
      return (
        <div className="bg-black/40 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-2xl mb-10 w-full max-w-lg mx-auto">
          <p className="font-bangers text-3xl md:text-4xl text-[#FFCC00] tracking-wide mb-2">{content.subtitle}</p>
          <p className="text-lg md:text-xl font-bold text-white">
            {content.text}
          </p>
        </div>
      );
    
    case 'countdown':
      return (
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-lg mb-12 mx-auto">
          {[{v: '91', l: 'Días'}, {v: '06', l: 'Horas'}, {v: '14', l: 'Minutos'}, {v: '11', l: 'Segundos'}].map((t, i) => (
            <div key={i} className="flex flex-col">
              <div className="bg-[#111111] border-4 border-[#FFCC00] rounded-2xl p-3 md:p-4 relative overflow-hidden shadow-[0_6px_0_#b45309] flex justify-center">
                <span className="font-bangers text-3xl md:text-5xl text-white">{t.v}</span>
              </div>
              <span className="text-xs uppercase font-black mt-2 text-[#FFCC00]">{t.l}</span>
            </div>
          ))}
        </div>
      );
    
    case 'details':
      return (
        <div className="w-full bg-white text-[#111111] p-6 md:p-8 rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-4 border-[#111111] mb-10 relative overflow-hidden group max-w-lg mx-auto">
          <div className="absolute -right-8 -bottom-8 opacity-[0.04] w-48 h-48 pointer-events-none transition-transform group-hover:scale-110 duration-700">
              <svg viewBox="0 0 100 100" fill="#000"><circle cx="50" cy="50" r="25"/><circle cx="20" cy="20" r="15"/><circle cx="80" cy="20" r="15"/></svg>
          </div>
          <div className="absolute -left-10 -top-10 opacity-[0.03] w-32 h-32 pointer-events-none transform -rotate-12">
              <svg viewBox="0 0 100 100" fill="#000"><circle cx="50" cy="50" r="25"/><circle cx="20" cy="20" r="15"/><circle cx="80" cy="20" r="15"/></svg>
          </div>

          <div className="text-center relative z-10">
            <h3 className="font-bangers text-4xl md:text-5xl text-[#E21836] mb-6 border-b-4 border-dashed border-gray-200 pb-3 inline-block relative z-10 uppercase">
              ¿Cuándo y Dónde?
            </h3>
          </div>
          
          <div className="flex flex-col gap-6 text-left font-bold text-lg relative z-10">
            {/* DÍA Y HORA: Ahora están en columna (flex-col) para coincidir con tu diseño */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 shadow-sm">
                <div className="bg-[#FFCC00] p-3 rounded-full border-[3px] border-black shadow-md shrink-0"><Calendar size={24} /></div>
                <div><p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Día Mágico</p><p className="text-xl leading-none">{content.date}</p></div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 shadow-sm">
                <div className="bg-[#FFCC00] p-3 rounded-full border-[3px] border-black shadow-md shrink-0"><Clock size={24} /></div>
                <div><p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Hora de la Diversión</p><p className="text-xl leading-none">{content.time}</p></div>
              </div>
            </div>
            
            {/* UBICACIÓN Y MAPA: Totalmente centrados en columna */}
            <div className="mt-2 bg-[#E21836]/5 p-6 rounded-3xl border-2 border-[#E21836]/20 shadow-inner flex flex-col items-center gap-5 text-center">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-[#E21836] rounded-full animate-ping opacity-30"></div>
                <div className="bg-[#E21836] text-white p-4 rounded-full border-[3px] border-[#111111] shadow-xl animate-float-pin relative z-10"><MapPin size={24} /></div>
              </div>
              <div className="flex-1 w-full flex flex-col items-center">
                <p className="text-[#E21836] font-bangers text-3xl tracking-wide mb-1 drop-shadow-sm uppercase">{content.locationName}</p>
                <p className="text-gray-600 text-base md:text-lg mb-5 px-2">{content.address}</p>
                
                <button className="inline-flex items-center justify-center gap-3 bg-[#FFCC00] text-[#111111] font-bangers tracking-widest text-xl px-8 py-3 w-fit rounded-full border-[3px] border-[#111111] shadow-[0_4px_0_#111111] hover:translate-y-1 hover:shadow-[0_2px_0_#111111] transition-all active:translate-y-2 active:shadow-none">
                  {/* Icono de mapa como en tu diseño */}
                  <svg className="w-5 h-5 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                  ¡ABRIR MAPA MÁGICO!
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    
    case 'gifts':
      return (
        <div className="w-full bg-[#E21836] border-4 border-[#FFCC00] rounded-2xl p-6 shadow-[0_8px_0_#b45309] mb-10 max-w-lg mx-auto z-20">
          <h3 className="font-bangers text-3xl text-[#FFCC00] mb-2 tracking-wide">{content.title}</h3>
          <p className="font-bold text-white mb-4">{content.text}</p>
          <div className="bg-black/30 inline-block px-6 py-2 rounded-full border border-white/30 font-bold uppercase tracking-widest text-white">
            {content.suggestion}
          </div>
        </div>
      );
    
    case 'rsvp':
      return (
        <div className="flex flex-col w-full gap-5 max-w-lg mx-auto z-20 mb-10">
          <button className="btn-pro w-full bg-[#FFCC00] text-[#111111] font-bangers text-3xl py-4 rounded-full border-4 border-[#111111]">
            {content.mainButton}
          </button>
          <button className="btn-pro w-full bg-green-500 text-white font-bangers text-2xl py-3 rounded-full border-4 border-[#111111] flex items-center justify-center gap-2">
            {content.whatsappText}
          </button>
        </div>
      );
    
    default: return null;
  }
}