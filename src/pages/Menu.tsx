import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_PRODUCTS } from '../data/menuData';
import { Category } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import { toast } from '../components/ui/Toaster';

const CATEGORIES: Category[] = ['Pizzas Tradicionais', 'Pizzas Especiais', 'Bebidas', 'Combos'];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Pizzas Tradicionais');
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = INITIAL_PRODUCTS.filter(p => 
    p.category === selectedCategory && 
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: 'G',
      extras: [],
      image: product.image,
      category: product.category
    });
    toast(`${product.name} adicionado!`);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950">
      {/* Search Header */}
      <div className="p-6 bg-neutral-950 sticky top-16 z-40 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input
            type="text"
            placeholder="Buscar sabor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sleek-input pl-12"
          />
        </div>

        {/* Categories Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar -mx-6 px-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#00A86B] text-white shadow-[0_0_15px_rgba(0,168,107,0.4)]' 
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="px-6 pb-20 flex-1">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <div className="space-y-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link 
                    to={`/product/${product.id}`}
                    className="flex gap-5 p-4 sleek-card active:scale-[0.98] transition-all bg-neutral-900/50"
                  >
                    <div className="w-28 h-28 rounded-3xl overflow-hidden flex-shrink-0 border border-white/5 shadow-xl">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <h4 className="font-bold text-neutral-100 uppercase tracking-tight mb-1">{product.name}</h4>
                        <p className="text-neutral-500 text-[10px] font-medium line-clamp-2 leading-relaxed tracking-wide uppercase">{product.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[#00A86B] font-black tracking-tighter text-lg">{formatCurrency(product.price)}</span>
                        <button 
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="bg-[#00A86B] p-2.5 rounded-xl text-white shadow-[0_0_15px_rgba(0,168,107,0.3)] hover:scale-110 active:scale-95 transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="bg-neutral-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-white/5">
                <Search className="text-neutral-700" size={32} />
              </div>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Ops! Nenhum sabor encontrado.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
