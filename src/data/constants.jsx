import React from 'react';
import { Image as ImageIcon, Type, Clock, MapPin, Gift, CheckSquare } from 'lucide-react';

// 1. DATOS INICIALES (CONTENIDO DE PRUEBA)
// ==========================================
export const INITIAL_BLOCKS = [
    { id: 'hero-1', type: 'hero', content: { guestName: 'Danna', title: 'RICARDO CUMPLE 2!', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000' } },
    { id: 'text-1', type: 'text', content: { subtitle: '¡Prepara tus orejitas!', text: 'Habrá pastel, juegos, sorpresas y muchísima magia. ¡No puedes faltar!' } },
    { id: 'countdown-1', type: 'countdown', content: { targetDate: '2026-12-15T16:00:00' } },
    { id: 'details-1', type: 'details', content: { date: '15 de Diciembre 2026', time: '4:00 PM - 8:00 PM', locationName: 'Salón "La Casa de Mickey"', address: 'Av. Fantasía Disney #123, Ciudad Mágica' } },
    { id: 'gifts-1', type: 'gifts', content: { title: 'Sugerencia de Regalo 🎁', text: 'El mejor regalo es tu presencia, pero si deseas tener un detalle preferimos:', suggestion: 'Lluvia de Sobres ✉️' } },
    { id: 'rsvp-1', type: 'rsvp', content: { mainButton: '✨ Confirmar Asistencia ✨', whatsappText: 'Dudas por WhatsApp' } }
  ];
  
export  const BLOCK_TYPES = [
    { type: 'hero', label: 'Portada', icon: <ImageIcon size={20} />, description: 'Foto, pase VIP y Título' },
    { type: 'text', label: 'Texto', icon: <Type size={20} />, description: 'Mensaje destacado oscuro' },
    { type: 'countdown', label: 'Contador', icon: <Clock size={20} />, description: 'Cuenta regresiva' },
    { type: 'details', label: 'Detalles', icon: <MapPin size={20} />, description: 'Fecha, hora y mapa' },
    { type: 'gifts', label: 'Regalos', icon: <Gift size={20} />, description: 'Sugerencia de regalos' },
    { type: 'rsvp', label: 'Confirmación', icon: <CheckSquare size={20} />, description: 'Botones de acción' },
  ];
  
export  const getDefaultsForType = (type) => {
    switch(type) {
      case 'hero': return { guestName: 'INVITADO', title: 'NUEVO EVENTO', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000' };
      case 'text': return { subtitle: '¡ATENCIÓN!', text: 'Escribe aquí tu mensaje especial.' };
      case 'details': return { date: 'Día del evento', time: 'Hora', locationName: 'Lugar del Evento', address: 'Dirección' };
      case 'countdown': return { targetDate: '2026-12-31T00:00:00' };
      case 'gifts': return { title: 'Regalos', text: 'Tu presencia es mi mejor regalo', suggestion: 'Lluvia de Sobres' };
      case 'rsvp': return { mainButton: 'Confirmar Asistencia', whatsappText: 'Dudas por WhatsApp' };
      default: return { title: 'Nuevo Bloque' };
    }
  };