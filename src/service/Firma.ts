import { UsuarioLocal } from "@/Model/Usuario";

class Firma {

    static async firmarDocumento(password: string, pdf: File) {
        const usuario: UsuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        const id = usuario.id_usuario;


        const formData = new FormData();
        formData.append("pdf", pdf);
        formData.append("clave", password);
        formData.append("id_usuario", id.toString());

        const response = await fetch(`${import.meta.env.VITE_URL_API_BACK_END}firma/firmar-documento`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            let mensaje = "Error al firmar el documento";
            const data = await response.json();
            if (data && data.mensaje) mensaje = data.mensaje;
            throw new Error(mensaje);
        }

        return await response.blob();

    }
}
export default Firma