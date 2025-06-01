 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface DetalleTourProps {
  tour: {
    nombre: string;
    descripcionLarga: string;
    duracion: number;
    calificacion: number;
    ubicacion: string;
    incluye: string[];
    noIncluye: string[];
    horarios: string[];
    recomendaciones: string[];
  };
}

const DetalleTour = ({ tour }: DetalleTourProps) => {
  const { t } = useTranslation();
  const [tabActiva, setTabActiva] = useState('descripcion');
  
  // Renderizar estrellas según calificación
  const renderEstrellas = (calificacion: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${
          index < calificacion ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };
  
  return (
    <div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
      >
        {tour.nombre}
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center flex-wrap gap-4 mb-6"
      >
        <div className="flex items-center">
          <div className="flex mr-1">
            {renderEstrellas(tour.calificacion)}
          </div>
          <span className="text-gray-700 dark:text-gray-300">
            {tour.calificacion.toFixed(1)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{tour.duracion} {t('tour.minutos')}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{tour.ubicacion}</span>
        </div>
      </motion.div>
      
      {/* Pestañas de navegación */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-wrap -mb-px">
          <button
            className={`inline-block py-4 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              tabActiva === 'descripcion'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setTabActiva('descripcion')}
          >
            {t('tour.descripcion')}
          </button>
          <button
            className={`inline-block py-4 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              tabActiva === 'detalles'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setTabActiva('detalles')}
          >
            {t('tour.detalles')}
          </button>
          <button
            className={`inline-block py-4 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              tabActiva === 'horarios'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setTabActiva('horarios')}
          >
            {t('tour.horarios')}
          </button>
          <button
            className={`inline-block py-4 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              tabActiva === 'recomendaciones'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setTabActiva('recomendaciones')}
          >
            {t('tour.recomendaciones')}
          </button>
        </div>
      </motion.div>
      
      {/* Contenido de las pestañas */}
      <motion.div
        key={tabActiva}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Descripción */}
        {tabActiva === 'descripcion' && (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {tour.descripcionLarga.split('\n\n').map((parrafo, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300">
                {parrafo}
              </p>
            ))}
          </div>
        )}
        
        {/* Detalles */}
        {tabActiva === 'detalles' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t('tour.queIncluye')}
              </h3>
              <ul className="space-y-2">
                {tour.incluye.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t('tour.queNoIncluye')}
              </h3>
              <ul className="space-y-2">
                {tour.noIncluye.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Horarios */}
        {tabActiva === 'horarios' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {t('tour.horariosDisponibles')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tour.horarios.map((horario, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ocean-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800 dark:text-white font-medium">{horario}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recomendaciones */}
        {tabActiva === 'recomendaciones' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {t('tour.recomendaciones')}
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <p className="text-blue-700 dark:text-blue-300">
                {t('tour.recomendacionesIntro')}
              </p>
            </div>
            <ul className="space-y-2">
              {tour.recomendaciones.map((recomendacion, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{recomendacion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DetalleTour;