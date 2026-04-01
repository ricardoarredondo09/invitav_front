import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Settings, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Smartphone, 
  Monitor, 
  Save, 
  Share2, 
  Image as ImageIcon, 
  Type, 
  MapPin, 
  Music, 
  Clock, 
  CheckSquare, 
  Video,
  Layers,
  Palette,
  ChevronRight,
  Eye,
  Gift,
  X,
  Volume2,
  Play,
  Pause,
  Upload,
  Menu
} from 'lucide-react';

// --- CONFIGURACIÓN INICIAL ---
const INITIAL_BLOCKS = [
  {
    id: 'hero-1',
    type: 'hero',
    content: {
      names: 'Gabriela & Arturo',
      date: '01 de Julio de 2026',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
      overlay: 40
    }
  },
  {
    id: 'countdown-1',
    type: 'countdown',
    content: {
      targetDate: '2026-07-01T00:00:00',
      title: 'Faltan solo...'
    }
  },
  {
    id: 'details-1',
    type: 'details',
    content: {
      title: 'Nuestra Boda',
      description: 'Nos encantaría que nos acompañes en este día tan especial para nosotros.',
      location: 'Antigua Hacienda, Guanajuato, México'
    }
  }
];

const BLOCK_TYPES = [
  { type: 'hero', label: 'Portada', icon: <ImageIcon size={20} />, description: 'Imagen grande con nombres' },
  { type: 'text', label: 'Texto', icon: <Type size={20} />, description: 'Párrafos o frases especiales' },
  { type: 'countdown', label: 'Contador', icon: <Clock size={20} />, description: 'Cuenta regresiva en vivo' },
  { type: 'map', label: 'Mapa', icon: <MapPin size={20} />, description: 'Ubicación de Google Maps' },
  { type: 'rsvp', label: 'Confirmación', icon: <CheckSquare size={20} />, description: 'Formulario de asistencia' },
  { type: 'gallery', label: 'Galería', icon: <ImageIcon size={20} />, description: 'Cuadrícula de fotos' },
  { type: 'gifts', label: 'Regalos', icon: <Gift size={20} />, description: 'Mesa de regalos o cuenta' },
  { type: 'video', label: 'Video', icon: <Video size={20} />, description: 'Enlace de YouTube/Vimeo' },
];

