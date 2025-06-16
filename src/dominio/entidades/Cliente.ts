/*export interface Cliente {
  id_cliente: number;
  tipo_documento: string;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  correo: string;
  numero_celular: string;
  eliminado?: boolean;
}

export interface NuevoClienteRequest {
  tipo_documento: string;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  correo: string;
  numero_celular: string;
  contrasena: string;
}

export interface ActualizarClienteRequest {
  tipo_documento?: string;
  numero_documento?: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  numero_celular?: string;
  contrasena?: string;
}

export interface LoginClienteRequest {
  correo: string;
  contrasena: string;
  recordarme?: boolean;
}

export interface CambiarContrasenaRequest {
  contrasena_actual: string;
  nueva_contrasena: string;
}

export interface ClienteAutenticado {
  id_cliente: number;
  nombres: string;
  apellidos: string;
  nombre_completo: string;
  tipo_documento: string;
  numero_documento: string;
  correo: string;
  numero_celular: string;
  rol: string;
}

export interface RespuestaAutenticacion {
  usuario: ClienteAutenticado;
  token?: string;
  refresh_token?: string;
}*/

export interface Cliente {
  id_cliente: number;
  tipo_documento: string; // DNI, CE, Pasaporte, RUC
  numero_documento: string;
  // Campos para persona natural (obligatorios si tipo_documento es DNI, CE o Pasaporte)
  nombres?: string;
  apellidos?: string;
  // Campos para empresas (obligatorios si tipo_documento es RUC)
  razon_social?: string;
  direccion_fiscal?: string;
  // Campos de contacto
  correo: string;
  numero_celular: string;
  nombre_completo?: string; // Campo calculado
  eliminado?: boolean;
}

export interface NuevoClienteRequest {
  tipo_documento: string;
  numero_documento: string;
  // Campos para persona natural
  nombres?: string;
  apellidos?: string;
  // Campos para empresas
  razon_social?: string;
  direccion_fiscal?: string;
  // Campos de contacto
  correo: string;
  numero_celular: string;
  contrasena: string;
}

export interface ActualizarClienteRequest {
  tipo_documento?: string;
  numero_documento?: string;
  // Campos para persona natural
  nombres?: string;
  apellidos?: string;
  // Campos para empresas
  razon_social?: string;
  direccion_fiscal?: string;
  // Campos de contacto
  correo?: string;
  numero_celular?: string;
  contrasena?: string;
}

export interface ActualizarDatosEmpresaRequest {
  razon_social: string;
  direccion_fiscal: string;
}

export interface LoginClienteRequest {
  correo: string;
  contrasena: string;
  recordarme?: boolean;
}

export interface CambiarContrasenaRequest {
  contrasena_actual: string;
  nueva_contrasena: string;
}

export interface ClienteAutenticado {
  id_cliente: number;
  nombres?: string;
  apellidos?: string;
  razon_social?: string;
  nombre_completo?: string;
  tipo_documento: string;
  numero_documento: string;
  correo: string;
  numero_celular: string;
  rol: string;
}

export interface RespuestaAutenticacion {
  usuario: ClienteAutenticado;
  token?: string;
  refresh_token?: string;
}