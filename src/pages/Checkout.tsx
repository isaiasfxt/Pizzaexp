import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { generateWhatsAppLink, formatCurrency } from '../utils/whatsapp';
import { CustomerInfo } from '../types';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Pix'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const link = generateWhatsAppLink(cart, total, form);
    
    // Simulate loading
    setTimeout(() => {
      window.open(link, '_blank');
      clearCart();
      navigate('/');
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-6 space-y-8 pb-32">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-white shadow-xl">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">FECHAR PEDIDO</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <InputGroup
            label="Seu Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Como podemos te chamar?"
            required
          />
          <InputGroup
            label="WhatsApp"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            required
            type="tel"
          />
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest ml-1">Endereço de Entrega</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Rua, número e bairro"
              required
              className="sleek-input"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest ml-1">Pagamento</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Dinheiro', 'Pix', 'Cartão'] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, paymentMethod: method }))}
                  className={`py-4 px-2 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
                    form.paymentMethod === method
                      ? 'border-[#00A86B] bg-[#00A86B]/10 text-white shadow-lg'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-500 hover:border-neutral-700'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-neutral-900 border border-white/5 p-8 rounded-[40px] space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00A86B]/10 blur-[60px]"></div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 text-xs font-black uppercase tracking-widest">Resumo: {cart.length} itens</span>
          </div>
          <div className="flex justify-between items-end border-t border-white/5 pt-4">
            <span className="text-neutral-400 text-sm font-bold uppercase tracking-tight">Total a pagar</span>
            <span className="text-3xl font-black text-[#00A86B] tracking-tighter">{formatCurrency(total)}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00A86B] text-white h-16 rounded-[28px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale shadow-[0_10px_30px_rgba(0,168,107,0.4)]"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.91 0-3.791-.459-5.467-1.332l-6.53 1.714zm5.868-4.75c1.556.923 3.09 1.393 4.694 1.393 5.305 0 9.622-4.317 9.624-9.623 0-2.571-1.002-4.987-2.822-6.806-1.82-1.821-4.237-2.822-6.803-2.822-5.305 0-9.622 4.317-9.624 9.623-.001 1.75.474 3.456 1.373 4.935l-.101.161-1.121 4.095 4.195-1.102.185-.154z"/></svg>
                Enviar Pedido
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const InputGroup = ({ label, ...props }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest ml-1">{label}</label>
    <input
      {...props}
      className="sleek-input"
    />
  </div>
);
