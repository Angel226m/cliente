import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';

const BarraNavegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  // Detectar scroll para cambiar estilo de la barra
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clase activa para enlaces de navegación
  const claseActiva = "text-primary-600 dark:text-primary-400 font-semibold";
  const claseNormal = "text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200";

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Ocean Tours</span>
          </Link>

          {/* Navegación escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/inicio" className={({ isActive }) => isActive ? claseActiva : claseNormal}>
              {t('menu.inicio')}
            </NavLink>
            <NavLink to="/tours" className={({ isActive }) => isActive ? claseActiva : claseNormal}>
              {t('menu.tours')}
            </NavLink>
            <NavLink to="/sedes" className={({ isActive }) => isActive ? claseActiva : claseNormal}>
              {t('menu.sedes')}
            </NavLink>
            <NavLink to="/sobre-nosotros" className={({ isActive }) => isActive ? claseActiva : claseNormal}>
              {t('menu.sobreNosotros')}
            </NavLink>
            <NavLink to="/contacto" className={({ isActive }) => isActive ? claseActiva : claseNormal}>
              {t('menu.contacto')}
            </NavLink>
          </div>

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/ingresar" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
              {t('autenticacion.ingresar')}
            </Link>
            <Link to="/registrarse" className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-colors duration-200 shadow-md hover:shadow-lg">
              {t('autenticacion.registrarse')}
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuAbierto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink 
              to="/inicio" 
              className={({ isActive }) => `px-4 py-2 rounded-lg ${isActive ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setMenuAbierto(false)}
            >
              {t('menu.inicio')}
            </NavLink>
            <NavLink 
              to="/tours" 
              className={({ isActive }) => `px-4 py-2 rounded-lg ${isActive ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setMenuAbierto(false)}
            >
              {t('menu.tours')}
            </NavLink>
            <NavLink 
              to="/sedes" 
              className={({ isActive }) => `px-4 py-2 rounded-lg ${isActive ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setMenuAbierto(false)}
            >
              {t('menu.sedes')}
            </NavLink>
            <NavLink 
              to="/sobre-nosotros" 
              className={({ isActive }) => `px-4 py-2 rounded-lg ${isActive ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setMenuAbierto(false)}
            >
              {t('menu.sobreNosotros')}
            </NavLink>
            <NavLink 
              to="/contacto" 
              className={({ isActive }) => `px-4 py-2 rounded-lg ${isActive ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setMenuAbierto(false)}
            >
              {t('menu.contacto')}
            </NavLink>
            
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
              <Link 
                to="/ingresar" 
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setMenuAbierto(false)}
              >
                {t('autenticacion.ingresar')}
              </Link>
              <Link 
                to="/registrarse" 
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-center"
                onClick={() => setMenuAbierto(false)}
              >
                {t('autenticacion.registrarse')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default BarraNavegacion;