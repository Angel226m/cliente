 
import { Reserva } from '../../../dominio/entidades/Reserva';
import { RepositorioReserva } from '../../puertos/salida/RepositorioReserva';

export class ListarReservas {
  constructor(private repositorioReserva: RepositorioReserva) {}

  async ejecutar(): Promise<Reserva[]> {
    return await this.repositorioReserva.listar();
  }
}