
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pago {
  id: string;
  idUsuario: string;
  fechaPago: string;
  monto: number;
  estado: 'pagado';
  comprobante: string;
}

const pagosMockData: Pago[] = [
  {
    id: "PAG001",
    idUsuario: "USR001",
    fechaPago: "2024-01-15",
    monto: 69.00,
    estado: 'pagado',
    comprobante: 'comprobante_pag001.pdf'
  },
  {
    id: "PAG002", 
    idUsuario: "USR001",
    fechaPago: "2024-02-15",
    monto: 120.00,
    estado: 'pagado',
    comprobante: 'comprobante_pag002.pdf'
  },
  {
    id: "PAG003",
    idUsuario: "USR001", 
    fechaPago: "2024-03-15",
    monto: 69.00,
    estado: 'pagado',
    comprobante: 'comprobante_pag003.pdf'
  }
];

const TablaPagos = () => {
  const [pagos] = useState<Pago[]>(pagosMockData);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    monto: '',
    fechaPago: '',
    comprobante: null as File | null
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, comprobante: file }));
  };

  const handleSubmitPayment = () => {
    if (!formData.monto || !formData.fechaPago || !formData.comprobante) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }

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
      comprobante: null
    });
    setIsPaymentDialogOpen(false);
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
                  Formatos aceptados: PDF, JPG, PNG
                </p>
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
                {pagos.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell className="font-medium">{pago.id}</TableCell>
                    <TableCell>{pago.idUsuario}</TableCell>
                    <TableCell>{pago.fechaPago}</TableCell>
                    <TableCell>${pago.monto.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        Pagado
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600">
                          {pago.comprobante}
                        </span>
                      </div>
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
