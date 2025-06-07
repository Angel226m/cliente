import { PaquetePasajes } from "../../dominio/entidades/PaquetePasajes";
import { RepositorioPaquetePasajes } from "../../aplicacion/puertos/salida/RepositorioPaquetePasajes";
import { clienteAxios } from "../api/clienteAxios";
import { endpoints } from "../api/endpoints";
import axios, { AxiosError } from "axios";

export class RepoPaquetePasajesHttp implements RepositorioPaquetePasajes {
  async listar(): Promise<PaquetePasajes[]> {
    const response = await clienteAxios.get(endpoints.paquetePasajes.listar);
    return response.data;
  }

  async obtenerPorId(id: number): Promise<PaquetePasajes | null> {
    try {
      const response = await clienteAxios.get(endpoints.paquetePasajes.obtenerPorId(id));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          return null;
        }
      }
      throw error;
    }
  }

  async listarPorSede(idSede: number): Promise<PaquetePasajes[]> {
    const response = await clienteAxios.get(endpoints.paquetePasajes.listarPorSede(idSede));
    return response.data;
  }

  async listarPorTipoTour(idTipoTour: number): Promise<PaquetePasajes[]> {
    const response = await clienteAxios.get(endpoints.paquetePasajes.listarPorTipoTour(idTipoTour));
    return response.data;
  }
}