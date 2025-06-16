 /*
import { 
  ActualizarClienteRequest, 
  CambiarContrasenaRequest, 
  Cliente, 
  LoginClienteRequest, 
  NuevoClienteRequest, 
  RespuestaAutenticacion 
} from "../../dominio/entidades/Cliente";
import { RepositorioCliente } from "../../aplicacion/puertos/salida/RepositorioCliente";
import { clienteAxios } from "../api/clienteAxios";
import { clientePublico } from "../api/clientePublico";
import { endpoints } from "../api/endpoints";
import axios from "axios";

export class RepoClienteHttp implements RepositorioCliente {
  async registrar(cliente: NuevoClienteRequest): Promise<number> {
    try {
      console.log("Intentando registrar cliente con datos:", JSON.stringify(cliente, null, 2));
      
      // Verificar formato de DNI para DNI peruano (8 dígitos)
      if (cliente.tipo_documento === 'DNI' && !/^\d{8}$/.test(cliente.numero_documento)) {
        throw new Error("El DNI debe tener 8 dígitos numéricos");
      }
      
      // Verificar formato de celular peruano (9 dígitos)
      if (!/^\d{9}$/.test(cliente.numero_celular)) {
        throw new Error("El número de celular debe tener 9 dígitos");
      }
      
      // Verificar correo electrónico
      if (!/\S+@\S+\.\S+/.test(cliente.correo)) {
        throw new Error("El formato del correo electrónico es inválido");
      }
      
      // Verificar longitud mínima de contraseña
      if (cliente.contrasena.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }
      
      const response = await clientePublico.post(endpoints.cliente.registro, cliente);
      console.log("Respuesta de registro:", response.data);
      
      if (response.data && response.data.success) {
        console.log("Registro exitoso, id:", response.data.data.id);
        return response.data.data.id;
      }
      
      throw new Error(response.data.message || "Error al registrar cliente");
    } catch (error: any) {
      console.error("Error al registrar cliente:", error);
      
      // Manejo detallado de errores para depuración
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // El servidor respondió con un código de error
          console.error("Datos del error de respuesta:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            headers: error.response.headers
          });
          
          // Intentar extraer mensajes de error específicos del backend
          let mensajeError = "Error al crear cliente";
          
          if (error.response.data) {
            if (typeof error.response.data === 'string') {
              mensajeError = error.response.data;
            } else if (error.response.data.message) {
              mensajeError = error.response.data.message;
            } else if (error.response.data.error) {
              mensajeError = error.response.data.error;
            }
          }
          
          // Verificar si el error es de duplicación (usuario ya existe)
          if (error.response.status === 400 || error.response.status === 409) {
            if (mensajeError.toLowerCase().includes("correo") || mensajeError.toLowerCase().includes("email")) {
              throw new Error("El correo electrónico ya está registrado");
            }
            if (mensajeError.toLowerCase().includes("documento")) {
              throw new Error("El número de documento ya está registrado");
            }
          }
          
          throw new Error(mensajeError);
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió respuesta
          throw new Error("No se recibió respuesta del servidor. Verifique su conexión a Internet.");
        } else {
          // Ocurrió un error durante la configuración de la solicitud
          throw new Error(`Error en la solicitud: ${error.message}`);
        }
      }
      
      // Si es un error lanzado por nuestras validaciones
      if (error instanceof Error) {
        throw error;
      }
      
      // Error genérico
      throw new Error("Error al registrar cliente");
    }
  }

  async obtenerPorId(id: number): Promise<Cliente | null> {
    try {
      const response = await clienteAxios.get(endpoints.cliente.obtenerPorId(id));
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Error al obtener cliente por ID:", error);
      return null;
    }
  }

  async actualizar(id: number, datos: ActualizarClienteRequest): Promise<void> {
    try {
      const response = await clienteAxios.put(endpoints.cliente.actualizar(id), datos);
      if (response.data && response.data.success) {
        return;
      }
      throw new Error(response.data.message || "Error al actualizar cliente");
    } catch (error: any) {
      console.error("Error al actualizar cliente:", error);
      throw error;
    }
  }

  async autenticar(credenciales: LoginClienteRequest): Promise<RespuestaAutenticacion> {
    try {
      const response = await clientePublico.post(
        `${endpoints.cliente.login}?remember_me=${credenciales.recordarme || false}`, 
        {
          correo: credenciales.correo,
          contrasena: credenciales.contrasena
        }
      );
      
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Error de autenticación");
    } catch (error: any) {
      console.error("Error de autenticación:", error);
      throw error;
    }
  }

// En tu función refrescarToken:

async refrescarToken(refreshToken?: string): Promise<RespuestaAutenticacion> {
  try {
    console.log("Intentando refrescar token...");
    
    // Si se proporciona un refresh token explícitamente, lo enviamos en el cuerpo
    // Si no, el servidor usará la cookie refresh_token
    const requestData = refreshToken ? { refresh_token: refreshToken } : {};
    
    const response = await clientePublico.post(
      endpoints.cliente.refrescarToken, 
      requestData
    );
    
    if (response.data && response.data.success) {
      console.log("Token refrescado exitosamente");
      return response.data.data;
    }
    
    throw new Error(response.data.message || "Error al refrescar token");
  } catch (error: any) {
    console.error("Error al refrescar token:", error);
    throw error;
  }
}

  async cerrarSesion(): Promise<void> {
    try {
      const response = await clienteAxios.post(endpoints.cliente.cerrarSesion);
      if (response.data && response.data.success) {
        return;
      }
      throw new Error(response.data.message || "Error al cerrar sesión");
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      // Incluso si hay error, consideramos que la sesión está cerrada en el frontend
    }
  }

  async cambiarContrasena(id: number, datos: CambiarContrasenaRequest): Promise<void> {
    try {
      const response = await clienteAxios.post(
        endpoints.cliente.cambiarContrasena(id), 
        {
          current_password: datos.contrasena_actual,
          new_password: datos.nueva_contrasena
        }
      );
      
      if (response.data && response.data.success) {
        return;
      }
      throw new Error(response.data.message || "Error al cambiar contraseña");
    } catch (error: any) {
      console.error("Error al cambiar contraseña:", error);
      throw error;
    }
  }
}*/


