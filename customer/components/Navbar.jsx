import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { cart, toggleCart } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🍛</div>
          <span>22nd Parallel</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-center desktop-only" style={{ display: 'flex' }}>
          <Link to="/"             className={`nav-link ${isActive('/')             ? 'active' : ''}`}>Home</Link>
          <Link to="/menu"         className={`nav-link ${isActive('/menu')         ? 'active' : ''}`}>Menu</Link>
        </div>

        {/* Desktop Right */}
        <div className="nav-right desktop-only" style={{ display: 'flex' }}>
          <button className="btn btn-cart btn" onClick={toggleCart} style={{ gap: '0.5rem', position: 'relative' }}>
            <ShoppingBag size={16} />
            <span>Cart</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>

        {/* Mobile Right */}
        <div className="nav-right mobile-only" style={{ display: 'flex' }}>
          <button className="btn-icon" onClick={toggleCart} style={{ position: 'relative' }}>
            <ShoppingBag size={18} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          <button className="btn-icon" onClick={() => setMobileOpen(true)}>
            <MenuIcon size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <Link to="/" className="nav-logo">
              <div className="nav-logo-icon">🍛</div>
              <span>22nd Parallel</span>
            </Link>
            <button className="btn-icon" onClick={() => setMobileOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <nav className="mobile-menu-links">
            {[
              { to: '/', label: 'Home' },
              { to: '/menu', label: 'Our Menu' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="mobile-menu-link">
                <span>{label}</span>
                <ArrowRight size={20} style={{ color: 'var(--gold-dim)' }} />
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <p>Jetalpur Road, Anand, Gujarat</p>
            <p style={{ marginTop: '0.3rem' }}>Nothing Artificial · Nothing Frozen</p>
          </div>
        </div>
      )}
    </>
  );
}
