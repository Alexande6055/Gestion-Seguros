
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSolicitudes } from "@/context/SolicitudesContext";
import { Mail, Phone, Calendar, MessageCircle, Trash2 } from "lucide-react";

const SolicitudesContacto = () => {
  const { solicitudes, eliminarSolicitud } = useSolicitudes();

  const handleEliminar = (id: string) => {
    eliminarSolicitud(id);
  };

  const getEstadoBadge = (estado: string) => {
    return estado === 'revisado' ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Revisado
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        Pendiente
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Solicitudes de Contacto</h2>
          <p className="text-gray-600">Gestión de solicitudes de asesoría recibidas</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-salus-blue">{solicitudes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {solicitudes.filter(s => !s.id.includes('rev')).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revisadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {solicitudes.filter(s => s.id.includes('rev')).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Lista de Solicitudes
          </CardTitle>
          <CardDescription>
            Solicitudes de asesoría recibidas del formulario de contacto
          </CardDescription>
        </CardHeader>
        <CardContent>
          {solicitudes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay solicitudes registradas
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solicitudes.map((solicitud) => (
                    <TableRow key={solicitud.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {solicitud.fecha}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {solicitud.nombres} {solicitud.apellidos}
                      </TableCell>
                      <TableCell>{solicitud.cedula}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {solicitud.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {solicitud.telefono}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={solicitud.mensaje}>
                          {solicitud.mensaje}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(solicitud.id.includes('rev') ? 'revisado' : 'pendiente')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEliminar(solicitud.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SolicitudesContacto;
