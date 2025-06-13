
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, FileText, Check, X } from "lucide-react";

interface SolicitudReembolso {
  id: string;
  nombrePaciente: string;
  fechaAtencion: string;
  montoSolicitado: number;
  descripcion: string;
  comprobante: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  fechaSolicitud: string;
}

const reembolsosMockData: SolicitudReembolso[] = [
  {
    id: "REM001",
    nombrePaciente: "Juan Pérez",
    fechaAtencion: "2024-01-10",
    montoSolicitado: 150.00,
    descripcion: "Consulta médica general",
    comprobante: "factura_001.pdf",
    estado: 'pendiente',
    fechaSolicitud: "2024-01-12"
  },
  {
    id: "REM002", 
    nombrePaciente: "María García",
    fechaAtencion: "2024-01-08",
    montoSolicitado: 300.00,
    descripcion: "Exámenes de laboratorio",
    comprobante: "factura_002.pdf",
    estado: 'aprobado',
    fechaSolicitud: "2024-01-10"
  },
  {
    id: "REM003",
    nombrePaciente: "Carlos López",
    fechaAtencion: "2024-01-05",
    montoSolicitado: 75.00,
    descripcion: "Medicamentos recetados",
    comprobante: "factura_003.pdf",
    estado: 'rechazado',
    fechaSolicitud: "2024-01-07"
  }
];

const GestionReembolsos = () => {
  const [reembolsos, setReembolsos] = useState<SolicitudReembolso[]>(reembolsosMockData);

  const handleAprobar = (id: string) => {
    setReembolsos(prev => 
      prev.map(r => r.id === id ? { ...r, estado: 'aprobado' as const } : r)
    );
  };

  const handleRechazar = (id: string) => {
    setReembolsos(prev => 
      prev.map(r => r.id === id ? { ...r, estado: 'rechazado' as const } : r)
    );
  };

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'aprobado':
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>;
      case 'rechazado':
        return <Badge variant="destructive">Rechazado</Badge>;
      default:
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-salus-blue" />
        <h3 className="text-2xl font-bold text-salus-gray">Gestión de Reembolsos</h3>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-salus-blue">{reembolsos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {reembolsos.filter(r => r.estado === 'pendiente').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aprobadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reembolsos.filter(r => r.estado === 'aprobado').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Solicitudes de Reembolso
          </CardTitle>
          <CardDescription>
            Gestión de solicitudes de reembolso médico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Fecha Atención</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Comprobante</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reembolsos.map((reembolso) => (
                  <TableRow key={reembolso.id}>
                    <TableCell className="font-medium">{reembolso.id}</TableCell>
                    <TableCell>{reembolso.nombrePaciente}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {reembolso.fechaAtencion}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${reembolso.montoSolicitado.toFixed(2)}</TableCell>
                    <TableCell className="max-w-xs truncate">{reembolso.descripcion}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {reembolso.comprobante}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getEstadoBadge(reembolso.estado)}
                    </TableCell>
                    <TableCell>
                      {reembolso.estado === 'pendiente' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAprobar(reembolso.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRechazar(reembolso.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
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

export default GestionReembolsos;
