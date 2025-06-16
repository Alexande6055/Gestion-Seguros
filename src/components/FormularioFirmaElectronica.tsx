import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, KeyRound, CheckCircle2 } from "lucide-react";
import Firma from "@/service/Firma";
import MensajeModal from "./ui/mensajeModal";

const FormularioFirmaElectronica = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [claveFile, setClaveFile] = useState<File | null>(null);
    const [progreso, setProgreso] = useState<number>(0);
    const [firmado, setFirmado] = useState(false);
    const [urlDocumentoFirmado, setUrlDocumentoFirmado] = useState<string | null>(null);

    // Estados para el modal
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalExito, setModalExito] = useState(false);
    const [mensajeModal, setMensajeModal] = useState("");

    const handleFirmar = async () => {
        if (!pdfFile || !claveFile) {
            alert("Por favor selecciona el PDF y el archivo de clave de firma.");
            return;
        }
        setProgreso(0);
        const claveText = await claveFile.text();
        let clave = "";

        try {
            const json = JSON.parse(claveText);
            clave = json.clave;

            if (!clave) throw new Error("Clave vacía");
            const data = await Firma.firmarDocumento(clave, pdfFile)
            const url = URL.createObjectURL(data);
            setUrlDocumentoFirmado(url);
            setFirmado(true);
            setProgreso(100);
            setMensajeModal("¡Documento firmado exitosamente!");
            setModalExito(true);
            setModalAbierto(true);
        } catch (error) {
            let mensaje = "Error al firmar el documento";
            if (error && error.message) {
                mensaje = error.message;
            } else if (error && error.mensaje) {
                mensaje = error.mensaje;
            }
            setMensajeModal(mensaje);
            setModalExito(false);
            setModalAbierto(true);
        }

    };
    return (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-salus-blue/10 space-y-8">
            <MensajeModal
                open={modalAbierto}
                onClose={() => setModalAbierto(false)}
                success={modalExito}
                mensaje={mensajeModal}
            />
            <h2 className="text-3xl font-extrabold text-salus-blue flex items-center gap-2 mb-2">
                <FileText className="w-7 h-7 text-salus-blue" />
                Firma Electrónica de Documentos
            </h2>
            <p className="text-salus-gray-light text-lg mb-6">
                Sube tu documento PDF y tu clave de firma electrónica para firmar digitalmente de forma segura.
            </p>
            <div className="space-y-6">
                <div>
                    <label className="block text-base font-semibold text-salus-blue mb-2">Seleccionar PDF a firmar</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                            className="block w-full text-base text-salus-blue file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-base file:font-semibold file:bg-salus-blue/10 file:text-salus-blue hover:file:bg-salus-blue/20 transition"
                        />
                        {pdfFile && (
                            <span className="text-salus-blue font-medium flex items-center gap-1">
                                <FileText className="w-4 h-4" /> {pdfFile.name}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-base font-semibold text-salus-blue mb-2">
                        Documento de Clave <span className="text-salus-gray-light text-sm">(enviado por correo)</span>
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            type="file"
                            accept=".key,.txt,.json"
                            onChange={(e) => setClaveFile(e.target.files?.[0] || null)}
                            className="block w-full text-base text-salus-blue file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-base file:font-semibold file:bg-salus-blue/10 file:text-salus-blue hover:file:bg-salus-blue/20 transition"
                        />
                        {claveFile && (
                            <span className="text-salus-blue font-medium flex items-center gap-1">
                                <KeyRound className="w-4 h-4" /> {claveFile.name}
                            </span>
                        )}
                    </div>
                </div>
                <Button
                    onClick={handleFirmar}
                    disabled={progreso > 0 && progreso < 100}
                    className="w-full bg-salus-blue hover:bg-salus-blue-dark text-lg py-3 rounded-xl font-bold transition"
                >
                    Firmar Documento
                </Button>
                {progreso > 0 && progreso < 100 && (
                    <Progress value={progreso} className="h-4 bg-salus-blue/10" />
                )}
                {firmado && urlDocumentoFirmado && (
                    <div className="p-5 border rounded-xl bg-green-50 flex flex-col items-center gap-2 shadow">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                        <p className="text-green-700 font-semibold text-lg">¡Documento firmado exitosamente!</p>
                        <a
                            href={urlDocumentoFirmado}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-salus-blue underline font-medium mt-1"
                        >
                            Ver/Descargar Documento Firmado
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormularioFirmaElectronica;