import { ActualizarDatosEmpresaRequest } from "../../../dominio/entidades/Cliente";
import { RepositorioCliente } from "../../puertos/salida/RepositorioCliente";

export class ActualizarDatosEmpresaCliente {
  constructor(private repositorioCliente: RepositorioCliente) {}

  async ejecutar(id: number, datos: ActualizarDatosEmpresaRequest): Promise<void> {
    // Validar que los datos empresariales sean correctos
    if (!datos.razon_social || datos.razon_social.trim() === '') {
      throw new Error('La razón social es obligatoria');
    }

    if (!datos.direccion_fiscal || datos.direccion_fiscal.trim() === '') {
      throw new Error('La dirección fiscal es obligatoria');
    }

    return await this.repositorioCliente.actualizarDatosEmpresa(id, datos);
  }
}