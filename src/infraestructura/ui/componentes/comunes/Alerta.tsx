import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AlertaVariantes = 'info' | 'success' | 'warning' | 'error';

interface AlertaProps {
  tipo: AlertaVariantes;
  mensaje: string;
  duracion?: number;
  onCerrar?: () => void;
  className?: string;
  mostrarIcono?: boolean;
}

const Alerta = ({ 
  tipo = 'info', 
  mensaje, 
  duracion, 
  onCerrar, 
  className = '',
  mostrarIcono = true
}: AlertaProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duracion) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onCerrar) setTimeout(onCerrar, 300); // Permitir que la animación termine
      }, duracion);
      
      return () => clearTimeout(timer);
    }
  }, [duracion, onCerrar]);

  const handleCerrar = () => {
    setVisible(false);
    if (onCerrar) setTimeout(onCerrar, 300);
  };

  const varianteClases = {
    info: 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-300',
    success: 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-300',
    error: 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'
  };

  const iconos = {
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`border-l-4 p-4 rounded-r-md ${varianteClases[tipo]} ${className}`}
          role="alert"
        >
          <div className="flex items-start">
            {mostrarIcono && (
              <div className="flex-shrink-0 mr-3">
                {iconos[tipo]}
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm">{mensaje}</p>
            </div>
            {onCerrar && (
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    className={`inline-flex p-1.5 rounded-md ${
                      tipo === 'info' ? 'hover:bg-blue-200 dark:hover:bg-blue-800' :
                      tipo === 'success' ? 'hover:bg-green-200 dark:hover:bg-green-800' :
                      tipo === 'warning' ? 'hover:bg-yellow-200 dark:hover:bg-yellow-800' :
                      'hover:bg-red-200 dark:hover:bg-red-800'
                    } focus:outline-none`}
                    aria-label="Cerrar"
                    onClick={handleCerrar}
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alerta;