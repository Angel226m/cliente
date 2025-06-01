import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Quitamos la extensión .tsx
import './index.css';

// Configuración de Polyfills y configuraciones globales si son necesarias
import 'regenerator-runtime/runtime';

// Cargar las variables de entorno según el modo de construcción
const isProduction = import.meta.env.PROD;

// Mensaje de consola para el entorno de desarrollo
if (!isProduction) {
  console.log('Ejecutando en modo desarrollo');
}

// Manejar errores no capturados
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Error global no capturado:', { message, source, lineno, colno, error });
  
  // En producción, aquí podrías enviar el error a un servicio de monitoreo
  if (isProduction) {
    // Enviar a servicio de monitoreo
  }
  
  return false;
};if (process.env.NODE_ENV === 'development') {
  console.log('Ejecutando en modo desarrollo');
  
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Error global: ', { message, error });
    // Evita mostrar el error en la consola nuevamente
    return true;
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);