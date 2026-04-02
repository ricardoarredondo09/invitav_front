import React from 'react';
import DisneyTemplate from './DisneyTemplate';

export default function TemplateManager({ template, ...props }) {
  if (template === 'disney') return <DisneyTemplate {...props} />;
  
  // Aquí puedes añadir más plantillas en el futuro:
  // if (template === 'minimal') return <MinimalTemplate {...props} />;
  
  return (
    <div className={`transition-all duration-700 bg-white text-slate-800 p-10 ${props.isMobilePreview ? 'w-full sm:w-[375px] min-h-[812px] sm:rounded-[3.5rem]' : 'w-full max-w-5xl rounded-2xl'} flex flex-col items-center justify-center`}>
      <h2 className="text-2xl font-bold mb-4">Plantilla no encontrada</h2>
      <p>Selecciona una plantilla válida en la pestaña "Estilo".</p>
    </div>
  );
}
