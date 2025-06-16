
export interface UsuarioLocal {
    id_usuario: number,
    correo: string,
    username: string,
    cedula: string,
    nombre: string,
    apellido: string,
    rol: string
}

export interface UsuarioRequestBody {
    nombre: string;
    apellido: string;
    correo: string;
    username: string;
    password: string;
    tipo: string;
    cedula: string;
    telefono: string;
}
