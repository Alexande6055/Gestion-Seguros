import { SolicitudAsesor } from "@/context/SolicitudesContext";
import { createSolicitud, SolicitudesUsuario } from "@/Model/Solicitud";

class Solicitudes {

    static async createSolicitud(solitudData) {
        const dat = await fetch(`${import.meta.env.VITE_URL_API_BACK_END}solicitudes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(solitudData)
        });
    }

    static async obtenerSolicitudes() {
        const dat = await fetch(`${import.meta.env.VITE_URL_API_BACK_END}solicitudes`);
        const response: SolicitudesUsuario[] = await dat.json()
        return response;
    }
}
export default Solicitudes;