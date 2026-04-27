import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Minus, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { INITIAL_PRODUCTS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/whatsapp';
import { toast } from '../components/ui/Toaster';

const SIZES = [
  { id: 'P', label: 'Pequena', priceAdd: -4 },
  { id: 'M', label: 'Média', priceAdd: 0 },
  { id: 'G', label: 'Grande', priceAdd: 6 }
] as const;

const EXTRAS = [
  { id: 'Borda Recheada', price: 8.00 },
  { id: 'Dobro de Queijo', price: 10.00 },
  { id: 'Massa Pan', price: 5.00 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = INITIAL_PRODUCTS.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[number]['id']>('G');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [obs, setObs] = useState('');

  if (!product) return <div className="p-10 text-center">Produto não encontrado.</div>;

  const currentPrice = product.price + (SIZES.find(s => s.id === selectedSize)?.priceAdd || 0) + 
    selectedExtras.reduce((acc, ext) => acc + (EXTRAS.find(e => e.id === ext)?.price || 0), 0);

  const handleAddToCart = () => {
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: currentPrice,
      quantity,
      size: selectedSize,
      extras: selectedExtras,
      observations: obs,
      image: product.image,
      category: product.category
    });
    toast('Adicionado ao carrinho!');
    navigate('/menu');
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const isPizza = product.category.includes('Pizzas');

  return (
    <div className="flex flex-col sleek-gradient min-h-screen">
      {/* Image Header */}
      <div className="relative h-[380px] w-full">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30"></div>
        <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white shadow-xl">
            <Heart size={20} className="text-neutral-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-neutral-950 rounded-t-[48px] -mt-16 relative z-10 px-8 pt-10 pb-32 space-y-10 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">{product.name}</h1>
            <span className="text-[#00A86B] font-black text-2xl tracking-tighter">{formatCurrency(currentPrice)}</span>
          </div>
          <p className="text-neutral-500 text-sm font-medium leading-relaxed tracking-wide uppercase italic">{product.description}</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between bg-neutral-900 border border-white/5 p-5 rounded-[28px] shadow-inner">
          <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Quantidade</span>
          <div className="flex items-center gap-6 bg-neutral-800 p-1.5 rounded-2xl border border-white/5 shadow-xl">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-white"
            >
              <Minus size={20} />
            </button>
            <span className="font-black text-xl min-w-[24px] text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-[#00A86B]"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Size Selection */}
        {isPizza && (
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Tamanho da Pizza</h3>
            <div className="flex gap-4">
              {SIZES.map(size => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`flex-1 py-5 border-2 rounded-[28px] font-black transition-all flex flex-col items-center gap-1 ${
                    selectedSize === size.id 
                      ? 'border-[#00A86B] bg-[#00A86B]/10 text-white shadow-[0_0_20px_rgba(0,168,107,0.2)]' 
                      : 'border-neutral-800 bg-neutral-900 text-neutral-600 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xl">{size.id}</div>
                  <div className="text-[10px] uppercase opacity-70 leading-none">{size.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Extras */}
        {isPizza && (
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Toppings & Extras</h3>
            <div className="grid grid-cols-1 gap-3">
              {EXTRAS.map(extra => (
                <button
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-[28px] border-2 transition-all ${
                    selectedExtras.includes(extra.id)
                      ? 'border-[#00A86B] bg-[#00A86B]/10 shadow-[0_0_15px_rgba(0,168,107,0.1)]'
                      : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                  }`}
                >
                  <span className={`text-[13px] font-black uppercase tracking-wider ${selectedExtras.includes(extra.id) ? 'text-white' : 'text-neutral-500'}`}>
                    {extra.id}
                  </span>
                  <span className={`text-xs font-black ${selectedExtras.includes(extra.id) ? 'text-[#00A86B]' : 'text-neutral-700'}`}>
                    + {formatCurrency(extra.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Observations */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Alguma observação?</h3>
          <textarea
            placeholder="Ex: Sem cebola, massa bem crocante..."
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            className="sleek-input min-h-[120px] resize-none"
          />
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-neutral-950/80 backdrop-blur-xl border-t border-white/5 max-w-md mx-auto z-20">
        <button
          onClick={handleAddToCart}
          className="w-full bg-white text-black h-16 rounded-[28px] font-black uppercase tracking-tighter text-lg flex items-center justify-between px-8 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Adicionar</span>
          <span className="text-[#00A86B]">{formatCurrency(currentPrice * quantity)}</span>
        </button>
      </div>
    </div>
  );
}
