import { UsuarioRequestBody } from "@/Model/Usuario";

class Usuario {

    static async crearUsuario(data: UsuarioRequestBody) {
        const response = await fetch(`${import.meta.env.VITE_URL_API_BACK_END}usuario`, {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const statu = await response.json();
        return statu;
    }
}
export default Usuario