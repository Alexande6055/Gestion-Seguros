import React, { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Shield,
} from "lucide-react";
import { SegurosUsuario } from "@/Model/Seguro";
import SegurosApi from "@/service/Seguros";
import MensajeModal from "./ui/mensajeModal";


const ContratosCliente = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(true);
    const [modalMensaje, setModalMensaje] = useState("");
    const [seguros, setSeguros] = useState<SegurosUsuario[]>([]);
    const [archivos, setArchivos] = useState<{ [id: number]: File | null }>({});
    const handleFileChange = (seguroId: number, file: File | null) => {
        setArchivos(prev => ({ ...prev, [seguroId]: file }));
    };
    const handleUpload = (seguroId: number) => {
        const file = archivos[seguroId];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64 = (e.target?.result as string)?.split(',')[1];
                await SegurosApi.subirDocumentoUsuario({
                    idContrato: seguroId,
                    documento: base64,
                    tipoDocumento: 'contrato'
                });
                setModalSuccess(true);
                setModalMensaje(`Archivo '${file.name}' subido correctamente para seguro SEG00${seguroId}`);
                setModalOpen(true);
            };
            reader.onerror = () => {
                setModalSuccess(false);
                setModalMensaje("Error al leer el archivo. Intenta nuevamente.");
                setModalOpen(true);
            };
            reader.readAsDataURL(file);
        } else {
            setModalSuccess(false);
            setModalMensaje("Por favor selecciona un archivo PDF antes de subir.");
            setModalOpen(true);
        }
    };
    useEffect(() => {
        const fetchSeguros = async () => {
            const data = await SegurosApi.getSeguros();
            setSeguros(data);
        }
        fetchSeguros();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <div>
                <MensajeModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    success={modalSuccess}
                    mensaje={modalMensaje}
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mis Seguros Contratados</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {seguros.map((seguro) => (
                        <Card key={seguro.id_seguro} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        {/* Puedes ajustar el icono según el tipo si tienes esa info */}
                                        <Shield className="h-5 w-5 text-blue-500" />
                                        {seguro.nombre}
                                    </CardTitle>
                                    <Badge
                                        variant={seguro.estado === 1 ? 'default' : 'destructive'}
                                    >
                                        {seguro.estado === 1 ? 'activo' : 'inactivo'}
                                    </Badge>
                                </div>
                                <CardDescription>{seguro.descripcion}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ID del Seguro:</span>
                                        <span className="font-medium">SEG00{seguro.id_seguro}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Fecha de Contrato:</span>
                                        <span className="font-medium">
                                            {new Date(seguro.fecha_contrato).toISOString().slice(0, 10)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Cobertura:</span>
                                        <span className="font-medium">${seguro.cobertura}</span>
                                    </div>
                                </div>
                            </CardContent>

                            {seguro.estado !== 1 && (
                                <div className="mt-6 p-4 rounded-lg border border-red-200 bg-red-50 flex flex-col items-center gap-3 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span className="text-base font-semibold text-red-700">Sube el contrato (PDF)</span>
                                    </div>
                                    <div className="mt-6 p-4 rounded-lg border border-red-200 bg-red-50 flex flex-col items-center gap-3 shadow-sm">

                                        <label className="relative cursor-pointer bg-white border border-dashed border-red-300 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-red-100 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-8m0 0l-3 3m3-3l3 3" />
                                            </svg>
                                            <span className="text-sm text-red-600 font-medium">Seleccionar archivo PDF</span>
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={e => {
                                                    const file = e.target.files?.[0] || null;
                                                    handleFileChange(seguro.id_seguro, file);
                                                    const label = document.getElementById(`file-label-${seguro.id_seguro}`);
                                                    if (label) label.textContent = file ? file.name : "Ningún archivo seleccionado";
                                                }}
                                            />
                                            <span id={`file-label-${seguro.id_seguro}`} className="text-xs text-gray-500 italic">
                                                {archivos[seguro.id_seguro]?.name || "Ningún archivo seleccionado"}
                                            </span>
                                        </label>
                                        {archivos[seguro.id_seguro] && (
                                            <button
                                                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                                onClick={() => handleUpload(seguro.id_seguro)}
                                            >
                                                Subir archivo
                                            </button>
                                        )}
                                    </div>

                                    <span id={`file-label-${seguro.id_seguro}`} className="text-xs text-gray-500 italic">Ningún archivo seleccionado</span>
                                </div>
                            )}

                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContratosCliente;