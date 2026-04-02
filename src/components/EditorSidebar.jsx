import React from 'react';
import { Layers, X, Settings, Plus, MoveUp, MoveDown, Trash2, Type, Palette, Music, Save, Upload } from 'lucide-react';
import { BLOCK_TYPES } from '../data/constants';

export default function EditorSidebar(props) {
  const { 
    blocks, selectedBlockId, setSelectedBlockId, activeTab, setActiveTab, 
    sidebarOpen, setSidebarOpen, setIsAddingBlock, updateBlockContent, 
    deleteBlock, moveBlock, musicConfig, setMusicConfig, activeTemplate, setActiveTemplate
  } = props;

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <aside className={`fixed md:relative top-0 left-0 h-full w-[85%] max-w-sm md:w-80 flex-shrink-0 bg-slate-800/95 md:bg-slate-800/40 backdrop-blur-2xl border-r border-slate-700/50 flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-700/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Layers className="text-white" size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">Invitav<span className="text-pink-500">.com</span></h1>
        </div>
        <button className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors md:hidden" onClick={() => setSidebarOpen(false)}>
          <X size={18} />
        </button>
      </div>

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
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar">
        {activeTab === 'blocks' && (
          <div className="space-y-4">
            <button 
              onClick={() => setIsAddingBlock(true)}
              className="w-full py-4 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-pink-500/30 transition-all active:scale-[0.98]"
            >
              <Plus size={20} /> Añadir Nuevo Bloque
            </button>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 mb-3">Orden de Aparición</p>
              {blocks.map((block, idx) => (
                <div 
                  key={block.id}
                  onClick={() => { setSelectedBlockId(block.id); setActiveTab('edit'); }}
                  className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                    selectedBlockId === block.id ? 'bg-slate-700/60 border-pink-500/50 shadow-inner translate-x-1' : 'bg-slate-800/40 border-transparent hover:border-slate-600'
                  }`}
                >
                  <div className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center transition-colors ${selectedBlockId === block.id ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
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

        {activeTab === 'edit' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {selectedBlock ? (
              <BlockEditorForm block={selectedBlock} updateContent={updateBlockContent} deleteBlock={deleteBlock} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 mb-4 border border-slate-700/50"><Type size={32} /></div>
                <p className="text-sm font-bold text-slate-400">Selecciona un bloque en la invitación para editarlo</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-4 flex items-center gap-2">Plantilla</h3>
              <select 
                value={activeTemplate} 
                onChange={(e) => setActiveTemplate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none text-white font-bold"
              >
                <option value="disney">Magia Disney</option>
                <option value="minimal">Elegante/Minimalista (Próximamente)</option>
              </select>
            </section>
            <section>
              <h3 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-4 flex items-center gap-2"><Music size={14} /> Música de Fondo</h3>
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Activar música</span>
                  <button onClick={() => setMusicConfig({...musicConfig, enabled: !musicConfig.enabled})} className={`w-10 h-5 rounded-full transition-all relative ${musicConfig.enabled ? 'bg-pink-500' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${musicConfig.enabled ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Título de la canción</label>
                  <input type="text" value={musicConfig.title} onChange={(e) => setMusicConfig({...musicConfig, title: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs outline-none focus:border-pink-500" />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-slate-700/30 bg-slate-800/60 backdrop-blur-md">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-slate-900 font-black text-sm rounded-xl hover:bg-slate-200 transition-all shadow-xl active:scale-[0.97]"><Save size={18} /> GUARDAR CAMBIOS</button>
      </div>
    </aside>
  );
}

function BlockEditorForm({ block, updateContent, deleteBlock }) {

  const getLabel = (key) => {
    const labels = {
      guestName: 'Nombre del Invitado', title: 'Título Principal', subtitle: 'Subtítulo', text: 'Texto Descriptivo',
      targetDate: 'Fecha Límite (YYYY-MM-DD)', date: 'Día del Evento', time: 'Hora del Evento',
      locationName: 'Nombre del Lugar', address: 'Dirección', suggestion: 'Sugerencia de Regalo',
      mainButton: 'Texto Botón Principal', whatsappText: 'Texto Botón WhatsApp'
    };
    return labels[key] || key;
  };


  const getInputType = (key) => {
    if (key === 'targetDate') return 'datetime-local'; // Muestra selector de fecha y hora
    if (key === 'date') return 'date';                 // Muestra solo selector de fecha
    if (key === 'time') return 'time';                 // Muestra solo selector de hora
    return 'text';                                     // Por defecto siempre será texto
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-black uppercase tracking-widest text-pink-500">Configuración</h2>
        <span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300 uppercase">{block.type}</span>
      </div>
      
      {Object.keys(block.content).map(key => (
        <div key={key} className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">{getLabel(key)}</label>
          
          {key === 'text' ? (
            <textarea 
              value={block.content[key]} 
              onChange={(e) => updateContent(block.id, { [key]: e.target.value })} 
              className="w-full bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all h-24" 
            />
          ) : key === 'image' ? (
            <div className="space-y-3">
              <div className="h-32 bg-slate-900 rounded-xl overflow-hidden border border-dashed border-slate-700 flex items-center justify-center group relative">
                <img src={block.content[key]} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Preview" />
                <button className="relative flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold border border-white/20 hover:bg-white/20 transition-all"><Upload size={14} /> Cambiar Foto</button>
              </div>
              <input 
                type="text" 
                placeholder="URL de la imagen..." 
                value={block.content[key]} 
                onChange={(e) => updateContent(block.id, { [key]: e.target.value })} 
                className="w-full bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-xs font-mono focus:ring-2 focus:ring-pink-500 outline-none" 
              />
            </div>
          ) : (
            <input 
              type={getInputType(key)} 
              value={block.content[key]} 
              onChange={(e) => updateContent(block.id, { [key]: e.target.value })} 
              className="w-full bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all [color-scheme:dark]" 
            />
          )}
        </div>
      ))}
      <div className="pt-4 border-t border-slate-700/30">
        <button onClick={() => deleteBlock(block.id)} className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
          <Trash2 size={14} /> Eliminar este bloque
        </button>
      </div>
    </div>
  );
}
