
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PagosSegurosUsuario, SegurosUsuario } from "@/Model/Seguro";
import SegurosApi from "@/service/Seguros";

const TablaPagos = () => {

  const [seguros, setSeguros] = useState<SegurosUsuario[]>([]);

  // Estado para el archivo y base64
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>("");
  const [pagosUsuario, SetPagosUsuario] = useState<PagosSegurosUsuario[]>([]);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    monto: '',
    fechaPago: '',
    comprobante: null as File | null,
    seguroSeleccionado: ''
  });
  const { toast } = useToast();
  // Convierte archivo a base64
  const convertirArchivoABase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Maneja selección del archivo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      const base64 = await convertirArchivoABase64(file);
      setPdfBase64(base64);
      setFormData(prev => ({ ...prev, comprobante: file }));
    } else {
      alert("Por favor, selecciona un archivo PDF válido");
      setPdfFile(null);
      setPdfBase64("");
      setFormData(prev => ({ ...prev, comprobante: null }));
    }
  };

  // Función para enviar el base64 al backend
  const enviarComprobante = async () => {
    if (!pdfBase64) {
      alert("Selecciona un PDF primero");
      return;
    }

    const response = await SegurosApi.enviarPagoSeguro({
      comprobanteBase64: pdfBase64,
      fecha: new Date(formData.fechaPago),
      monto: parseFloat(formData.monto),
    }, formData.seguroSeleccionado);

    if (!response.ok) throw new Error("Error al subir el comprobante");

    alert("Comprobante subido correctamente");
    setPdfFile(null);
    setPdfBase64("");
  }


  useEffect(() => {
    const fetchPagos = async () => {
      const pagoss: PagosSegurosUsuario[] = await SegurosApi.getPagosSeguros();
      console.log(pagoss);
      SetPagosUsuario(pagoss);
      const data = await SegurosApi.getSeguros();
      setSeguros(data)
    };
    fetchPagos();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmitPayment = () => {
    if (!formData.monto || !formData.fechaPago || !formData.comprobante || !formData.seguroSeleccionado) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }
    enviarComprobante()

    // Validar monto
    const monto = parseFloat(formData.monto);
    if (monto !== 69 && monto !== 120) {
      toast({
        title: "Error",
        description: "El monto debe ser $69 o $120 según el tipo de seguro",
        variant: "destructive",
      });
      return;
    }

    // Validar fecha no sea futura
    const fechaSeleccionada = new Date(formData.fechaPago);
    const fechaActual = new Date();
    fechaActual.setHours(23, 59, 59, 999);

    if (fechaSeleccionada > fechaActual) {
      toast({
        title: "Error",
        description: "No se puede seleccionar una fecha futura",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Pago procesado",
      description: "Su pago ha sido registrado exitosamente.",
    });

    setFormData({
      monto: '',
      fechaPago: '',
      comprobante: null,
      seguroSeleccionado: ''
    });
    setIsPaymentDialogOpen(false);
  };


  const abrirPDF = (dataUrl) => {
    // Convertir dataURL a Blob
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const blobUrl = URL.createObjectURL(blob);

    // Abrir PDF en nueva pestaña
    window.open(blobUrl, '_blank');
  };



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pagos Realizados</h2>
          <p className="text-gray-600">Historial de pagos completados</p>
        </div>
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-salus-blue hover:bg-salus-blue/90">
              Pagar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Realizar Pago</DialogTitle>
              <DialogDescription>
                Complete la información para procesar su pago
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="monto">Monto a Pagar (USD)</Label>
                <Input
                  id="monto"
                  name="monto"
                  type="number"
                  placeholder="69 o 120"
                  value={formData.monto}
                  onChange={handleInputChange}
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  $69 para Seguro de Salud, $120 para Seguro de Vida
                </p>
              </div>

              <div>
                <Label htmlFor="fechaPago">Fecha de Pago</Label>
                <Input
                  id="fechaPago"
                  name="fechaPago"
                  type="date"
                  value={formData.fechaPago}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="comprobante">Comprobante</Label>
                <Input
                  id="comprobante"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceptados: PDF
                </p>
              </div>

              <div>
                <Label htmlFor="seguroSeleccionado">Seguro</Label>
                <select
                  id="seguroSeleccionado"
                  name="seguroSeleccionado"
                  value={formData.seguroSeleccionado}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option value="">Seleccione un seguro</option>
                  {seguros.map(seguro => (
                    <option key={seguro.id_seguro} value={seguro.id_seguro}>
                      {seguro.nombre}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmitPayment} className="bg-salus-blue hover:bg-salus-blue/90">
                Procesar Pago
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>
            Pagos completados y comprobantes subidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Pago</TableHead>
                  <TableHead>ID Usuario</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                  <TableHead>Monto (USD)</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comprobante</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagosUsuario.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell className="font-medium">PAG00{pago.id}</TableCell>
                    <TableCell>SEG00{pago.id_seguro}</TableCell>
                    <TableCell>{new Date(pago.fecha_pago).toISOString().slice(0, 10)}</TableCell>
                    <TableCell>${pago.cantidad.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        Pagado
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {pago.comprobante_pago ? (
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-green-500" />

                          {/* Ver PDF en nueva pestaña */}

                          <button
                            onClick={() => abrirPDF(pago.comprobante_pago)}
                            className="text-blue-600 hover:underline text-sm"
                            title="Ver PDF"
                          >
                            Ver
                          </button>

                          {/* Descargar PDF */}
                          <a
                            href={`${pago.comprobante_pago}`}
                            download={`comprobante_pago_${pago.id}.pdf`}
                            className="text-sm text-gray-600 hover:text-black"
                            title="Descargar PDF"
                          >
                            Descargar
                          </a>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Sin comprobante</span>
                      )}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TablaPagos;
