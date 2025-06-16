import { Contrato } from "./Contrato";
import { UsuarioRequestBody } from "./Usuario";

export interface SegurosUsuario {
    id_seguro: number;
    nombre: string;
    descripcion: string;
    estado: number;
    cobertura: string;
    fecha_contrato: string;
}

export interface PagosSegurosUsuario {
    id: number;
    id_seguro: number;
    fecha_pago: string;
    cantidad: number;
    comprobante_pago: string;
}

export interface ListaSeguros {
    id_seguro: number,
    nombre: string
}
export interface ContratoRequestBody {
    id_usuario: UsuarioRequestBody;
    id_seguro: number;
    fechaContrato: string;
    fechaFin: string;
    documento: string[];
}