export default function App() {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isMobilePreview, setIsMobilePreview] = useState(true);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [activeTab, setActiveTab] = useState('blocks'); 
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para el menú en móviles
  
  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(1);

  // Music State
  const [musicConfig, setMusicConfig] = useState({
    enabled: true,
    title: 'A Thousand Years - Christina Perri',
    playing: false
  });

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  const updateBlockContent = (id, newContent) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, ...newContent } } : b));
  };

  const addBlock = (type) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newBlock = {
      id,
      type,
      content: getDefaultsForType(type)
    };
    setBlocks([...blocks, newBlock]);
    setIsAddingBlock(false);
    setSelectedBlockId(id);
    setActiveTab('edit');
    setSidebarOpen(true); // Abrir sidebar en móvil para editar inmediatamente
  };

  const getDefaultsForType = (type) => {
    switch(type) {
      case 'hero': return { names: 'Nuevos Nombres', date: '01/01/2026', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000', overlay: 30 };
      case 'text': return { title: 'Título del Bloque', text: 'Escribe aquí tu mensaje especial para los invitados.' };
      case 'map': return { title: 'Lugar del Evento', address: 'Calle Falsa 123, Ciudad' };
      case 'countdown': return { targetDate: '2026-12-31', title: '¡Ya casi llega el día!' };
      case 'rsvp': return { title: 'Confirma tu asistencia' };
      default: return { title: 'Nuevo Bloque' };
    }
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < blocks.length) {
      [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden relative w-full">
      
      {/* Overlay para móviles (Cierra el menú al hacer clic fuera) */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* --- SIDEBAR IZQUIERDO --- */}
      <aside className={`fixed md:relative top-0 left-0 h-full w-[85%] max-w-sm md:w-80 flex-shrink-0 bg-slate-800/95 md:bg-slate-800/40 backdrop-blur-2xl border-r border-slate-700/50 flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-700/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Layers className="text-white" size={20} />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Invitav<span className="text-pink-500">.com</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors hidden md:block">
              <Settings size={18} />
            </button>
            <button className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors md:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs Principales */}
        <div className="flex p-2 bg-slate-900/40 m-4 rounded-xl gap-1 border border-slate-700/30 overflow-x-auto custom-scrollbar">
          {[
            { id: 'blocks', icon: <Layers size={16} />, label: 'Estructura' },
            { id: 'edit', icon: <Type size={16} />, label: 'Editar' },
            { id: 'theme', icon: <Palette size={16} />, label: 'Estilo' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] flex items-center justify-center gap-2 py-2 px-1 rounded-lg transition-all text-xs font-bold ${
                activeTab === tab.id ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar">
          {/* TAB: ESTRUCTURA (LISTA DE BLOQUES) */}
          {activeTab === 'blocks' && (
            <div className="space-y-4">
              <button 
                onClick={() => setIsAddingBlock(true)}
                className="w-full py-4 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-pink-500/30 transition-all active:scale-[0.98]"
              >
                <Plus size={20} />
                Añadir Nuevo Bloque
              </button>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 mb-3">Orden de Aparición</p>
                {blocks.map((block, idx) => (
                  <div 
                    key={block.id}
                    onClick={() => { setSelectedBlockId(block.id); setActiveTab('edit'); }}
                    className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      selectedBlockId === block.id 
                      ? 'bg-slate-700/60 border-pink-500/50 shadow-inner translate-x-1' 
                      : 'bg-slate-800/40 border-transparent hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center transition-colors ${
                      selectedBlockId === block.id ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {BLOCK_TYPES.find(t => t.type === block.type)?.icon}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold truncate capitalize">{block.type}</p>
                      <p className="text-[10px] text-slate-500 truncate">Bloque #{idx + 1}</p>
                    </div>
                    <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'up'); }} className="p-2 hover:bg-slate-600 rounded"><MoveUp size={14}/></button>
                      <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className="p-2 hover:bg-red-500/20 text-red-400 rounded"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDITAR (CONTENIDO DEL BLOQUE SELECCIONADO) */}
          {activeTab === 'edit' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {selectedBlock ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-black uppercase tracking-widest text-pink-500">Configuración</h2>
                    <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300 uppercase">{selectedBlock.type}</span>
                  </div>

                  {/* CAMPOS DINÁMICOS SEGÚN EL TIPO DE BLOQUE */}
                  {Object.keys(selectedBlock.content).map(key => (
                    <div key={key} className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                        {key === 'names' ? 'Nombres de los Novios' : 
                         key === 'date' ? 'Fecha del Evento' : 
                         key === 'overlay' ? 'Oscurecer Imagen (%)' : 
                         key === 'targetDate' ? 'Fecha Límite (YYYY-MM-DD)' :
                         key === 'title' ? 'Título del Bloque' :
                         key === 'description' ? 'Descripción' :
                         key === 'location' ? 'Lugar' : key}
                      </label>
                      
                      {key === 'description' || key === 'text' ? (
                        <textarea 
                          value={selectedBlock.content[key]}
                          onChange={(e) => updateBlockContent(selectedBlock.id, { [key]: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all h-24"
                        />
                      ) : key === 'overlay' ? (
                        <input 
                          type="range" min="0" max="100"
                          value={selectedBlock.content[key]}
                          onChange={(e) => updateBlockContent(selectedBlock.id, { [key]: parseInt(e.target.value) })}
                          className="w-full accent-pink-500"
                        />
                      ) : key === 'image' ? (
                        <div className="space-y-3">
                          <div className="h-32 bg-slate-900 rounded-xl overflow-hidden border border-dashed border-slate-700 flex items-center justify-center group relative">
                            <img src={selectedBlock.content[key]} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Preview" />
                            <button className="relative flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold border border-white/20 hover:bg-white/20 transition-all">
                              <Upload size={14} /> Cambiar Foto
                            </button>
                          </div>
                          <input 
                            type="text" 
                            placeholder="URL de la imagen..."
                            value={selectedBlock.content[key]}
                            onChange={(e) => updateBlockContent(selectedBlock.id, { [key]: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-xs font-mono focus:ring-2 focus:ring-pink-500 outline-none"
                          />
                        </div>
                      ) : (
                        <input 
                          type="text" 
                          value={selectedBlock.content[key]}
                          onChange={(e) => updateBlockContent(selectedBlock.id, { [key]: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-slate-700/30">
                    <button 
                      onClick={() => deleteBlock(selectedBlock.id)}
                      className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} /> Eliminar este bloque
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 mb-4 border border-slate-700/50">
                    <Type size={32} />
                  </div>
                  <p className="text-sm font-bold text-slate-400">Selecciona un bloque en la invitación para editarlo</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: ESTILO (MÚSICA Y COLORES) */}
          {activeTab === 'theme' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-4 flex items-center gap-2">
                  <Music size={14} /> Música de Fondo
                </h3>
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Activar música</span>
                    <button 
                      onClick={() => setMusicConfig({...musicConfig, enabled: !musicConfig.enabled})}
                      className={`w-10 h-5 rounded-full transition-all relative ${musicConfig.enabled ? 'bg-pink-500' : 'bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${musicConfig.enabled ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Título de la canción</label>
                    <input 
                      type="text" 
                      value={musicConfig.title}
                      onChange={(e) => setMusicConfig({...musicConfig, title: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-4 flex items-center gap-2">
                  <Palette size={14} /> Paleta Visual
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Minimalist', 'Romantic', 'Vintage', 'Luxury'].map(t => (
                    <button key={t} className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold hover:border-pink-500 transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-700/30 bg-slate-800/60 backdrop-blur-md">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-slate-900 font-black text-sm rounded-xl hover:bg-slate-200 transition-all shadow-xl active:scale-[0.97]">
            <Save size={18} />
            GUARDAR CAMBIOS
          </button>
        </div>
      </aside>

      {/* --- ÁREA CENTRAL: PREVIEW --- */}
      <main className="flex-1 relative flex flex-col bg-slate-950 overflow-hidden w-full">
        
        {/* Pattern de fondo profesional */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        {/* Header de Preview */}
        <header className="w-full min-h-16 py-3 border-b border-slate-800/50 flex items-center justify-between px-4 md:px-8 bg-slate-900/60 backdrop-blur-xl z-10 gap-2">
          <div className="flex items-center">
            {/* Botón de Menú para Móviles */}
            <button 
              className="md:hidden mr-4 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Toggle Escritorio/Móvil (Oculto en pantallas pequeñas) */}
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
                <button 
                  onClick={() => setIsMobilePreview(true)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${isMobilePreview ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Smartphone size={16} /> Móvil
                </button>
                <button 
                  onClick={() => setIsMobilePreview(false)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${!isMobilePreview ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Monitor size={16} /> Escritorio
                </button>
              </div>
              <div className="h-4 w-px bg-slate-700"></div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden md:block">Vista previa</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
              <Eye size={16} /> Invitado
            </button>
            <button className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">
              <Share2 size={16} /> COMPARTIR
            </button>
          </div>
        </header>

        {/* El Canvas / Simulador */}
        <div className="flex-1 w-full overflow-y-auto p-0 sm:p-6 md:p-12 flex justify-center custom-scrollbar scroll-smooth">
          <div 
            className={`transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] relative ${
              isMobilePreview 
                ? 'w-full sm:w-[375px] h-fit min-h-screen sm:min-h-[812px] sm:rounded-[3.5rem] sm:border-[12px] sm:border-slate-800 sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] sm:ring-1 sm:ring-slate-700 sm:ring-offset-4 sm:ring-offset-slate-900' 
                : 'w-full max-w-5xl h-fit min-h-screen bg-white sm:rounded-2xl shadow-2xl'
            } bg-white overflow-x-hidden`}
          >
            {/* Notch de iPhone (Oculto en móviles reales para ahorrar espacio) */}
            {isMobilePreview && (
              <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-slate-800 rounded-b-3xl z-50 items-center justify-center">
                 <div className="w-10 h-1.5 bg-slate-700 rounded-full"></div>
              </div>
            )}

            {/* Música Flotante (Simulación en móvil) */}
            {isMobilePreview && musicConfig.enabled && (
              <div className="fixed sm:absolute bottom-6 right-4 sm:bottom-8 sm:right-6 z-40 animate-bounce">
                <button 
                  onClick={() => setMusicConfig({...musicConfig, playing: !musicConfig.playing})}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-pink-500 border border-pink-100 transition-transform active:scale-90"
                >
                  {musicConfig.playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                {musicConfig.playing && (
                   <div className="absolute -top-10 right-0 bg-black/80 text-white text-[9px] px-2 py-1 rounded-md whitespace-nowrap backdrop-blur-sm">
                      Sonando: {musicConfig.title}
                   </div>
                )}
              </div>
            )}

            {/* Renderizado de Bloques en la Invitación */}
            <div className="flex flex-col">
              {blocks.map((block) => (
                <div 
                  key={block.id}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setSelectedBlockId(block.id);
                    setActiveTab('edit');
                    setSidebarOpen(true); // Abre menú al tocar en móvil para editar
                  }}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    selectedBlockId === block.id 
                      ? 'ring-4 ring-pink-500/50 sm:ring-pink-500/30 z-10' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Controles Flotantes Rápidos (Solo aparecen al seleccionar o hover en desktop) */}
                  <div className={`absolute top-4 right-4 flex gap-1 z-20 transition-all duration-300 ${selectedBlockId === block.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:group-hover:opacity-100'}`}>
                    <div className="flex bg-white/90 backdrop-blur-md shadow-xl border border-slate-200 rounded-lg p-1">
                      <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600" onClick={(e) => {e.stopPropagation(); moveBlock(blocks.findIndex(b=>b.id===block.id), 'up');}}><MoveUp size={14}/></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600" onClick={(e) => {e.stopPropagation(); moveBlock(blocks.findIndex(b=>b.id===block.id), 'down');}}><MoveDown size={14}/></button>
                      <div className="w-px h-4 bg-slate-200 mx-1 self-center"></div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                        className="p-1.5 hover:bg-red-50 rounded text-red-500"
                      ><Trash2 size={14}/></button>
                    </div>
                  </div>

                  {/* Nombre del bloque (Etiqueta) */}
                  <div className={`absolute -top-3 left-4 sm:left-8 px-3 py-1 bg-pink-500 text-white text-[9px] font-black rounded-full shadow-lg transition-all z-20 uppercase tracking-widest ${selectedBlockId === block.id ? 'opacity-100' : 'opacity-0'}`}>
                    Editando: {block.type}
                  </div>

                  <BlockRenderer type={block.type} content={block.content} />
                </div>
              ))}

              {/* Botón "Añadir Bloque" al final de la invitación */}
              <div 
                onClick={() => setIsAddingBlock(true)}
                className="py-12 sm:py-16 border-2 border-dashed border-slate-200 m-4 sm:m-6 rounded-3xl flex flex-col items-center justify-center text-slate-300 hover:text-pink-500 hover:border-pink-300 hover:bg-pink-50 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 group-hover:bg-pink-100 rounded-full flex items-center justify-center transition-all mb-3 sm:mb-4">
                  <Plus size={24} className="sm:w-8 sm:h-8" />
                </div>
                <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest text-center px-4">Pulsa para añadir contenido</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL: SELECTOR DE BLOQUES */}
        {isAddingBlock && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsAddingBlock(false)}></div>
            <div className="relative bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] p-6 sm:p-10 max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col scale-in-center">
              <div className="flex justify-between items-start sm:items-center mb-6 sm:mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Agregar Bloque</h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Personaliza tu invitación.</p>
                </div>
                <button onClick={() => setIsAddingBlock(false)} className="p-2 sm:p-3 bg-slate-800 hover:bg-slate-700 rounded-xl sm:rounded-2xl transition-all">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto pr-2 custom-scrollbar pb-4">
                {BLOCK_TYPES.map(item => (
                  <button
                    key={item.type}
                    onClick={() => addBlock(item.type)}
                    className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl sm:rounded-3xl hover:border-pink-500 hover:bg-slate-800 transition-all text-center group active:scale-95"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 group-hover:bg-pink-500 text-slate-400 group-hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm tracking-tight">{item.label}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 mt-1 sm:mt-2 leading-tight hidden sm:block">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ONBOARDING (EL TUTORIAL) */}
        {showTutorial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm">
            <div className="bg-white text-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl p-6 sm:p-8 animate-in zoom-in duration-300 relative overflow-hidden">
              {/* Barra de progreso superior */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                <div 
                  className="h-full bg-pink-500 transition-all duration-500" 
                  style={{width: `${(tutorialStep / 4) * 100}%`}}
                ></div>
              </div>

              <button 
                onClick={() => setShowTutorial(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mt-2 sm:mt-4 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  {tutorialStep === 1 && <Smartphone size={28} />}
                  {tutorialStep === 2 && <Layers size={28} />}
                  {tutorialStep === 3 && <Plus size={28} />}
                  {tutorialStep === 4 && <Share2 size={28} />}
                </div>

                <p className="text-[9px] sm:text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2">Paso {tutorialStep} de 4</p>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 sm:mb-3">
                  {tutorialStep === 1 && "¡Bienvenido a Invitav!"}
                  {tutorialStep === 2 && "Edita tus bloques"}
                  {tutorialStep === 3 && "Agrega más magia"}
                  {tutorialStep === 4 && "Todo listo para brillar"}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10">
                  {tutorialStep === 1 && "Crea invitaciones digitales que tus invitados nunca olvidarán. Es fácil, rápido y profesional."}
                  {tutorialStep === 2 && "Solo tienes que pulsar sobre cualquier texto o imagen de la invitación para editar su contenido directamente."}
                  {tutorialStep === 3 && "Puedes añadir música, mapas, galerías de fotos y formularios de confirmación con el botón rosa al final."}
                  {tutorialStep === 4 && "Cuando termines, dale a guardar y obtén tu enlace único para enviarlo por WhatsApp a todos tus invitados."}
                </p>

                <div className="flex gap-2 sm:gap-3">
                  {tutorialStep > 1 && (
                    <button 
                      onClick={() => setTutorialStep(v => v - 1)}
                      className="flex-1 py-3 sm:py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl sm:rounded-2xl transition-all text-xs sm:text-sm"
                    >
                      Anterior
                    </button>
                  )}
                  <button 
                    onClick={() => tutorialStep === 4 ? setShowTutorial(false) : setTutorialStep(v => v + 1)}
                    className="flex-[2] py-3 sm:py-4 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-xl sm:rounded-2xl shadow-xl shadow-pink-500/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    {tutorialStep === 4 ? "¡Empezar ahora!" : "Siguiente"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @keyframes scale-in-center {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .scale-in-center { animation: scale-in-center 0.3s cubic-bezier(0.23, 1.0, 0.32, 1.0) both; }
      `}</style>
    </div>
  );
}

// --- COMPONENTES DE RENDERIZADO DE BLOQUES ---

function BlockRenderer({ type, content }) {
  switch(type) {
    case 'hero':
      return (
        <div className="relative h-[450px] sm:h-[600px] w-full overflow-hidden flex items-end p-6 sm:p-10 bg-slate-100">
          <img src={content.image} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0" style={{backgroundColor: `rgba(0,0,0,${content.overlay / 100})`}}></div>
          <div className="relative text-white z-10 w-full text-center">
            <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold mb-3 sm:mb-4 animate-pulse">01 . 07 . 2026</p>
            <h2 className="text-4xl sm:text-5xl font-serif mb-4 sm:mb-6 leading-tight drop-shadow-2xl">{content.names}</h2>
            <div className="h-px w-16 sm:w-24 bg-white/40 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light opacity-80 italic">Te invitamos a celebrar</p>
          </div>
        </div>
      );
    
    case 'countdown':
      return (
        <div className="py-12 sm:py-16 px-4 sm:px-6 bg-[#fdfaf5] text-center border-y border-amber-100/50">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-800/60 font-black mb-6 sm:mb-8">{content.title}</p>
          <div className="flex justify-center gap-2 sm:gap-3">
            {[
              {v: '91', l: 'Días'}, {v: '06', l: 'Hrs'}, {v: '14', l: 'Min'}, {v: '11', l: 'Seg'}
            ].map(t => (
              <div key={t.l} className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white shadow-xl shadow-amber-900/5 border border-amber-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-2xl font-black text-amber-900 mb-2">
                  {t.v}
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase text-amber-800/40 font-black tracking-widest">{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'details':
      return (
        <div className="py-16 sm:py-24 px-6 sm:px-12 text-center bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-pink-50 rounded-full blur-[100px] opacity-30"></div>
          <h3 className="text-2xl sm:text-3xl font-serif text-slate-800 mb-6 sm:mb-8">{content.title}</h3>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed italic mb-8 sm:mb-10 max-w-xs mx-auto">{content.description}</p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 py-3 sm:py-4 px-6 sm:px-8 bg-slate-50 rounded-2xl text-slate-700 text-xs font-bold border border-slate-100 shadow-sm text-center">
            <MapPin size={18} className="text-pink-500" />
            {content.location}
          </div>
        </div>
      );

    case 'map':
      return (
        <div className="p-4 sm:p-6 bg-slate-50">
          <div className="bg-slate-200 h-48 sm:h-64 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-slate-400 overflow-hidden relative shadow-inner border border-slate-200">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-101.18,21.12,14/600x400?access_token=none')] bg-cover opacity-60"></div>
            <div className="relative bg-white/90 backdrop-blur-md p-4 sm:p-5 w-[90%] sm:w-auto rounded-2xl sm:rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-3 sm:gap-4 border border-white">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                <MapPin size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-tight truncate">{content.title}</p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 truncate">{content.address}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300 ml-1 sm:ml-2 flex-shrink-0" />
            </div>
          </div>
        </div>
      );

    case 'rsvp':
      return (
        <div className="p-8 sm:p-10 bg-slate-900 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          <h4 className="font-bold text-lg sm:text-xl mb-6 relative z-10 tracking-tight">{content.title}</h4>
          <div className="space-y-3 sm:space-y-4 relative z-10 max-w-xs mx-auto">
            <input placeholder="Nombre completo" className="w-full p-3 sm:p-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-xs sm:text-sm outline-none focus:border-pink-500 transition-all placeholder:text-white/30" />
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button className="py-3 sm:py-4 bg-pink-500 text-white font-black rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] uppercase tracking-widest shadow-lg shadow-pink-500/20">Sí, iré</button>
              <button className="py-3 sm:py-4 bg-white/10 text-white/60 font-black rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] uppercase tracking-widest border border-white/10">No podré</button>
            </div>
          </div>
        </div>
      );

    default:
      return <div className="p-8 sm:p-12 text-center text-slate-400 font-bold bg-slate-50 uppercase tracking-widest text-[9px] sm:text-[10px]">Bloque: {type}</div>;
  }
}