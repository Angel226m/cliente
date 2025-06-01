 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface GaleriaTourProps {
  tour: {
    nombre: string;
    galeria: string[];
    imagenPrincipal: string;
  };
}

const GaleriaTour = ({ tour }: GaleriaTourProps) => {
  const { t } = useTranslation();
  const [imagenActiva, setImagenActiva] = useState(0);
  const [modoGaleria, setModoGaleria] = useState(false);
  
  // Calcular índice anterior y siguiente
  const indiceAnterior = (imagenActiva - 1 + tour.galeria.length) % tour.galeria.length;
  const indiceSiguiente = (imagenActiva + 1) % tour.galeria.length;
  
  // Cambiar a la imagen anterior
  const anteriorImagen = () => {
    setImagenActiva(indiceAnterior);
  };
  
  // Cambiar a la imagen siguiente
  const siguienteImagen = () => {
    setImagenActiva(indiceSiguiente);
  };
  
  // Abrir galería en pantalla completa
  const abrirGaleria = (indice: number) => {
    setImagenActiva(indice);
    setModoGaleria(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Cerrar galería en pantalla completa
  const cerrarGaleria = () => {
    setModoGaleria(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Galería normal */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-96 md:h-[500px]">
          {/* Imagen principal */}
          <div 
            className="md:col-span-8 relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => abrirGaleria(0)}
          >
            <img 
              src={tour.galeria[0]} 
              alt={`${tour.nombre} - Imagen principal`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="bg-black bg-opacity-50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Imágenes secundarias */}
          <div className="md:col-span-4 grid grid-cols-2 gap-2">
            {tour.galeria.slice(1, 5).map((imagen, index) => (
              <div 
                key={index}
                className="relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => abrirGaleria(index + 1)}
              >
                <img 
                  src={imagen} 
                  alt={`${tour.nombre} - Imagen ${index + 2}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="bg-black bg-opacity-50 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                
                {/* Mostrar botón de "Ver más" en la última imagen si hay más de 5 imágenes */}
                {index === 3 && tour.galeria.length > 5 && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={() => abrirGaleria(4)}
                  >
                    <div className="text-white text-center">
                      <p className="text-xl font-bold">+{tour.galeria.length - 5}</p>
                      <p className="text-sm">{t('tour.verMasImagenes')}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Galería en pantalla completa */}
      <AnimatePresence>
        {modoGaleria && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col"
          >
            {/* Barra superior */}
            <div className="flex justify-between items-center py-4 px-6 text-white">
              <h2 className="text-xl font-semibold">
                {tour.nombre} - {t('tour.imagen')} {imagenActiva + 1} / {tour.galeria.length}
              </h2>
              <button
                onClick={cerrarGaleria}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                aria-label={t('general.cerrar')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contenedor de imagen */}
            <div className="flex-grow flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imagenActiva}
                  src={tour.galeria[imagenActiva]}
                  alt={`${tour.nombre} - Imagen ${imagenActiva + 1}`}
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Botones de navegación */}
              <button
                onClick={anteriorImagen}
                className="absolute left-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white transition-all duration-200 transform hover:scale-110"
                aria-label={t('general.anterior')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={siguienteImagen}
                className="absolute right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white transition-all duration-200 transform hover:scale-110"
                aria-label={t('general.siguiente')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Miniaturas */}
            <div className="p-4 bg-black bg-opacity-50">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {tour.galeria.map((imagen, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenActiva(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === imagenActiva ? 'border-primary-500 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={imagen} 
                      alt={`Miniatura ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GaleriaTour;