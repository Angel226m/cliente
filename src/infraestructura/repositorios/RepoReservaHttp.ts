 
import { clienteAxios } from "../api/clienteAxios";
import { endpoints } from "../api/endpoints";
import { RepositorioReserva } from "../../../aplicacion/puertos/salida/RepositorioReserva";
import { 
  Reserva, 
  NuevaReservaRequest, 
  ActualizarReservaRequest, 
  ReservaMercadoPagoRequest, 
  ReservaMercadoPagoResponse 
} from "../../dominio/entidades/Reserva";

export class RepoReservaHttp implements RepositorioReserva {
  async listar(): Promise<Reserva[]> {
    const response = await clienteAxios.get(endpoints.reserva.listar);
    return response.data.data || [];
  }

  async obtenerPorId(id: number): Promise<Reserva> {
    const response = await clienteAxios.get(endpoints.reserva.obtenerPorId(id));
    return response.data.data;
  }

  async crear(reserva: NuevaReservaRequest): Promise<Reserva> {
    const response = await clienteAxios.post(endpoints.reserva.crear, reserva);
    return response.data.data;
  }

  async actualizar(id: number, reserva: ActualizarReservaRequest): Promise<Reserva> {
    const response = await clienteAxios.put(endpoints.reserva.actualizar(id), reserva);
    return response.data.data;
  }

  async eliminar(id: number): Promise<boolean> {
    const response = await clienteAxios.delete(endpoints.reserva.eliminar(id));
    return response.status === 200;
  }

  async cambiarEstado(id: number, estado: string): Promise<Reserva> {
    const response = await clienteAxios.post(endpoints.reserva.cambiarEstado(id), { estado });
    return response.data.data;
  }

  async listarPorCliente(idCliente: number): Promise<Reserva[]> {
    const response = await clienteAxios.get(endpoints.reserva.listarPorCliente(idCliente));
    return response.data.data || [];
  }

  async listarPorInstancia(idInstancia: number): Promise<Reserva[]> {
    const response = await clienteAxios.get(endpoints.reserva.listarPorInstancia(idInstancia));
    return response.data.data || [];
  }

  async listarPorFecha(fecha: string): Promise<Reserva[]> {
    const response = await clienteAxios.get(endpoints.reserva.listarPorFecha(fecha));
    return response.data.data || [];
  }

  async listarPorEstado(estado: string): Promise<Reserva[]> {
    const response = await clienteAxios.get(endpoints.reserva.listarPorEstado(estado));
    return response.data.data || [];
  }

  async listarMisReservas(): Promise<Reserva[]> {
    const response = await clienteAxios.get(endpoints.reserva.listarMisReservas);
    return response.data.data || [];
  }

  async verificarDisponibilidadInstancia(idInstancia: number, cantidadPasajeros: number): Promise<boolean> {
    const response = await clienteAxios.get(
      `${endpoints.instanciaTour.verificarDisponibilidad(idInstancia)}?cantidad=${cantidadPasajeros}`
    );
    return response.data.data?.disponible || false;
  }

  async reservarConMercadoPago(request: ReservaMercadoPagoRequest): Promise<ReservaMercadoPagoResponse> {
    const response = await clienteAxios.post(endpoints.mercadoPago.reservar, request);
    return response.data.data;
  }

  async confirmarPagoReserva(idReserva: number, idTransaccion: string, monto: number): Promise<Reserva> {
    const response = await clienteAxios.post(endpoints.mercadoPago.confirmarPago, {
      id_reserva: idReserva,
      id_transaccion: idTransaccion,
      monto: monto
    });
    return response.data.data;
  }
}