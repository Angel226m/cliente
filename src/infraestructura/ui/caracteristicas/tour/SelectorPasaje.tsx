 
import { useTranslation } from 'react-i18next';

interface SelectorPasajeProps {
  tipo: 'adulto' | 'nino';
  precio: number;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
  min: number;
  max: number;
}

const SelectorPasaje = ({ tipo, precio, cantidad, setCantidad, min, max }: SelectorPasajeProps) => {
  const { t } = useTranslation();
  
  const incrementar = () => {
    if (cantidad < max) {
      setCantidad(cantidad + 1);
    }
  };
  
  const decrementar = () => {
    if (cantidad > min) {
      setCantidad(cantidad - 1);
    }
  };
  
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
      <div>
        <h4 className="font-medium text-gray-800 dark:text-white">
          {tipo === 'adulto' ? t('tour.adulto') : t('tour.nino')}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tipo === 'adulto' 
            ? t('tour.adultoDescripcion') 
            : t('tour.ninoDescripcion')}
        </p>
        <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">
          ${precio.toFixed(2)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={decrementar}
          disabled={cantidad <= min}
          className={`w-8 h-8 flex items-center justify-center rounded-full border ${
            cantidad <= min
              ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label={t('general.decrementar')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        
        <span className="text-gray-800 dark:text-white w-5 text-center">
          {cantidad}
        </span>
        
        <button
          type="button"
          onClick={incrementar}
          disabled={cantidad >= max}
          className={`w-8 h-8 flex items-center justify-center rounded-full border ${
            cantidad >= max
              ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label={t('general.incrementar')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SelectorPasaje;