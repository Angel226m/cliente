 
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Seccion from '../../componentes/layout/Seccion';
import DetalleTour from '../../caracteristicas/tour/DetalleTour';
import GaleriaTour from '../../caracteristicas/tour/GaleriaTour';
import FormularioReservacion from '../../caracteristicas/tour/FormularioReservacion';
import ResenasTour from '../../caracteristicas/tour/ResenasTour';
import ToursRelacionados from '../../caracteristicas/tour/ToursRelacionados';
import Cargador from '../../componentes/comunes/Cargador';

// Tipo para el tour
interface Tour {
  id: number;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  precio: number;
  duracion: number;
  calificacion: number;
  numResenas: number;
  imagenPrincipal: string;
  galeria: string[];
  ubicacion: string;
  incluye: string[];
  noIncluye: string[];
  horarios: string[];
  recomendaciones: string[];
}

const PaginaDetalleTour = () => {
  const { t } = useTranslation();
  const { idTour } = useParams<{ idTour: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulación de carga de datos
  useEffect(() => {
    // En un caso real, aquí se haría la petición a la API
    const cargarTour = async () => {
      try {
        // Simulamos un retraso
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Si el ID es válido
        if (idTour && !isNaN(parseInt(idTour))) {
          // Tour de ejemplo
          const tourData: Tour = {
            id: parseInt(idTour),
            nombre: 'Tour Islas Ballestas',
            descripcion: 'Explora la biodiversidad marina de las Islas Ballestas en un recorrido fascinante.',
            descripcionLarga: 'Las Islas Ballestas son un grupo de pequeñas islas cerca de la costa de Paracas, Perú. Estas islas son el hogar de miles de aves, lobos marinos y otros animales marinos, lo que las convierte en uno de los destinos turísticos más populares del país. \n\nNuestro tour te llevará en un emocionante recorrido en lancha rápida donde podrás observar la increíble fauna marina y aprender sobre el ecosistema único de esta reserva natural. El paseo incluye la observación del misterioso "Candelabro", una gigantesca figura dibujada en la ladera de una colina cuyo origen sigue siendo un misterio.',
            precio: 85,
            duracion: 120,
            calificacion: 4.8,
            numResenas: 245,
            imagenPrincipal: 'https://images.unsplash.com/photo-1558551649-e6b9c8301187',
            galeria: [
              'https://images.unsplash.com/photo-1558551649-e6b9c8301187',
              'https://images.unsplash.com/photo-1557750255-c76072a7aad1',
              'https://images.unsplash.com/photo-1558291053-0a87f21ac6ea',
              'https://images.unsplash.com/photo-1624214434355-957807aa3c93',
              'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e'
            ],
            ubicacion: 'Pisco, Perú',
            incluye: [
              'Transporte en lancha rápida',
              'Guía bilingüe (español/inglés)',
              'Chalecos salvavidas',
              'Tasas de entrada a la reserva'
            ],
            noIncluye: [
              'Traslados hotel-puerto-hotel',
              'Alimentos y bebidas',
              'Propinas',
              'Seguro de viaje'
            ],
            horarios: [
              '8:00 AM - 10:00 AM',
              '10:30 AM - 12:30 PM',
              '1:00 PM - 3:00 PM'
            ],
            recomendaciones: [
              'Usar protector solar',
              'Llevar sombrero o gorra',
              'Ropa cómoda',
              'Llevar cámara fotográfica',
              'Medicamentos para mareo si es necesario'
            ]
          };
          
          setTour(tourData);
        } else {
          setError(t('tour.noEncontrado'));
        }
      } catch (err) {
        setError(t('tour.errorCarga'));
        console.error("Error al cargar el tour:", err);
      } finally {
        setCargando(false);
      }
    };
    
    cargarTour();
  }, [idTour, t]);

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Cargador tamano="lg" />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <Seccion className="py-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {error || t('tour.noEncontrado')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('tour.intentarDespues')}
          </p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300"
          >
            {t('general.volver')}
          </button>
        </div>
      </Seccion>
    );
  }

  return (
    <div>
      {/* Galería de imágenes */}
      <GaleriaTour tour={tour} />
      
      <Seccion className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal del tour */}
          <div className="lg:col-span-2">
            <DetalleTour tour={tour} />
            
            {/* Reseñas del tour */}
            <div className="mt-12">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
              >
                {t('tour.resenasClientes')} ({tour.numResenas})
              </motion.h2>
              
              <ResenasTour idTour={tour.id} />
            </div>
          </div>
          
          {/* Formulario de reservación */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FormularioReservacion tour={tour} />
            </div>
          </div>
        </div>
      </Seccion>
      
      {/* Tours relacionados */}
      <Seccion className="py-12 bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {t('tour.toursRelacionados')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('tour.toursRelacionadosDescripcion')}
          </p>
        </motion.div>
        
        <ToursRelacionados idTourActual={tour.id} />
      </Seccion>
    </div>
  );
};

export default PaginaDetalleTour;