import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Menu as MenuIcon, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-4 justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#00A86B] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,168,107,0.4)]">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase">Napoli <span className="text-[#00A86B]">Pizzaria</span></span>
        </Link>
        
        <div className="flex items-center gap-2">
          <Link to="/admin" className="p-2 text-neutral-500 hover:text-white transition-colors">
            <Settings size={20} />
          </Link>
          <Link to="/cart" className="relative p-2 text-neutral-200">
            <ShoppingCart size={22} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1 right-0 bg-[#00A86B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,168,107,0.5)]"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/5 h-16 flex items-center justify-around md:hidden">
        <NavLink to="/" icon={<Home size={22} />} label="Home" active={location.pathname === '/'} />
        <NavLink to="/menu" icon={<MenuIcon size={22} />} label="Cardápio" active={location.pathname === '/menu'} />
        <NavLink to="/cart" icon={<ShoppingCart size={22} />} label="Carrinho" active={location.pathname === '/cart'} />
      </nav>
    </>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link to={to} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#00A86B] drop-shadow-[0_0_8px_rgba(0,168,107,0.4)]' : 'text-neutral-500'}`}>
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </Link>
);
