import { Reserva } from '../../../dominio/entidades/Reserva';
import { RepositorioReserva } from '../../puertos/salida/RepositorioReserva';

export class CambiarEstadoReserva {
  constructor(private repositorioReserva: RepositorioReserva) {}

  async ejecutar(id: number, estado: string): Promise<Reserva> {
    return await this.repositorioReserva.cambiarEstado(id, estado);
  }
}