import { 
  ActualizarClienteRequest, 
  ActualizarDatosEmpresaRequest,
  CambiarContrasenaRequest, 
  Cliente, 
  LoginClienteRequest, 
  NuevoClienteRequest, 
  RespuestaAutenticacion 
} from "../../dominio/entidades/Cliente";
import { RepositorioCliente } from "../../aplicacion/puertos/salida/RepositorioCliente";
import { clienteAxios } from "../api/clienteAxios";
import { clientePublico } from "../api/clientePublico";
import { endpoints } from "../api/endpoints";
import axios from "axios";

export class RepoClienteHttp implements RepositorioCliente {
  async registrar(cliente: NuevoClienteRequest): Promise<number> {
    try {
      console.log("Intentando registrar cliente con datos:", JSON.stringify(cliente, null, 2));
      
      // Validaciones según tipo de documento
      if (cliente.tipo_documento === 'DNI') {
        // Verificar formato de DNI peruano (8 dígitos)
        if (!/^\d{8}$/.test(cliente.numero_documento)) {
          throw new Error("El DNI debe tener 8 dígitos numéricos");
        }
        
        // Verificar que se hayan proporcionado nombres y apellidos
        if (!cliente.nombres || !cliente.apellidos) {
          throw new Error("Para documento tipo DNI, debe proporcionar nombres y apellidos");
        }
      } else if (cliente.tipo_documento === 'RUC') {
        // Verificar formato de RUC peruano (11 dígitos)
        if (!/^\d{11}$/.test(cliente.numero_documento)) {
          throw new Error("El RUC debe tener 11 dígitos numéricos");
        }
        
        // Verificar que se hayan proporcionado razón social y dirección fiscal
        if (!cliente.razon_social || !cliente.direccion_fiscal) {
          throw new Error("Para documento tipo RUC, debe proporcionar razón social y dirección fiscal");
        }
      } else if (cliente.tipo_documento === 'CE' || cliente.tipo_documento === 'Pasaporte') {
        // Verificar que se hayan proporcionado nombres y apellidos
        if (!cliente.nombres || !cliente.apellidos) {
          throw new Error(`Para documento tipo ${cliente.tipo_documento}, debe proporcionar nombres y apellidos`);
        }
      }
      
      // Verificar formato de celular peruano (9 dígitos)
      if (!/^\d{9}$/.test(cliente.numero_celular)) {
        throw new Error("El número de celular debe tener 9 dígitos");
      }
      
      // Verificar correo electrónico
      if (!/\S+@\S+\.\S+/.test(cliente.correo)) {
        throw new Error("El formato del correo electrónico es inválido");
      }
      
      // Verificar longitud mínima de contraseña
      if (cliente.contrasena.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }
      
      const response = await clientePublico.post(endpoints.cliente.registro, cliente);
      console.log("Respuesta de registro:", response.data);
      
      if (response.data && response.data.success) {
        console.log("Registro exitoso, id:", response.data.data.id);
        return response.data.data.id;
      }
      
      throw new Error(response.data.message || "Error al registrar cliente");
    } catch (error: any) {
      console.error("Error al registrar cliente:", error);
      
      // Manejo detallado de errores para depuración
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // El servidor respondió con un código de error
          console.error("Datos del error de respuesta:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            headers: error.response.headers
          });
          
          // Intentar extraer mensajes de error específicos del backend
          let mensajeError = "Error al crear cliente";
          
          if (error.response.data) {
            if (typeof error.response.data === 'string') {
              mensajeError = error.response.data;
            } else if (error.response.data.message) {
              mensajeError = error.response.data.message;
            } else if (error.response.data.error) {
              mensajeError = error.response.data.error;
            }
          }
          
          // Verificar si el error es de duplicación (usuario ya existe)
          if (error.response.status === 400 || error.response.status === 409) {
            if (mensajeError.toLowerCase().includes("correo") || mensajeError.toLowerCase().includes("email")) {
              throw new Error("El correo electrónico ya está registrado");
            }
            if (mensajeError.toLowerCase().includes("documento")) {
              throw new Error("El número de documento ya está registrado");
            }
          }
          
          throw new Error(mensajeError);
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió respuesta
          throw new Error("No se recibió respuesta del servidor. Verifique su conexión a Internet.");
        } else {
          // Ocurrió un error durante la configuración de la solicitud
          throw new Error(`Error en la solicitud: ${error.message}`);
        }
      }
      
      // Si es un error lanzado por nuestras validaciones
      if (error instanceof Error) {
        throw error;
      }
      
      // Error genérico
      throw new Error("Error al registrar cliente");
    }
  }

  async obtenerPorId(id: number): Promise<Cliente | null> {
    try {
      const response = await clienteAxios.get(endpoints.cliente.obtenerPorId(id));
      if (response.data && response.data.success) {
        const cliente = response.data.data;
        
        // Formatear el nombre completo según el tipo de documento
        if (cliente.tipo_documento === 'RUC') {
          cliente.nombre_completo = cliente.razon_social;
        } else {
          cliente.nombre_completo = `${cliente.nombres} ${cliente.apellidos}`;
        }
        
        return cliente;
      }
      return null;
    } catch (error) {
      console.error("Error al obtener cliente por ID:", error);
      return null;
    }
  }

  async actualizar(id: number, datos: ActualizarClienteRequest): Promise<void> {
    try {
      // Validaciones según tipo de documento
      if (datos.tipo_documento === 'DNI' || datos.tipo_documento === 'CE' || datos.tipo_documento === 'Pasaporte') {
        // Para personas naturales, validar que tenga nombres y apellidos
        if ((!datos.nombres || !datos.apellidos) && datos.nombres !== undefined && datos.apellidos !== undefined) {
          throw new Error(`Para documento tipo ${datos.tipo_documento}, debe proporcionar nombres y apellidos`);
        }
      } else if (datos.tipo_documento === 'RUC') {
        // Para empresas, validar que tenga razón social y dirección fiscal
        if ((!datos.razon_social || !datos.direccion_fiscal) && datos.razon_social !== undefined && datos.direccion_fiscal !== undefined) {
          throw new Error("Para documento tipo RUC, debe proporcionar razón social y dirección fiscal");
        }
      }
      
      const response = await clienteAxios.put(endpoints.cliente.actualizar(id), datos);
      if (response.data && response.data.success) {
        return;
      }
      throw new Error(response.data.message || "Error al actualizar cliente");
    } catch (error: any) {
      console.error("Error al actualizar cliente:", error);
      throw error;
    }
  }

  async actualizarDatosEmpresa(id: number, datos: ActualizarDatosEmpresaRequest): Promise<void> {
    try {
      // Validar que los datos empresariales sean correctos
      if (!datos.razon_social || datos.razon_social.trim() === '') {
        throw new Error('La razón social es obligatoria');
      }

      if (!datos.direccion_fiscal || datos.direccion_fiscal.trim() === '') {
        throw new Error('La dirección fiscal es obligatoria');
      }
      
      const response = await clienteAxios.put(endpoints.cliente.actualizarDatosEmpresa(id), datos);
      if (response.data && response.data.success) {
        return;
      }
      throw new Error(response.data.message || "Error al actualizar datos de empresa");
    } catch (error: any) {
      console.error("Error al actualizar datos de empresa:", error);
      throw error;
    }
  }

  async autenticar(credenciales: LoginClienteRequest): Promise<RespuestaAutenticacion> {
    try {
      const response = await clientePublico.post(
        `${endpoints.cliente.login}?remember_me=${credenciales.recordarme || false}`, 
        {
          correo: credenciales.correo,
          contrasena: credenciales.contrasena
        }
      );
      
      if (response.data && response.data.success) {
        const respuestaAuth = response.data.data;
        
        // Formatear el nombre completo según el tipo de documento
        if (respuestaAuth.usuario.tipo_documento === 'RUC') {
          respuestaAuth.usuario.nombre_completo = respuestaAuth.usuario.razon_social;
        } else {
          respuestaAuth.usuario.nombre_completo = `${respuestaAuth.usuario.nombres} ${respuestaAuth.usuario.apellidos}`;
        }
        
        return respuestaAuth;
      }
      throw new Error(response.data.message || "Error de autenticación");
    } catch (error: any) {
      console.error("Error de autenticación:", error);
      throw error;
    }
  }

  async refrescarToken(refreshToken?: string): Promise<RespuestaAutenticacion> {
    try {
      console.log("Intentando refrescar token...");
      
      // Si se proporciona un refresh token explícitamente, lo enviamos en el cuerpo
      // Si no, el servidor usará la cookie refresh_token
      const requestData = refreshToken ? { refresh_token: refreshToken } : {};
      
      const response = await clientePublico.post(
        endpoints.cliente.refrescarToken, 
        requestData
      );
      
      if (response.data && response.data.success) {
        console.log("Token refrescado exitosamente");
        const respuestaAuth = response.data.data;
        
        // Formatear el nombre completo según el tipo de documento
        if (respuestaAuth.usuario.tipo_documento === 'RUC') {
          respuestaAuth.usuario.nombre_completo = respuestaAuth.usuario.razon_social;
        } else {
          respuestaAuth.usuario.nombre_completo = `${respuestaAuth.usuario.nombres} ${respuestaAuth.usuario.apellidos}`;
        }
        
        return respuestaAuth;
      }
      
      throw new Error(response.data.message || "Error al refrescar token");
    } catch (error: any) {
      console.error("Error al refrescar token:", error);
      throw error;
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      const response = await clienteAxios.post(endpoints.cliente.cerrarSesion);
      if (response.data && response.data.success) {
        return;
      }
      throw new Error(response.data.message || "Error al cerrar sesión");
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      // Incluso si hay error, consideramos que la sesión está cerrada en el frontend
    }
  }

  async cambiarContrasena(id: number, datos: CambiarContrasenaRequest): Promise<void> {
    try {
      const response = await clienteAxios.post(
        endpoints.cliente.cambiarContrasena(id), 
        {
          current_password: datos.contrasena_actual,
          new_password: datos.nueva_contrasena
        }
      );
      
      if (response.data && response.data.success) {
        return;
      }
      throw new Error(response.data.message || "Error al cambiar contraseña");
    } catch (error: any) {
      console.error("Error al cambiar contraseña:", error);
      throw error;
    }
  }
}