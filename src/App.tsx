import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import AdminPage from './pages/AdminPage';
import { Header } from './components/Header';
import { Toaster } from './components/ui/Toaster';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen sleek-gradient text-neutral-100 font-sans pb-20 md:pb-0">
          <Header />
          <main className="max-w-md mx-auto min-h-[calc(100vh-64px)] pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </CartProvider>
    </Router>
  );
}
