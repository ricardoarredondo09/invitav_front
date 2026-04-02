import React, { useState } from 'react';
import EditorSidebar from './components/EditorSidebar';
import PreviewArea from './components/PreviewArea';
import AddBlockModal from './components/AddBlockModal';
import TemplateManager from './templates/TemplateManager';
import { INITIAL_BLOCKS, getDefaultsForType } from './data/constants';

export default function App() {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [isMobilePreview, setIsMobilePreview] = useState(true);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [activeTab, setActiveTab] = useState('blocks'); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('disney');
  
  const [musicConfig, setMusicConfig] = useState({ enabled: true, title: 'Magia Disney', playing: false });

  const updateBlockContent = (id, newContent) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, ...newContent } } : b));
  };

  const addBlock = (type) => {
    const id = Math.random().toString(36).substr(2, 9);
    setBlocks([...blocks, { id, type, content: getDefaultsForType(type) }]);
    setIsAddingBlock(false);
    setSelectedBlockId(id);
    setActiveTab('edit');
    setSidebarOpen(true);
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
      {/* Overlay Móvil */}
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* COMPONENTE: Sidebar del Editor */}
      <EditorSidebar 
        blocks={blocks}
        selectedBlockId={selectedBlockId}
        setSelectedBlockId={setSelectedBlockId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setIsAddingBlock={setIsAddingBlock}
        updateBlockContent={updateBlockContent}
        deleteBlock={deleteBlock}
        moveBlock={moveBlock}
        musicConfig={musicConfig}
        setMusicConfig={setMusicConfig}
        activeTemplate={activeTemplate}
        setActiveTemplate={setActiveTemplate}
      />

      {/* COMPONENTE: Área Central de Previsualización */}
      <PreviewArea 
        isMobilePreview={isMobilePreview} 
        setIsMobilePreview={setIsMobilePreview}
        setSidebarOpen={setSidebarOpen}
      >
        <TemplateManager 
          template={activeTemplate}
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          setSelectedBlockId={setSelectedBlockId}
          setActiveTab={setActiveTab}
          setSidebarOpen={setSidebarOpen}
          setIsAddingBlock={setIsAddingBlock}
          moveBlock={moveBlock}
          deleteBlock={deleteBlock}
          isMobilePreview={isMobilePreview}
          musicConfig={musicConfig}
          setMusicConfig={setMusicConfig}
        />
      </PreviewArea>

      {/* Modal Añadir Bloque */}
      {isAddingBlock && <AddBlockModal onClose={() => setIsAddingBlock(false)} onAdd={addBlock} />}

    
    </div>
  );
}
