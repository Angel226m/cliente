 
export interface ReservaBase {
  idCliente: number;
  idInstancia: number;
  idCanal: number;
  idSede: number;
  idVendedor?: number | null;
  totalPagar: number;
  cantidadPasajes: CantidadPasaje[];
  paquetes: PaqueteReserva[];
  notas?: string;
}

export interface CantidadPasaje {
  idTipoPasaje: number;
  cantidad: number;
  precioUnitario: number;
}

export interface PaqueteReserva {
  idPaquete: number;
  cantidad: number;
  precioUnitario: number;
}

export interface NuevaReservaRequest extends ReservaBase {}

export interface ActualizarReservaRequest extends ReservaBase {}

export interface CambiarEstadoReservaRequest {
  estado: 'RESERVADO' | 'CONFIRMADA' | 'CANCELADA';
}

export interface Reserva extends ReservaBase {
  id: number;
  fechaCreacion: string;
  fechaActualizacion: string;
  estado: 'RESERVADO' | 'CONFIRMADA' | 'CANCELADA';
  fechaCancelacion?: string;
  // Relaciones
  cliente?: {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    numeroCelular?: string;
  };
  instancia?: {
    id: number;
    idTourProgramado: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
    horaSalida: string;
    cupoTotal: number;
    cupoDisponible: number;
    estado: string;
  };
  canalVenta?: {
    id: number;
    nombre: string;
  };
  sede?: {
    id: number;
    nombre: string;
  };
  vendedor?: {
    id: number;
    nombres: string;
    apellidos: string;
  };
}

export interface ReservaMercadoPagoRequest {
  idCliente: number;
  idInstancia: number;
  totalPagar: number;
  cantidadPasajes: CantidadPasaje[];
  paquetes: PaqueteReserva[];
  telefono?: string;
  documento?: string;
}

export interface ReservaMercadoPagoResponse {
  idReserva: number;
  nombreTour: string;
  preferenceID: string;
  initPoint: string;
  sandboxInitPoint: string;
}