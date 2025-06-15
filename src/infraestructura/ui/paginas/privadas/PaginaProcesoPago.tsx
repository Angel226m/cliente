/* 
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../../store';

const PaginaProcesoPago = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, autenticado } = useSelector((state: RootState) => state.autenticacion);
  const [cargandoPago, setCargandoPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState('mercadopago');
  const [error, setError] = useState<string | null>(null);
  
  // Recuperar datos de la reserva del state o de sessionStorage
  const datosReserva = location.state || JSON.parse(sessionStorage.getItem('datosReservaPendiente') || '{}');
  
  useEffect(() => {
    // Redirigir a inicio de sesión si no está autenticado
    if (!autenticado) {
      navigate('/ingresar', { 
        state: { 
          returnUrl: '/proceso-pago',
          mensaje: 'Debes iniciar sesión para completar tu reserva'
        } 
      });
    }
    
    // Redirigir a la página de tours si no hay datos de reserva
    if (!datosReserva || !datosReserva.tourId) {
      navigate('/tours');
    }
    
    // Configurar Mercado Pago (aquí iría el código real de integración)
    const configurarMercadoPago = async () => {
      try {
        // Aquí se cargaría el SDK de Mercado Pago
        // Este es solo un placeholder
        console.log('Configurando Mercado Pago para el pago...');
      } catch (error) {
        console.error('Error al configurar Mercado Pago:', error);
        setError('No se pudo configurar el método de pago. Por favor, inténtalo nuevamente.');
      }
    };
    
    configurarMercadoPago();
    
    // Cleanup
    return () => {
      // Limpiar cualquier configuración de Mercado Pago
    };
  }, [autenticado, datosReserva, navigate]);
  
  const procesarPago = async () => {
    setCargandoPago(true);
    setError(null);
    
    try {
      // Simulación de procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redireccionar a página de confirmación
      navigate('/reserva-exitosa', {
        state: {
          ...datosReserva,
          metodoPago,
          fechaPago: new Date().toISOString(),
          idTransaccion: 'MP' + Math.floor(Math.random() * 10000000),
          reservaId: Math.floor(Math.random() * 1000000)
        }
      });
      
      // Limpiar datos de reserva pendiente
      sessionStorage.removeItem('datosReservaPendiente');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError('No se pudo procesar el pago. Por favor, inténtalo nuevamente.');
      setCargandoPago(false);
    }
  };
  
  if (!datosReserva || !datosReserva.tourId) {
    return null; // El useEffect se encargará de redireccionar
  }
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col space-y-6">
        {/* Encabezado *//*}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl shadow-md">
          <h1 className="text-2xl font-bold">{t('pago.titulo')}</h1>
          <p className="mt-1 opacity-80">{t('pago.subtitulo')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información de la reserva *//*}
          <div className="lg:col-span-2 space-y-6">
            {/* Datos del tour *//*}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Detalles de la reserva</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{datosReserva.tourNombre}</h3>
                    <div className="mt-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(datosReserva.fecha).toLocaleDateString('es-PE', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {datosReserva.horario}
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                    {datosReserva.totalPasajeros} pasajeros
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                                       <span className="text-gray-800">S/ {Number(datosReserva.total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">IGV (18%):</span>
                      <span className="text-gray-800">S/ {(Number(datosReserva.total) * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                      <span className="text-gray-800">Total a pagar:</span>
                      <span className="text-green-600">S/ {Number(datosReserva.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Información del cliente *//*}
            {usuario && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Datos del cliente</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      value={`${usuario.nombres} ${usuario.apellidos}`}
                      disabled
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={usuario.correo} 
                      disabled
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="text" 
                      value={usuario.numero_celular || 'No especificado'} 
                      disabled
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
                    <input 
                      type="text" 
                      value={usuario.numero_documento || 'No especificado'} 
                      disabled
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Opciones de pago *//*}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Selecciona tu método de pago</h2>
              
              <div className="space-y-3">
                {/* Mercado Pago (opción principal) *//*}
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    metodoPago === 'mercadopago' 
                      ? 'border-blue-400 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => setMetodoPago('mercadopago')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mercadopago"
                        name="metodoPago"
                        checked={metodoPago === 'mercadopago'}
                        onChange={() => setMetodoPago('mercadopago')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="mercadopago" className="ml-2 flex items-center cursor-pointer">
                        <img src="https://www.mercadopago.com/org-img/MP3/API/logos/mp-logo.svg" alt="Mercado Pago" className="h-8 mr-2" />
                        <span className="font-medium text-gray-800">Mercado Pago</span>
                      </label>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Recomendado</span>
                  </div>
                  
                  {metodoPago === 'mercadopago' && (
                    <div className="mt-3 ml-6 text-sm text-gray-600">
                      <p>Paga con tarjeta, Yape, Plin o cualquier método disponible en Mercado Pago.</p>
                      <div className="flex mt-2 space-x-2">
                        <img src="https://cdn.visa.com/v2/assets/images/logos/visa/logo.png" alt="Visa" className="h-5" />
                        <img src="https://www.mastercard.com.pe/content/dam/public/mastercardcom/lac/pe/home/consumers/find-a-card/images/black-mc-logo.svg" alt="Mastercard" className="h-5" />
                        <img src="https://www.bcp.com.bo/Content/core/images/footer/yape.svg" alt="Yape" className="h-5" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Otros métodos de pago (deshabilitados por ahora) *//*}
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 opacity-60 cursor-not-allowed">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="yape"
                      name="metodoPago"
                      disabled
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-not-allowed"
                    />
                    <label htmlFor="yape" className="ml-2 flex items-center cursor-not-allowed">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-purple-700 font-bold text-sm">YP</span>
                      </div>
                      <span className="text-gray-800">Yape directo</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 opacity-60 cursor-not-allowed">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="transferencia"
                      name="metodoPago"
                      disabled
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-not-allowed"
                    />
                    <label htmlFor="transferencia" className="ml-2 flex items-center cursor-not-allowed">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Transferencia Bancaria</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Muestra error si existe *//*}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              {/* Botón de pago *//*}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={procesarPago}
                  disabled={cargandoPago}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center ${
                    cargandoPago ? 'opacity-70 cursor-not-allowed hover:transform-none' : 'transform hover:-translate-y-0.5'
                  }`}
                >
                  {cargandoPago ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando pago...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7H4C2.9 7 2 7.9 2 9V15C2 16.1 2.9 17 4 17H20C21.1 17 22 16.1 22 15V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
                        <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="currentColor"/>
                        <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="currentColor"/>
                      </svg>
                      Pagar S/ {Number(datosReserva.total).toFixed(2)}
                    </span>
                  )}
                </button>
                
                <p className="mt-2 text-xs text-center text-gray-500">
                  Al hacer clic en "Pagar", aceptas nuestros términos y condiciones.
                </p>
              </div>
            </div>
            
            {/* Información de seguridad *//*}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium text-gray-800">Pago 100% seguro</h3>
              </div>
              <p className="text-xs text-gray-600 ml-7">
                Tu información de pago se procesa de forma segura. Utilizamos encriptación SSL para mantener tus datos protegidos.
              </p>
              
              <div className="flex items-center mt-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium text-gray-800">Datos protegidos</h3>
              </div>
              <p className="text-xs text-gray-600 ml-7">
                No almacenamos tus datos de tarjeta. Todas las transacciones son procesadas por Mercado Pago.
              </p>
            </div>
          </div>
        </div>
        
        {/* Botón para volver *//*}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors hover:bg-gray-50 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginaProcesoPago;*/


