import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Margherita Clássica',
    description: 'Molho de tomate pelado, mozzarella de búfala, manjericão fresco e azeite extra virgem.',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?q=80&w=2070&auto=format&fit=crop',
    category: 'Pizzas Tradicionais',
    featured: true
  },
  {
    id: '2',
    name: 'Calabresa Artesanal',
    description: 'Molho de tomate, mozzarella, calabresa fatiada, cebola roxa e orégano.',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1780&auto=format&fit=crop',
    category: 'Pizzas Tradicionais',
    featured: true
  },
  {
    id: '3',
    name: 'Quatro Queijos Premium',
    description: 'Mozzarella, gorgonzola, provolone e parmesão de longa cura.',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
    category: 'Pizzas Tradicionais'
  },
  {
    id: '4',
    name: 'Frango com Catupiry Real',
    description: 'Frango desfiado temperado, milho selecionado e o verdadeiro Catupiry.',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1887&auto=format&fit=crop',
    category: 'Pizzas Especiais'
  },
  {
    id: '5',
    name: 'Trufa Negra & Cogumelos',
    description: 'Mix de cogumelos frescos, azeite de trufa negra, mozzarella e parmesão.',
    price: 68.90,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=2076&auto=format&fit=crop',
    category: 'Pizzas Especiais',
    featured: true
  },
  {
    id: '6',
    name: 'Coca-Cola 2L',
    description: 'Gelada e refrescante.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1965&auto=format&fit=crop',
    category: 'Bebidas'
  },
  {
    id: '7',
    name: 'Suco de Laranja 500ml',
    description: 'Suco natural feito na hora.',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1600271886342-dc672e273ff1?q=80&w=1887&auto=format&fit=crop',
    category: 'Bebidas'
  },
  {
    id: '8',
    name: 'Combo Família',
    description: '2 Pizzas Tradicionais G + Coca-Cola 2L.',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1621235122709-a1b635677941?q=80&w=2074&auto=format&fit=crop',
    category: 'Combos'
  }
];
