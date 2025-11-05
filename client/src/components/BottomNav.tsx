import { useLocation } from 'wouter';
import { Home, PlusSquare, User, Briefcase } from 'lucide-react';
import '@/styles/main.scss';

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Beranda' },
    { path: '/upload', icon: PlusSquare, label: 'Upload' },
    { path: '/dashboard', icon: Briefcase, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
            >
              <Icon className="bottom-nav__icon" size={24} />
              <span className="bottom-nav__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
