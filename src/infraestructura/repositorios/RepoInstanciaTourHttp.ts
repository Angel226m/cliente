import { InstanciaTour, FiltrosInstanciaTour } from "../../dominio/entidades/InstanciaTour";
import { RepositorioInstanciaTour } from "../../aplicacion/puertos/salida/RepositorioInstanciaTour";
import { clienteAxios } from "../api/clienteAxios";
import { endpoints } from "../api/endpoints";
import axios, { AxiosError } from "axios";

export class RepoInstanciaTourHttp implements RepositorioInstanciaTour {
  async listar(): Promise<InstanciaTour[]> {
    const response = await clienteAxios.get(endpoints.instanciaTour.listar);
    return response.data;
  }

  async obtenerPorId(id: number): Promise<InstanciaTour | null> {
    try {
      const response = await clienteAxios.get(endpoints.instanciaTour.obtenerPorId(id));
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

  async listarPorFiltros(filtros: FiltrosInstanciaTour): Promise<InstanciaTour[]> {
    const response = await clienteAxios.get(endpoints.instanciaTour.listarPorFiltros, {
      params: filtros
    });
    return response.data;
  }

  async listarDisponibles(): Promise<InstanciaTour[]> {
    const response = await clienteAxios.get(endpoints.instanciaTour.listarDisponibles);
    return response.data;
  }

  async listarPorFecha(fecha: string): Promise<InstanciaTour[]> {
    const response = await clienteAxios.get(endpoints.instanciaTour.listarPorFecha(fecha));
    return response.data;
  }
}