export type Category = 'Pizzas Tradicionais' | 'Pizzas Especiais' | 'Bebidas' | 'Combos';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: 'P' | 'M' | 'G';
  extras: string[];
  observations?: string;
  image: string;
  category: Category;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'Dinheiro' | 'Pix' | 'Cartão';
}
