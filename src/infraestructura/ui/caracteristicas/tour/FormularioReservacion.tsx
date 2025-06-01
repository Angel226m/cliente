 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SelectorPasaje from './SelectorPasaje';

interface FormularioReservacionProps {
  tour: {
    id: number;
    nombre: string;
    precio: number;
    duracion: number;
    horarios: string[];
  };
}

const FormularioReservacion = ({ tour }: FormularioReservacionProps) => {
  const { t } = useTranslation();
  const [fecha, setFecha] = useState('');
  const [horario, setHorario] = useState('');
  const [cantidadAdultos, setCantidadAdultos] = useState(1);
  const [cantidadNinos, setCantidadNinos] = useState(0);
  const [cargando, setCargando] = useState(false);
  
  // Calcular precios y total
  const precioAdulto = tour.precio;
  const precioNino = tour.precio * 0.6; // 60% del precio adulto
  const total = (cantidadAdultos * precioAdulto) + (cantidadNinos * precioNino);
  
  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    
    // Simulación de envío
    setTimeout(() => {
      setCargando(false);
      alert(t('tour.reservaExitosa'));
    }, 1500);
  };
  
  // Fecha mínima (hoy)
  const fechaHoy = new Date().toISOString().split('T')[0];
  
  // Fecha máxima (6 meses adelante)
  const fechaMaxima = new Date();
  fechaMaxima.setMonth(fechaMaxima.getMonth() + 6);
  const fechaMax = fechaMaxima.toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {t('tour.reservarAhora')}
      </h3>
      
      <div className="flex items-center text-2xl font-bold text-gray-800 dark:text-white mb-6">
        ${tour.precio}
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
          / {t('tour.porPersona')}
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('tour.fecha')}
          </label>
          <input
            type="date"
            id="fecha"
            min={fechaHoy}
            max={fechaMax}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="horario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('tour.horario')}
          </label>
          <select
            id="horario"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-white"
          >
            <option value="">{t('tour.seleccionarHorario')}</option>
            {tour.horarios.map((hora, index) => (
              <option key={index} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
        
        {/* Selector de pasajes */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('tour.pasajeros')}
          </label>
          
          <SelectorPasaje
            tipo="adulto"
            precio={precioAdulto}
            cantidad={cantidadAdultos}
            setCantidad={setCantidadAdultos}
            min={1}
            max={10}
          />
          
          <SelectorPasaje
            tipo="nino"
            precio={precioNino}
            cantidad={cantidadNinos}
            setCantidad={setCantidadNinos}
            min={0}
            max={10}
          />
        </div>
        
        {/* Resumen */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              {cantidadAdultos} {cantidadAdultos === 1 ? t('tour.adulto') : t('tour.adultos')}
            </span>
            <span className="text-gray-800 dark:text-white">
              ${(cantidadAdultos * precioAdulto).toFixed(2)}
            </span>
          </div>
          
          {cantidadNinos > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                {cantidadNinos} {cantidadNinos === 1 ? t('tour.nino') : t('tour.ninos')}
              </span>
              <span className="text-gray-800 dark:text-white">
                ${(cantidadNinos * precioNino).toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <span className="text-gray-800 dark:text-white">
              {t('tour.total')}
            </span>
            <span className="text-primary-600 dark:text-primary-400">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={cargando}
          className={`w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-300 ${
            cargando ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {cargando ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('general.procesando')}
            </span>
          ) : t('tour.reservarAhora')}
        </button>
      </form>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        {t('tour.avisoReserva')}
      </p>
    </motion.div>
  );
};

export default FormularioReservacion;