 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  Reserva, 
  NuevaReservaRequest, 
  ActualizarReservaRequest, 
  ReservaMercadoPagoRequest, 
  ReservaMercadoPagoResponse 
} from "../../../dominio/entidades/Reserva";
import { RepoReservaHttp } from "../../repositorios/RepoReservaHttp";

export interface ReservaState {
  reservas: Reserva[];
  reservaActual: Reserva | null;
  preferenciaPago: ReservaMercadoPagoResponse | null;
  cargando: boolean;
  error: string | null;
}

const initialState: ReservaState = {
  reservas: [],
  reservaActual: null,
  preferenciaPago: null,
  cargando: false,
  error: null
};

const repoReserva = new RepoReservaHttp();

// Thunks
export const listarReservas = createAsyncThunk(
  "reserva/listar",
  async () => {
    return await repoReserva.listar();
  }
);

export const obtenerReservaPorId = createAsyncThunk(
  "reserva/obtenerPorId",
  async (id: number) => {
    return await repoReserva.obtenerPorId(id);
  }
);

export const crearReserva = createAsyncThunk(
  "reserva/crear",
  async (reserva: NuevaReservaRequest) => {
    return await repoReserva.crear(reserva);
  }
);

export const actualizarReserva = createAsyncThunk(
  "reserva/actualizar",
  async ({ id, reserva }: { id: number; reserva: ActualizarReservaRequest }) => {
    return await repoReserva.actualizar(id, reserva);
  }
);

export const cambiarEstadoReserva = createAsyncThunk(
  "reserva/cambiarEstado",
  async ({ id, estado }: { id: number; estado: string }) => {
    return await repoReserva.cambiarEstado(id, estado);
  }
);

export const listarMisReservas = createAsyncThunk(
  "reserva/listarMisReservas",
  async () => {
    return await repoReserva.listarMisReservas();
  }
);

export const verificarDisponibilidadInstancia = createAsyncThunk(
  "reserva/verificarDisponibilidadInstancia",
  async ({ idInstancia, cantidadPasajeros }: { idInstancia: number; cantidadPasajeros: number }) => {
    return await repoReserva.verificarDisponibilidadInstancia(idInstancia, cantidadPasajeros);
  }
);

export const reservarConMercadoPago = createAsyncThunk(
  "reserva/reservarConMercadoPago",
  async (request: ReservaMercadoPagoRequest) => {
    return await repoReserva.reservarConMercadoPago(request);
  }
);

// Slice
const reservaSlice = createSlice({
  name: "reserva",
  initialState,
  reducers: {
    limpiarReservaActual: (state) => {
      state.reservaActual = null;
    },
    limpiarError: (state) => {
      state.error = null;
    },
    limpiarPreferenciaPago: (state) => {
      state.preferenciaPago = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Listar reservas
      .addCase(listarReservas.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(listarReservas.fulfilled, (state, action) => {
        state.cargando = false;
        state.reservas = action.payload;
      })
      .addCase(listarReservas.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.error.message || "Error al listar reservas";
      })
      
      // Obtener reserva por ID
      .addCase(obtenerReservaPorId.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(obtenerReservaPorId.fulfilled, (state, action) => {
        state.cargando = false;
        state.reservaActual = action.payload;
      })
      .addCase(obtenerReservaPorId.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.error.message || "Error al obtener reserva";
      })
      
      // Crear reserva
      .addCase(crearReserva.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(crearReserva.fulfilled, (state, action) => {
        state.cargando = false;
        state.reservaActual = action.payload;
        state.reservas = [...state.reservas, action.payload];
      })
      .addCase(crearReserva.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.error.message || "Error al crear reserva";
      })
      
      // Actualizar reserva
      .addCase(actualizarReserva.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(actualizarReserva.fulfilled, (state, action) => {
        state.cargando = false;
        state.reservaActual = action.payload;
        state.reservas = state.reservas.map(r => 
          r.id === action.payload.id ? action.payload : r
        );
      })
      .addCase(actualizarReserva.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.error.message || "Error al actualizar reserva";
      })
      
      // Cambiar estado
      .addCase(cambiarEstadoReserva.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(cambiarEstadoReserva.fulfilled, (state, action) => {
        state.cargando = false;
        state.reservaActual = action.payload;
        state.reservas = state.reservas.map(r => 
          r.id === action.payload.id ? action.payload : r
        );
      })
      .addCase(cambiarEstadoReserva.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.error.message || "Error al cambiar estado de la reserva";
      })
      
      // Listar mis reservas
      .addCase(listarMisReservas.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(listarMisReservas.fulfilled, (state, action) => {
        state.cargando = false;
        state.reservas = action.payload;
      })
      .addCase(listarMisReservas.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.error.message || "Error al listar mis reservas";
      })
      
      // Reservar con Mercado Pago
      .addCase(reservarConMercadoPago.pending, (state) => {
        state.cargando = true;
        state.error = null;
        state.preferenciaPago = null;
      })
      .addCase(reservarConMercadoPago.fulfilled, (state, action) => {
        state.cargando = false;
        state.preferenciaPago = action.payload;
      })
      .addCase(reservarConMercadoPago.rejected, (state, action) => {
        state.cargando = false;
        state.error = action.error.message || "Error al reservar con Mercado Pago";
        state.preferenciaPago = null;
      });
  }
});

export const { limpiarReservaActual, limpiarError, limpiarPreferenciaPago } = reservaSlice.actions;
export default reservaSlice.reducer;