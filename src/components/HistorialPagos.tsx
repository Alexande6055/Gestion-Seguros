
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Check, Clock } from "lucide-react";

interface PagoCliente {
  id: string;
  cliente: string;
  fechaPago: string;
  monto: number;
  tipoSeguro: string;
  comprobante: string;
  estado: 'pendiente' | 'aprobado';
  fechaAprobacion?: string;
}

const pagosMockData: PagoCliente[] = [
  {
    id: "PAG001",
    cliente: "Juan Pérez",
    fechaPago: "2024-01-15",
    monto: 69.00,
    tipoSeguro: "Salud",
    comprobante: "comprobante_001.pdf",
    estado: 'aprobado',
    fechaAprobacion: "2024-01-16"
  },
  {
    id: "PAG002",
    cliente: "María García", 
    fechaPago: "2024-01-14",
    monto: 120.00,
    tipoSeguro: "Vida",
    comprobante: "comprobante_002.pdf",
    estado: 'pendiente'
  },
  {
    id: "PAG003",
    cliente: "Carlos López",
    fechaPago: "2024-01-13",
    monto: 69.00,
    tipoSeguro: "Salud",
    comprobante: "comprobante_003.pdf",
    estado: 'aprobado',
    fechaAprobacion: "2024-01-14"
  }
];

const HistorialPagos = () => {
  const [pagos, setPagos] = useState<PagoCliente[]>(pagosMockData);

  const handleAprobar = (id: string) => {
    setPagos(prev => 
      prev.map(p => p.id === id ? { 
        ...p, 
        estado: 'aprobado' as const,
        fechaAprobacion: new Date().toISOString().split('T')[0]
      } : p)
    );
  };

  const getEstadoBadge = (estado: string) => {
    return estado === 'aprobado' ? (
      <Badge className="bg-green-100 text-green-800">
        <Check className="w-3 h-3 mr-1" />
        Aprobado
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        <Clock className="w-3 h-3 mr-1" />
        Pendiente
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-salus-blue" />
        <h3 className="text-2xl font-bold text-salus-gray">Historial de Pagos</h3>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-salus-blue">{pagos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pagos.filter(p => p.estado === 'pendiente').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aprobados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {pagos.filter(p => p.estado === 'aprobado').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Pagos de Clientes
          </CardTitle>
          <CardDescription>
            Gestión y aprobación de pagos realizados por clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Pago</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha Pago</TableHead>
                  <TableHead>Monto (USD)</TableHead>
                  <TableHead>Tipo Seguro</TableHead>
                  <TableHead>Comprobante</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagos.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell className="font-medium">{pago.id}</TableCell>
                    <TableCell>{pago.cliente}</TableCell>
                    <TableCell>{pago.fechaPago}</TableCell>
                    <TableCell className="font-medium">${pago.monto.toFixed(2)}</TableCell>
                    <TableCell>{pago.tipoSeguro}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-blue-500" />
                        {pago.comprobante}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getEstadoBadge(pago.estado)}
                    </TableCell>
                    <TableCell>
                      {pago.estado === 'pendiente' && (
                        <Button
                          size="sm"
                          onClick={() => handleAprobar(pago.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Aprobar
                        </Button>
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

export default HistorialPagos;
