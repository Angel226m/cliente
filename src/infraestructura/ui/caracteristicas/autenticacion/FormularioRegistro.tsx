/*import { useState } from 'react';

interface EntradaProps {
  label: string;
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  iconoIzquierda?: React.ReactNode;
  iconoDerecha?: React.ReactNode;
  onClickIconoDerecha?: () => void;
}

const Entrada = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  iconoIzquierda,
  iconoDerecha,
  onClickIconoDerecha
}: EntradaProps) => {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const esPassword = type === 'password';
  
  // Manejar el toggle de mostrar/ocultar contraseña
  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };
  
  // Determinar tipo de input para password
  const tipoInput = esPassword ? (mostrarPassword ? 'text' : 'password') : type;
  
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {iconoIzquierda && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {iconoIzquierda}
          </div>
        )}
        
        <input
          type={tipoInput}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full px-4 py-2 ${iconoIzquierda ? 'pl-10' : ''} ${(iconoDerecha || esPassword) ? 'pr-10' : ''} 
            border ${error ? 'border-red-500' : 'border-gray-300'} 
            rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
            bg-white text-gray-900 transition-colors
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
        />
        
        {esPassword && (
          <button
            type="button"
            onClick={toggleMostrarPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            {mostrarPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
        
        {!esPassword && iconoDerecha && (
          <div 
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${onClickIconoDerecha ? 'cursor-pointer' : ''}`}
            onClick={onClickIconoDerecha}
          >
            {iconoDerecha}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Entrada;*/
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { registrarCliente } from '../../../store/slices/sliceAutenticacion';
import { NuevoClienteRequest } from '../../../../dominio/entidades/Cliente';
import Boton from '../../componentes/comunes/Boton';
import Entrada from '../../componentes/comunes/Entrada';
import Alerta from '../../componentes/comunes/Alerta';

