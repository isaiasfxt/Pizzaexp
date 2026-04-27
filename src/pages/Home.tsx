import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { INITIAL_PRODUCTS } from '../data/menuData';
import { formatCurrency } from '../utils/whatsapp';

export default function Home() {
  const featured = INITIAL_PRODUCTS.filter(p => p.featured);

  return (
    <div className="space-y-10 px-6 py-10">
      {/* Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-56 rounded-[40px] overflow-hidden shadow-2xl border border-white/5"
      >
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" 
          alt="Oferta do dia" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col justify-center items-center text-center p-6">
          <div className="w-12 h-1 bg-white/30 mb-4 rounded-full"></div>
          <h2 className="text-white text-3xl font-black uppercase tracking-tighter leading-none mb-2">OLÁ, FOME?</h2>
          <p className="text-white/80 text-xs font-bold tracking-widest uppercase mb-4">As melhores de Nápoles em sua casa</p>
          <div className="bg-[#00A86B] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(0,168,107,0.4)]">
            Oferta Especial
          </div>
        </div>
      </motion.section>

      {/* Main Action */}
      <section>
        <Link to="/menu">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="sleek-button-primary w-full flex items-center justify-between px-8"
          >
            <span>Ver Cardápio</span>
            <span className="text-xl">🍕</span>
          </motion.button>
        </Link>
      </section>

      {/* Destaques */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black uppercase tracking-tight">Populares</h3>
          <Link to="/menu" className="text-[#00A86B] text-xs font-black uppercase tracking-widest hover:underline">Ver todas</Link>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {featured.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/product/${product.id}`} className="block group">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-3 border border-white/5 shadow-xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-2xl flex items-center gap-1 border border-white/10">
                    <Star size={10} className="text-[#00A86B] fill-[#00A86B]" />
                    <span className="text-[10px] font-black text-white">4.9</span>
                  </div>
                </div>
                <h4 className="font-bold text-sm line-clamp-1 uppercase tracking-tight mb-0.5">{product.name}</h4>
                <p className="text-[#00A86B] font-black text-sm tracking-tight">{formatCurrency(product.price)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Card */}
      <section className="bg-neutral-900 rounded-[32px] p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00A86B]/20 blur-[60px]"></div>
        <h3 className="text-lg font-black uppercase tracking-tight mb-2 text-white">Massa Artesanal</h3>
        <p className="text-neutral-500 text-xs font-medium leading-relaxed tracking-wide">
          Fermentada por 24 horas para uma leveza inconfundível. Ingredientes selecionados de produtores locais e importados.
        </p>
      </section>
    </div>
  );
}
