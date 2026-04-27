import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_PRODUCTS } from '../data/menuData';
import { Product } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { toast } from '../components/ui/Toaster';

export default function AdminPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast('Produto removido!');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    if (editing.id) {
      setProducts(prev => prev.map(p => p.id === editing.id ? { ...p, ...editing } as Product : p));
      toast('Produto atualizado!');
    } else {
      const newProduct = {
        ...editing,
        id: Math.random().toString(36).substr(2, 9),
      } as Product;
      setProducts(prev => [...prev, newProduct]);
      toast('Produto criado!');
    }
    setEditing(null);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-white shadow-xl">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">ADMIN</h1>
        </div>
        <button 
          onClick={() => setEditing({})}
          className="bg-[#00A86B] text-white p-3 rounded-2xl shadow-[0_0_15px_rgba(0,168,107,0.4)]"
        >
          <Plus size={24} />
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-neutral-900 border border-white/5 p-8 rounded-[40px] shadow-2xl space-y-6">
          <h2 className="text-xl font-black uppercase tracking-widest text-[#00A86B] mb-2">{editing.id ? 'Editar Produto' : 'Novo Produto'}</h2>
          <div className="space-y-4">
            <AdminInput label="Nome" value={editing.name || ''} onChange={(v: string) => setEditing({ ...editing, name: v })} />
            <AdminInput label="Preço" value={editing.price?.toString() || ''} onChange={(v: string) => setEditing({ ...editing, price: parseFloat(v) })} type="number" />
            <AdminInput label="Descrição" value={editing.description || ''} onChange={(v: string) => setEditing({ ...editing, description: v })} />
            <AdminInput label="URL da Imagem" value={editing.image || ''} onChange={(v: string) => setEditing({ ...editing, image: v })} />
          </div>
          <div className="flex gap-4 pt-6">
            <button 
              type="button" 
              onClick={() => setEditing(null)}
              className="flex-1 py-4 bg-neutral-800 rounded-2xl font-black uppercase tracking-widest text-xs text-neutral-400"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 bg-[#00A86B] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(0,168,107,0.3)]"
            >
              Salvar
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="bg-neutral-900 border border-white/5 p-4 rounded-[32px] flex items-center gap-5 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A86B]/0 to-[#00A86B]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={product.image} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
              <div className="flex-1 z-10">
                <h4 className="font-black text-sm uppercase tracking-tight text-neutral-100">{product.name}</h4>
                <p className="text-[#00A86B] text-xs font-black tracking-tight">{formatCurrency(product.price)}</p>
              </div>
              <div className="flex gap-2 z-10">
                <button 
                  onClick={() => setEditing(product)}
                  className="p-2.5 bg-neutral-800 rounded-xl text-neutral-500 hover:text-white transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2.5 bg-neutral-800 rounded-xl text-neutral-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const AdminInput = ({ label, onChange, ...props }: any) => (
  <div className="space-y-1.5 flex flex-col items-start">
    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      {...props}
      onChange={e => onChange(e.target.value)}
      className="sleek-input"
    />
  </div>
);