const FormularioRegistro = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { cargando, error } = useSelector((state: RootState) => state.autenticacion);
  
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    tipo_documento: 'DNI',
    numero_documento: '',
    nombres: '',
    apellidos: '',
    correo: '',
    numero_celular: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errorTerminos, setErrorTerminos] = useState('');

  useEffect(() => {
    // Limpiar el estado cuando el componente se monta
    setRegistroExitoso(false);
    setErrores({});
    setErrorTerminos('');
    setErrorGeneral(null);
  }, []);

  // Actualizar el error general cuando cambia el error en el estado de Redux
  useEffect(() => {
    if (error) {
      setErrorGeneral(error);
    }
  }, [error]);

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};
    
    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = t('validacion.requerido');
    }
    
    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = t('validacion.requerido');
    }
    
    if (!formData.numero_documento.trim()) {
      nuevosErrores.numero_documento = t('validacion.requerido');
    } else if (formData.tipo_documento === 'DNI' && !/^\d{8}$/.test(formData.numero_documento)) {
      nuevosErrores.numero_documento = t('validacion.dniInvalido');
    }
    
    if (!formData.correo.trim()) {
      nuevosErrores.correo = t('validacion.requerido');
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      nuevosErrores.correo = t('validacion.correoInvalido');
    }
    
    if (!formData.numero_celular.trim()) {
      nuevosErrores.numero_celular = t('validacion.requerido');
    } else if (!/^\d{9}$/.test(formData.numero_celular)) {
      nuevosErrores.numero_celular = t('validacion.telefonoInvalido');
    }
    
    if (!formData.contrasena) {
      nuevosErrores.contrasena = t('validacion.requerido');
    } else if (formData.contrasena.length < 6) {
      nuevosErrores.contrasena = t('validacion.contrasenaCorta');
    }
    
    if (formData.contrasena !== formData.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = t('validacion.contrasenaNoCoincide');
    }
    
    // Validar términos y condiciones
    if (!aceptaTerminos) {
      setErrorTerminos(t('validacion.aceptarTerminos'));
    } else {
      setErrorTerminos('');
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0 && aceptaTerminos;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Limpiar error general al cambiar cualquier campo
    if (errorGeneral) {
      setErrorGeneral(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiar el error general antes de validar
    setErrorGeneral(null);
    
    if (!validarFormulario()) {
      return;
    }
    
    try {
      const clienteNuevo: NuevoClienteRequest = {
        tipo_documento: formData.tipo_documento,
        numero_documento: formData.numero_documento,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        numero_celular: formData.numero_celular,
        contrasena: formData.contrasena
      };

      console.log("Enviando datos de registro:", {
        ...clienteNuevo,
        contrasena: '********' // No mostrar la contraseña en logs
      });

      const resultado = await dispatch(registrarCliente(clienteNuevo)).unwrap();
      
      if (resultado.exitoso) {
        setRegistroExitoso(true);
        
        // Si se inició sesión automáticamente, redirigir a la página principal
        if (resultado.respuestaLogin) {
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          // Si solo se registró pero no se inició sesión, redirigir a la página de ingreso
          setTimeout(() => {
            navigate('/ingresar');
          }, 2000);
        }
      } else {
        setErrorGeneral("No se pudo completar el registro. Por favor, intente nuevamente.");
      }
    } catch (error: any) {
      console.error('Error al registrar:', error);
      
      // Detectar mensajes específicos de error
      let mensajeError = error.message || "Ocurrió un error al registrar. Por favor, intente nuevamente.";
      
      if (mensajeError.toLowerCase().includes("correo")) {
        setErrores(prev => ({
          ...prev,
          correo: mensajeError
        }));
      } else if (mensajeError.toLowerCase().includes("documento")) {
        setErrores(prev => ({
          ...prev,
          numero_documento: mensajeError
        }));
      } else if (mensajeError.toLowerCase().includes("celular") || mensajeError.toLowerCase().includes("teléfono")) {
        setErrores(prev => ({
          ...prev,
          numero_celular: mensajeError
        }));
      } else if (mensajeError.toLowerCase().includes("contraseña")) {
        setErrores(prev => ({
          ...prev,
          contrasena: mensajeError
        }));
      } else {
        setErrorGeneral(mensajeError);
      }
    }
  };

  if (registroExitoso) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full mx-auto"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
            <svg className="h-10 w-10 text-green-600 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{t('registro.exitoso')}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{t('registro.redirigiendo')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        {t('registro.crearCuenta')}
      </h2>
      
      {errorGeneral && (
        <Alerta 
          tipo="error" 
          mensaje={errorGeneral}
          className="mb-4" 
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Entrada
            label={t('registro.nombres')}
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            error={errores.nombres}
            placeholder={t('registro.ingresarNombres')}
            required
          />
          
          <Entrada
            label={t('registro.apellidos')}
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            error={errores.apellidos}
            placeholder={t('registro.ingresarApellidos')}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('registro.tipoDocumento')}
            </label>
            <select
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
            >
              <option value="DNI">DNI</option>
              <option value="PASAPORTE">Pasaporte</option>
              <option value="CE">Carné de Extranjería</option>
            </select>
          </div>
          
          <Entrada
            label={t('registro.numeroDocumento')}
            type="text"
            name="numero_documento"
            value={formData.numero_documento}
            onChange={handleChange}
            error={errores.numero_documento}
            placeholder={t('registro.ingresarNumeroDocumento')}
            required
          />
        </div>

        <Entrada
          label={t('registro.correo')}
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          error={errores.correo}
          placeholder={t('registro.ingresarCorreo')}
          required
        />

        <Entrada
          label={t('registro.telefono')}
          type="tel"
          name="numero_celular"
          value={formData.numero_celular}
          onChange={handleChange}
          error={errores.numero_celular}
          placeholder={t('registro.ingresarTelefono')}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Entrada
            label={t('registro.contrasena')}
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            error={errores.contrasena}
            placeholder={t('registro.ingresarContrasena')}
            required
          />

          <Entrada
            label={t('registro.confirmarContrasena')}
            type="password"
            name="confirmarContrasena"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            error={errores.confirmarContrasena}
            placeholder={t('registro.confirmarContrasena')}
            required
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terminos"
              name="terminos"
              type="checkbox"
              checked={aceptaTerminos}
              onChange={() => setAceptaTerminos(!aceptaTerminos)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terminos" className="font-medium text-gray-700 dark:text-gray-300">
              {t('registro.aceptoTerminos')} <Link to="/terminos" className="text-blue-600 hover:text-blue-500">{t('registro.terminos')}</Link>
            </label>
            {errorTerminos && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errorTerminos}</p>
            )}
          </div>
        </div>

        <Boton
          type="submit"
          texto={t('registro.crearCuenta')}
          variante="primary"
          tamano="lg"
          ancho="full"
          cargando={cargando}
          className="mt-6"
        />

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('registro.yaTienesCuenta')}{' '}
            <Link to="/ingresar" className="font-medium text-blue-600 hover:text-blue-500">
              {t('registro.iniciarSesion')}
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default FormularioRegistro;