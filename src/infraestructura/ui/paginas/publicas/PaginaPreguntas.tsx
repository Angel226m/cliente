 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Seccion from '../../componentes/layout/Seccion';
import { Link } from 'react-router-dom';

const PaginaPreguntas = () => {
  const { t } = useTranslation();
  const [categoriaActiva, setCategoriaActiva] = useState('general');
  
  // Categorías de preguntas
  const categorias = [
    { id: 'general', nombre: t('preguntas.categoriaGeneral') },
    { id: 'reservas', nombre: t('preguntas.categoriaReservas') },
    { id: 'tours', nombre: t('preguntas.categoriaTours') },
    { id: 'pagos', nombre: t('preguntas.categoriaPagos') },
    { id: 'seguridad', nombre: t('preguntas.categoriaSeguridad') }
  ];
  
  // Preguntas por categoría
  const preguntas = {
    general: [
      {
        pregunta: t('preguntas.general1Pregunta'),
        respuesta: t('preguntas.general1Respuesta')
      },
      {
        pregunta: t('preguntas.general2Pregunta'),
        respuesta: t('preguntas.general2Respuesta')
      },
      {
        pregunta: t('preguntas.general3Pregunta'),
        respuesta: t('preguntas.general3Respuesta')
      },
      {
        pregunta: t('preguntas.general4Pregunta'),
        respuesta: t('preguntas.general4Respuesta')
      }
    ],
    reservas: [
      {
        pregunta: t('preguntas.reservas1Pregunta'),
        respuesta: t('preguntas.reservas1Respuesta')
      },
      {
        pregunta: t('preguntas.reservas2Pregunta'),
        respuesta: t('preguntas.reservas2Respuesta')
      },
      {
        pregunta: t('preguntas.reservas3Pregunta'),
        respuesta: t('preguntas.reservas3Respuesta')
      },
      {
        pregunta: t('preguntas.reservas4Pregunta'),
        respuesta: t('preguntas.reservas4Respuesta')
      }
    ],
    tours: [
      {
        pregunta: t('preguntas.tours1Pregunta'),
        respuesta: t('preguntas.tours1Respuesta')
      },
      {
        pregunta: t('preguntas.tours2Pregunta'),
        respuesta: t('preguntas.tours2Respuesta')
      },
      {
        pregunta: t('preguntas.tours3Pregunta'),
        respuesta: t('preguntas.tours3Respuesta')
      },
      {
        pregunta: t('preguntas.tours4Pregunta'),
        respuesta: t('preguntas.tours4Respuesta')
      }
    ],
    pagos: [
      {
        pregunta: t('preguntas.pagos1Pregunta'),
        respuesta: t('preguntas.pagos1Respuesta')
      },
      {
        pregunta: t('preguntas.pagos2Pregunta'),
        respuesta: t('preguntas.pagos2Respuesta')
      },
      {
        pregunta: t('preguntas.pagos3Pregunta'),
        respuesta: t('preguntas.pagos3Respuesta')
      },
      {
        pregunta: t('preguntas.pagos4Pregunta'),
        respuesta: t('preguntas.pagos4Respuesta')
      }
    ],
    seguridad: [
      {
        pregunta: t('preguntas.seguridad1Pregunta'),
        respuesta: t('preguntas.seguridad1Respuesta')
      },
      {
        pregunta: t('preguntas.seguridad2Pregunta'),
        respuesta: t('preguntas.seguridad2Respuesta')
      },
      {
        pregunta: t('preguntas.seguridad3Pregunta'),
        respuesta: t('preguntas.seguridad3Respuesta')
      },
      {
        pregunta: t('preguntas.seguridad4Pregunta'),
        respuesta: t('preguntas.seguridad4Respuesta')
      }
    ]
  };
  
  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      {/* Cabecera */}
      <div className="relative h-64 bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1519452575417-564c1401ecc0')",
            opacity: 0.4
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/90" />
        
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('preguntas.titulo')}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('preguntas.subtitulo')}
            </p>
          </motion.div>
        </div>
      </div>
      
      <Seccion className="py-16">
        {/* Buscador */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <input 
              type="text"
              placeholder={t('preguntas.buscarPlaceholder')}
              className="w-full px-5 py-4 pr-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-white"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </motion.div>
        
        {/* Categorías */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaActiva(categoria.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                categoriaActiva === categoria.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </motion.div>
        
        {/* Preguntas */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {preguntas[categoriaActiva as keyof typeof preguntas].map((pregunta, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer focus:outline-none">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {pregunta.pregunta}
                    </h3>
                    <span className="ml-6 flex-shrink-0 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    <p>{pregunta.respuesta}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </Seccion>
      
      {/* Contacto */}
      <Seccion className="py-16 bg-gray-50 dark:bg-gray-900">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {t('preguntas.noEncuentrasRespuesta')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('preguntas.contactanos')}
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300"
          >
            {t('preguntas.irContacto')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </Seccion>
    </div>
  );
};

export default PaginaPreguntas;