import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../../store';
import axios from 'axios';

// Componentes locales
const Cargador = () => (
  <div className="flex justify-center items-center">
    <div className="relative">
      <div className="w-6 h-6 rounded-full absolute border-2 border-solid border-gray-200"></div>
      <div className="w-6 h-6 rounded-full animate-spin absolute border-2 border-solid border-cyan-500 border-t-transparent"></div>
    </div>
  </div>
);

const PaginaProcesoPago = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, autenticado } = useSelector((state: RootState) => state.autenticacion);
  
  // Estados para el flujo de pago
  const [cargandoPago, setCargandoPago] = useState(false);
  const [cargandoMercadoPago, setCargandoMercadoPago] = useState(true);
  const [metodoPago, setMetodoPago] = useState('mercadopago');
  const [error, setError] = useState<string | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  
  // Estados para datos de usuario
  const [editandoUsuario, setEditandoUsuario] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState({
    nombres: usuario?.nombres || '',
    apellidos: usuario?.apellidos || '',
    correo: usuario?.correo || '',
    numero_celular: usuario?.numero_celular || '',
    numero_documento: usuario?.numero_documento || ''
  });
  
  // Referencias para el SDK de Mercado Pago
  const mercadoPagoButtonRef = useRef<HTMLDivElement>(null);
  
  // Recuperar datos de la reserva del state o de sessionStorage
  const datosReserva = location.state || JSON.parse(sessionStorage.getItem('datosReservaPendiente') || '{}');
  
  // Calcular subtotal, IGV y total
  const subtotal = Number(datosReserva.total || 0);
  const igv = subtotal * 0.18;
  const total = subtotal; // Ya incluye IGV en este caso
  
  useEffect(() => {
    // Redirigir a inicio de sesión si no está autenticado
    if (!autenticado) {
      navigate('/ingresar', { 
        state: { 
          returnUrl: '/proceso-pago',
          mensaje: 'Debes iniciar sesión para completar tu reserva'
        } 
      });
      return;
    }
    
    // Redirigir a la página de tours si no hay datos de reserva
    if (!datosReserva || !datosReserva.tourId) {
      navigate('/tours');
      return;
    }
    
    // Inicializar datos de usuario desde el estado global
    if (usuario) {
      setDatosUsuario({
        nombres: usuario.nombres || '',
        apellidos: usuario.apellidos || '',
        correo: usuario.correo || '',
        numero_celular: usuario.numero_celular || '',
        numero_documento: usuario.numero_documento || ''
      });
    }
    
    // Configurar Mercado Pago
    const configurarMercadoPago = async () => {
      try {
        setCargandoMercadoPago(true);
        
        // En un entorno real, llamaríamos a nuestro backend para crear una preferencia
        // Aquí simulamos una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulación de respuesta con un ID de preferencia
        const simulatedPreferenceId = 'TEST-' + Math.random().toString(36).substring(2, 15);
        setPreferenceId(simulatedPreferenceId);
        
        // Cargar el SDK de Mercado Pago
        const script = document.createElement('script');
        script.src = "https://sdk.mercadopago.com/js/v2";
        script.async = true;
        
        script.onload = () => {
          // @ts-ignore - MercadoPago no está tipado
          const mp = new window.MercadoPago('TEST-0d58ec7a-7e9e-4cfa-a8d4-25e0d3226398', {
            locale: 'es-PE'
          });
          
          if (mercadoPagoButtonRef.current) {
            mercadoPagoButtonRef.current.innerHTML = '';
            
            mp.checkout({
              preference: {
                id: simulatedPreferenceId
              },
              render: {
                container: '.checkout-button',
                label: 'Pagar ahora',
              },
              theme: {
                elementsColor: '#00A1E4',
                headerColor: '#004d99',
              }
            });
          }
          
          setCargandoMercadoPago(false);
        };
        
        script.onerror = () => {
          console.error('Error al cargar el SDK de Mercado Pago');
          setError('No se pudo cargar el procesador de pagos. Por favor, intenta nuevamente.');
          setCargandoMercadoPago(false);
        };
        
        document.body.appendChild(script);
        
        return () => {
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error('Error al configurar Mercado Pago:', error);
        setError('No se pudo configurar el método de pago. Por favor, inténtalo nuevamente.');
        setCargandoMercadoPago(false);
      }
    };
    
    configurarMercadoPago();
  }, [autenticado, datosReserva, navigate, usuario]);
  
  // Manejar cambios en los campos de usuario
  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Procesar pago directamente (sin usar el botón de Mercado Pago)
  // Útil para la simulación o como fallback
  const procesarPagoDirecto = async () => {
    setCargandoPago(true);
    setError(null);
    
    try {
      // Simular creación de pago en backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular llamada al API para crear la reserva
      // const response = await axios.post('/api/reservas', {
      //   datosReserva,
      //   datosUsuario,
      //   metodoPago,
      //   preferenceId
      // });
      
      // Redireccionar a página de confirmación
      navigate('/reserva-exitosa', {
        state: {
          ...datosReserva,
          metodoPago,
          fechaPago: new Date().toISOString(),
          idTransaccion: 'MP' + Math.floor(Math.random() * 10000000),
          reservaId: Math.floor(Math.random() * 1000000)
        }
      });
      
      // Limpiar datos de reserva pendiente
      sessionStorage.removeItem('datosReservaPendiente');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError('No se pudo procesar el pago. Por favor, inténtalo nuevamente.');
    } finally {
      setCargandoPago(false);
    }
  };
  
  // Formatear fecha para mostrar
  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-PE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (!datosReserva || !datosReserva.tourId) {
    return null; // El useEffect se encargará de redireccionar
  }
  
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-white via-blue-50 to-cyan-50 min-h-screen">
      <div className="flex flex-col space-y-6">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold">{t('pago.titulo')}</h1>
          <p className="mt-1 opacity-90">{t('pago.subtitulo')}</p>
          
          {/* Paso de proceso */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between max-w-md">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs mt-1">Selección</span>
              </div>
              
              <div className="flex-1 h-0.5 mx-2 bg-white/40"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <span className="text-xs mt-1">Pago</span>
              </div>
              
              <div className="flex-1 h-0.5 mx-2 bg-white/40"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <span className="text-xs mt-1">Confirmación</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información de la reserva */}
          <div className="lg:col-span-2 space-y-6">
            {/* Datos del tour */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cyan-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-cyan-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Detalles de la reserva
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{datosReserva.tourNombre}</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{formatearFecha(datosReserva.fecha)}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{datosReserva.horario}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200">
                    {datosReserva.totalPasajeros} pasajeros
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-800">S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">IGV (18%):</span>
                      <span className="text-gray-800">S/ {igv.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                      <span className="text-gray-800">Total a pagar:</span>
                      <span className="text-teal-600 text-lg">S/ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Información del cliente */}
            {usuario && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-cyan-200">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-cyan-100">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Datos del cliente
                  </h2>
                  
                  <button 
                    type="button"
                    onClick={() => setEditandoUsuario(!editandoUsuario)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {editandoUsuario ? (
                      <>Cancelar</>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Editar
                      </>
                    )}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      name="nombres"
                      value={datosUsuario.nombres}
                      onChange={handleUsuarioChange}
                      disabled={!editandoUsuario}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editandoUsuario 
                          ? 'border-cyan-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input 
                      type="text" 
                      name="apellidos"
                      value={datosUsuario.apellidos}
                      onChange={handleUsuarioChange}
                      disabled={!editandoUsuario}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editandoUsuario 
                          ? 'border-cyan-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="correo"
                      value={datosUsuario.correo}
                      onChange={handleUsuarioChange}
                      disabled={!editandoUsuario}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editandoUsuario 
                          ? 'border-cyan-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="text" 
                      name="numero_celular"
                      value={datosUsuario.numero_celular} 
                      onChange={handleUsuarioChange}
                      disabled={!editandoUsuario}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editandoUsuario 
                          ? 'border-cyan-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
                    <input 
                      type="text" 
                      name="numero_documento"
                      value={datosUsuario.numero_documento} 
                      onChange={handleUsuarioChange}
                      disabled={!editandoUsuario}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editandoUsuario 
                          ? 'border-cyan-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>
                
                {editandoUsuario && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditandoUsuario(false)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Guardar cambios
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Opciones de pago */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-cyan-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-cyan-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Selecciona tu método de pago
              </h2>
              
              <div className="space-y-3">
                {/* Mercado Pago (opción principal) */}
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    metodoPago === 'mercadopago' 
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => setMetodoPago('mercadopago')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mercadopago"
                        name="metodoPago"
                        checked={metodoPago === 'mercadopago'}
                        onChange={() => setMetodoPago('mercadopago')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="mercadopago" className="ml-2 flex items-center cursor-pointer">
                        <img src="https://woocommerce.com/wp-content/uploads/2021/05/tw-mercado-pago-v2@2x.png" alt="Mercado Pago" className="h-8 mr-2" />
                        <span className="font-medium text-gray-800">Mercado Pago</span>
                      </label>
                    </div>
                    <span className="text-xs bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-2 py-1 rounded border border-blue-200">Recomendado</span>
                  </div>
                  
                  {metodoPago === 'mercadopago' && (
                    <div className="mt-3 ml-6 text-sm text-gray-600">
                      <p>Paga con tarjeta, Yape, Plin o cualquier método disponible en Mercado Pago.</p>
                      <div className="flex flex-wrap mt-2 gap-2">
                        <div className="bg-white rounded p-1 border border-gray-200 shadow-sm">
                          <img src="https://images.freeimages.com/vme/images/7/1/715862/visa_logo_preview.jpg?h=350" alt="Visa" className="h-5" />
                        </div>
                        <div className="bg-white rounded p-1 border border-gray-200 shadow-sm">
                          <img src="https://images.freeimages.com/vme/images/9/9/99813/mastercard_logo_preview.jpg?h=350" alt="Mastercard" className="h-5" />
                        </div>
                        <div className="bg-white rounded p-1 border border-gray-200 shadow-sm">
                          <img src="https://logosenvector.com/logo/img/yape-bcp-4390.jpg" alt="Yape" className="h-5" />
                        </div>
                        <div className="bg-white rounded p-1 border border-gray-200 shadow-sm">
                          <img src="https://images.seeklogo.com/logo-png/38/1/plin-logo-png_seeklogo-386806.png" alt="Plin" className="h-5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Otros métodos de pago (deshabilitados por ahora) */}
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 opacity-60 cursor-not-allowed">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="yape"
                      name="metodoPago"
                      disabled
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-not-allowed"
                    />
                    <label htmlFor="yape" className="ml-2 flex items-center cursor-not-allowed">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-purple-700 font-bold text-sm">YP</span>
                      </div>
                      <span className="text-gray-800">Yape directo</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 opacity-60 cursor-not-allowed">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="transferencia"
                      name="metodoPago"
                      disabled
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-not-allowed"
                    />
                    <label htmlFor="transferencia" className="ml-2 flex items-center cursor-not-allowed">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-800">Transferencia Bancaria</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Muestra error si existe */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              {/* Botón de pago */}
              <div className="mt-6">
                {cargandoMercadoPago ? (
                  <div className="w-full py-6 flex justify-center items-center bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                    <Cargador />
                    <span className="ml-2 text-blue-600">Cargando opciones de pago...</span>
                  </div>
                ) : (
                  <>
                    {/* Botón de Mercado Pago (SDK) */}
                    <div className="checkout-button" ref={mercadoPagoButtonRef}></div>
                    
                    {/* Botón alternativo por si falla el SDK */}
                    {!preferenceId && (
                      <button
                        type="button"
                        onClick={procesarPagoDirecto}
                        disabled={cargandoPago}
                        className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center ${
                          cargandoPago ? 'opacity-70 cursor-not-allowed hover:transform-none' : 'transform hover:-translate-y-0.5'
                        }`}
                      >
                        {cargandoPago ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando pago...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 7H4C2.9 7 2 7.9 2 9V15C2 16.1 2.9 17 4 17H20C21.1 17 22 16.1 22 15V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
                              <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="currentColor"/>
                              <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="currentColor"/>
                            </svg>
                            Pagar S/ {total.toFixed(2)}
                          </span>
                        )}
                      </button>
                    )}
                  </>
                )}
                
                <p className="mt-2 text-xs text-center text-gray-500">
                  Al hacer clic en "Pagar", aceptas nuestros <a href="#" className="text-blue-600 hover:underline">términos y condiciones</a>.
                </p>
              </div>
            </div>
            
            {/* Información de seguridad */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-cyan-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800">Pago 100% seguro</h3>
              </div>
              <p className="text-xs text-gray-600 ml-10">
                Tu información de pago se procesa de forma segura. Utilizamos encriptación SSL para mantener tus datos protegidos.
              </p>
              
              <div className="flex items-center mt-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800">Datos protegidos</h3>
              </div>
              <p className="text-xs text-gray-600 ml-10">
                No almacenamos tus datos de tarjeta. Todas las transacciones son procesadas por Mercado Pago con la mayor seguridad.
              </p>
            </div>
            
            {/* Soporte */}
            <div className="bg-white p-4 rounded-xl border border-cyan-200 flex items-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">¿Necesitas ayuda?</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Si tienes problemas con el pago o dudas sobre tu reserva, contáctanos:
                </p>
                <div className="mt-2 text-xs">
                  <div className="flex items-center text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +51 987 654 321
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botón para volver */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-cyan-300 text-cyan-700 font-medium rounded-lg transition-colors hover:bg-cyan-50 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginaProcesoPago;