 
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Testimonio {
  id: number;
  nombre: string;
  comentario: string;
  fecha: string;
  calificacion: number;
  avatar: string;
  tour: string;
}

const Testimonios = () => {
  const { t } = useTranslation();
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [testimonioActual, setTestimonioActual] = useState(0);

  // Simulación de carga de datos
  useEffect(() => {
    // En un caso real, aquí se haría la petición a la API
    const datos = [
      {
        id: 1,
        nombre: "María García",
        comentario: "Increíble experiencia en las Islas Ballestas. Los guías fueron muy amables y conocedores. Vimos muchos lobos marinos y aves. ¡Definitivamente lo recomendaría!",
        fecha: "2025-05-10",
        calificacion: 5,
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        tour: "Tour Islas Ballestas"
      },
      {
        id: 2,
        nombre: "Carlos Mendoza",
        comentario: "El avistamiento de delfines superó mis expectativas. Pudimos ver muchos delfines saltando cerca del bote. La tripulación fue muy profesional y nos explicaron mucho sobre estos fascinantes animales.",
        fecha: "2025-05-08",
        calificacion: 5,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        tour: "Avistamiento de Delfines"
      },
      {
        id: 3,
        nombre: "Lucía Rodríguez",
        comentario: "El tour al atardecer fue mágico. Los colores en el cielo, el mar tranquilo, todo creó un ambiente perfecto. El servicio a bordo fue excelente y las bebidas estaban deliciosas.",
        fecha: "2025-05-15",
        calificacion: 4,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        tour: "Sunset Cruise"
      }
    ];
    setTestimonios(datos);
  }, []);

  // Función para avanzar al siguiente testimonio
  const siguienteTestimonio = () => {
    setTestimonioActual((prev) => (prev + 1) % testimonios.length);
  };

  // Función para retroceder al testimonio anterior
  const testimonioAnterior = () => {
    setTestimonioActual((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

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

  // Si no hay testimonios, mostrar skeleton loader
  if (testimonios.length === 0) {
    return (
      <div className="flex justify-center">
        <div className="animate-pulse w-full max-w-4xl">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
          <div className="flex mt-4">
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          key={testimonioActual}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl relative"
        >
          {/* Comillas decorativas */}
          <div className="absolute top-4 left-4 text-6xl text-primary-200 dark:text-primary-900/30 opacity-60">
            "
          </div>
          
          <div className="relative z-10">
            <div className="flex mb-6">
              {renderEstrellas(testimonios[testimonioActual].calificacion)}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 italic">
              {testimonios[testimonioActual].comentario}
            </p>
            
            <div className="flex items-center">
              <img 
                src={testimonios[testimonioActual].avatar} 
                alt={testimonios[testimonioActual].nombre} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {testimonios[testimonioActual].nombre}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonios[testimonioActual].tour} - {new Date(testimonios[testimonioActual].fecha).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Botones de navegación */}
      {testimonios.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={testimonioAnterior}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Testimonio anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            {testimonios.map((_, index) => (
              <button
                key={index}
                onClick={() => setTestimonioActual(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === testimonioActual 
                    ? 'bg-primary-500 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-400 dark:hover:bg-primary-700'
                }`}
                aria-label={`Ir a testimonio ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={siguienteTestimonio}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Siguiente testimonio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonios;