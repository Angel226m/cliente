 /*
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TourProps {
  tour: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    duracion: number;
    calificacion: number;
    imagen: string;
    ubicacion: string;
  };
}

const TarjetaTour = ({ tour }: TourProps) => {
  const { t } = useTranslation();
  
  // Variantes para animaciones
  // En TarjetaTour.tsx, modifica:
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96] // Asegurar que los valores estén en el rango correcto
    }
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};
  return (
    <motion.div
      variants={item}
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group"
    >
      <Link to={`/tours/${tour.id}`} className="block">
        <div className="relative overflow-hidden h-60">
          <img 
            src={tour.imagen} 
            alt={tour.nombre} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center text-white mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{tour.calificacion.toFixed(1)}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{tour.nombre}</h3>
            <div className="flex items-center text-white mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{tour.ubicacion}</span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{tour.descripcion}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300 space-x-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{tour.duracion} {t('tour.minutos')}</span>
              </div>
            </div>
            
            <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
              ${tour.precio}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="px-5 pb-5">
        <Link 
          to={`/tours/${tour.id}`} 
          className="block w-full py-2 text-center bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300"
        >
          {t('tour.verDetalles')}
        </Link>
      </div>
    </motion.div>
  );
};

export default TarjetaTour;*/


 import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TourProps {
  tour: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    duracion: number;
    calificacion: number;
    imagen: string;
    ubicacion: string;
  };
}

const TarjetaTour = ({ tour }: TourProps) => {
  const { t } = useTranslation();
  
  // Variantes para animaciones
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={item}
      whileHover="hover"
      className="bg-white dark:bg-ocean-600 rounded-xl overflow-hidden shadow-lg group"
    >
      <Link to={`/tours/${tour.id}`} className="block">
        <div className="relative overflow-hidden h-60">
          <img 
            src={tour.imagen} 
            alt={tour.nombre} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-800/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center text-white mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{tour.calificacion.toFixed(1)}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{tour.nombre}</h3>
            <div className="flex items-center text-white mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{tour.ubicacion}</span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 dark:text-ocean-100 mb-4 line-clamp-2">{tour.descripcion}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-ocean-100 space-x-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-ocean-500 dark:text-ocean-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{tour.duracion} {t('tour.minutos')}</span>
              </div>
            </div>
            
            <div className="text-xl font-bold text-ocean-600 dark:text-ocean-200">
              ${tour.precio}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="px-5 pb-5">
        <Link 
          to={`/tours/${tour.id}`} 
          className="block w-full py-2 text-center bg-gradient-to-r from-ocean-500 to-cyan-500 hover:from-ocean-600 hover:to-cyan-600 text-white rounded-lg transition-colors duration-300"
        >
          {t('tour.verDetalles')}
        </Link>
      </div>
    </motion.div>
  );
};

export default TarjetaTour;