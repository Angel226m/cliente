 


import axios from 'axios';

// Cliente axios para peticiones públicas que no requieren autenticación
const clientePublico = axios.create({
  // Asegúrate de que esta URL coincida con la URL de tu backend
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  // Habilitar cookies en peticiones
  withCredentials: true
});

export { clientePublico };