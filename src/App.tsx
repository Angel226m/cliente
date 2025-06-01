 
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './infraestructura/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './infraestructura/i18n/i18n';
import { ContextoIdiomaProvider } from './infraestructura/servicios/idioma/ContextoIdioma';

// Lazy loading de componentes para mejorar rendimiento
const EnrutadorApp = lazy(() => import('./infraestructura/ui/rutas/EnrutadorApp'));
const Cargador = lazy(() => import('./infraestructura/ui/componentes/comunes/Cargador'));

// Animación para transiciones entre páginas
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Estilos globales
import './infraestructura/ui/estilos/index.css';

function App() {
  // Efecto para añadir clases al body
  useEffect(() => {
    document.body.classList.add('bg-gradient-to-b', 'from-blue-50', 'to-teal-50', 'min-h-screen');
    
    // Detectar modo oscuro del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    
    // Limpieza al desmontar
    return () => {
      document.body.classList.remove('bg-gradient-to-b', 'from-blue-50', 'to-teal-50', 'min-h-screen');
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ContextoIdiomaProvider>
        <Provider store={store}>
          <Router>
            <AnimatePresence mode="wait">
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                  <Cargador texto="Cargando aplicación..." />
                </div>
              }>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
                <EnrutadorApp />
              </Suspense>
            </AnimatePresence>
          </Router>
        </Provider>
      </ContextoIdiomaProvider>
    </I18nextProvider>
  );
}

export default App;