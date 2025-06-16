import { RepositorioReserva } from '../../puertos/salida/RepositorioReserva';

export class VerificarDisponibilidadInstancia {
  constructor(private repositorioReserva: RepositorioReserva) {}

  async ejecutar(idInstancia: number, cantidadPasajeros: number): Promise<boolean> {
    return await this.repositorioReserva.verificarDisponibilidadInstancia(idInstancia, cantidadPasajeros);
  }
}