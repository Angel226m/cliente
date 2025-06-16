import { 
  Reserva, 
  NuevaReservaRequest, 
  ActualizarReservaRequest, 
  ReservaMercadoPagoRequest, 
  ReservaMercadoPagoResponse 
} from '../../../dominio/entidades/Reserva';

export interface RepositorioReserva {
  listar(): Promise<Reserva[]>;
  obtenerPorId(id: number): Promise<Reserva>;
  crear(reserva: NuevaReservaRequest): Promise<Reserva>;
  actualizar(id: number, reserva: ActualizarReservaRequest): Promise<Reserva>;
  eliminar(id: number): Promise<boolean>;
  cambiarEstado(id: number, estado: string): Promise<Reserva>;
  listarPorCliente(idCliente: number): Promise<Reserva[]>;
  listarPorInstancia(idInstancia: number): Promise<Reserva[]>;
  listarPorFecha(fecha: string): Promise<Reserva[]>;
  listarPorEstado(estado: string): Promise<Reserva[]>;
  listarMisReservas(): Promise<Reserva[]>;
  verificarDisponibilidadInstancia(idInstancia: number, cantidadPasajeros: number): Promise<boolean>;
  reservarConMercadoPago(request: ReservaMercadoPagoRequest): Promise<ReservaMercadoPagoResponse>;
  confirmarPagoReserva(idReserva: number, idTransaccion: string, monto: number): Promise<Reserva>;
}