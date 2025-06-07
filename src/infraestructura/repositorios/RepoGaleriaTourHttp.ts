import { RepositorioGaleriaTour } from "../../aplicacion/puertos/salida/RepositorioGaleriaTour";
import { GaleriaTour } from "../../dominio/entidades/GaleriaTour";
import { clienteAxios } from "../api/clienteAxios";
import { endpoints } from "../api/endpoints";

export class RepoGaleriaTourHttp implements RepositorioGaleriaTour {
  async listar(): Promise<GaleriaTour[]> {
    try {
      const { data } = await clienteAxios.get(endpoints.galeriaTour.listar);
      return data;
    } catch (error) {
      console.error("Error al listar las galerías de tour:", error);
      return [];
    }
  }

  async obtenerPorId(id: number): Promise<GaleriaTour | null> {
    try {
      const { data } = await clienteAxios.get(endpoints.galeriaTour.obtenerPorId(id));
      return data;
    } catch (error) {
      console.error(`Error al obtener la galería de tour con ID ${id}:`, error);
      return null;
    }
  }

  async listarPorTipoTour(idTipoTour: number): Promise<GaleriaTour[]> {
    try {
      const { data } = await clienteAxios.get(endpoints.galeriaTour.listarPorTipoTour(idTipoTour));
      return data;
    } catch (error) {
      console.error(`Error al listar las galerías por tipo de tour ${idTipoTour}:`, error);
      return [];
    }
  }
}