import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const Toaster = () => {
  const [messages, setMessages] = useState<{ id: number, text: string }[]>([]);

  useEffect(() => {
    const handleNotify = (e: any) => {
      const id = Date.now();
      setMessages(prev => [...prev, { id, text: e.detail }]);
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== id));
      }, 3000);
    };

    window.addEventListener('notify', handleNotify);
    return () => window.removeEventListener('notify', handleNotify);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-xs px-4">
      {messages.map(msg => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-black text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-center text-sm font-medium border border-gray-800"
        >
          {msg.text}
        </motion.div>
      ))}
    </div>
  );
};

export const toast = (text: string) => {
  window.dispatchEvent(new CustomEvent('notify', { detail: text }));
};
