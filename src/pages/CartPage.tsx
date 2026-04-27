import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/whatsapp';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-10 space-y-8">
        <div className="w-24 h-24 bg-neutral-900 border border-white/5 rounded-full flex items-center justify-center shadow-2xl">
          <ShoppingBag size={40} className="text-neutral-700" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Seu Carrinho está vazio</h2>
          <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase">Escolha sua pizza favorita primeiro!</p>
        </div>
        <Link 
          to="/menu" 
          className="sleek-button-primary px-10"
        >
          Ir ao Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 pb-32">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-white shadow-xl">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">CARRINHO</h1>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-neutral-900/50 border border-white/5 p-5 rounded-[32px] shadow-xl flex gap-5"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm tracking-tight uppercase">{item.name}</h3>
                    <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mt-1">
                      {item.size} • {item.category}
                    </p>
                    {item.extras.length > 0 && (
                      <p className="text-[9px] text-[#00A86B] font-black uppercase tracking-widest mt-1">+ {item.extras.join(', ')}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-neutral-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="font-black text-[#00A86B] tracking-tight">{formatCurrency(item.price * item.quantity)}</span>
                  <div className="flex items-center gap-4 bg-neutral-800 rounded-xl p-1 border border-white/5">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#00A86B] hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="bg-neutral-900 border border-white/5 p-8 rounded-[40px] space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#00A86B]/10 blur-[60px]"></div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-neutral-500">
          <span>Subtotal</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-neutral-500">
          <span>Entrega</span>
          <span className="text-[#00A86B]">Grátis</span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex justify-between text-xl font-black uppercase tracking-tighter text-[#00A86B]">
          <span>TOTAL</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="sleek-button-primary w-full h-16 text-lg"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
