import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Importar reducers
import lenguajeReducer from './slices/sliceLenguaje';
import carritoReducer from './slices/sliceCarrito';
import tourReducer from './slices/sliceTour';
import sedeReducer from './slices/sliceSede';

// Combinar reducers
const rootReducer = combineReducers({
  lenguaje: lenguajeReducer,
  carrito: carritoReducer,
  tour: tourReducer,
  sede: sedeReducer
});

// Configurar store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;