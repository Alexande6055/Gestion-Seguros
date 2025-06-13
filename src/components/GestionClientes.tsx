
import { useState } from "react";
import { Users, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Datos de ejemplo
const clientesData = [
  { 
    id: 1, 
    nombre: "Ana Rodríguez", 
    email: "ana.rodriguez@email.com", 
    telefono: "+57 300 123 4567",
    cedula: "12345678",
    fechaNacimiento: "1985-03-15",
    direccion: "Calle 123 #45-67, Bogotá",
    seguro: "Salud", 
    estado: "Activo", 
    fechaRegistro: "2023-02-10",
    valorMensual: 69
  },
  { 
    id: 2, 
    nombre: "Pedro Martínez", 
    email: "pedro.martinez@email.com", 
    telefono: "+57 310 987 6543",
    cedula: "87654321",
    fechaNacimiento: "1978-07-22",
    direccion: "Carrera 45 #12-34, Medellín",
    seguro: "Vida", 
    estado: "Activo", 
    fechaRegistro: "2023-04-05",
    valorMensual: 420
  },
  { 
    id: 3, 
    nombre: "Laura Sánchez", 
    email: "laura.sanchez@email.com", 
    telefono: "+57 320 555 7890",
    cedula: "11223344",
    fechaNacimiento: "1992-11-08",
    direccion: "Avenida 80 #23-45, Cali",
    seguro: "Salud", 
    estado: "Pendiente", 
    fechaRegistro: "2023-05-12",
    valorMensual: 69
  },
];

const GestionClientes = () => {
  const [clientes, setClientes] = useState(clientesData);
  const [editingCliente, setEditingCliente] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    cedula: "",
    fechaNacimiento: "",
    direccion: "",
    seguro: "Salud",
    valorMensual: 69
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Actualizar valor mensual según el tipo de seguro
      ...(name === 'seguro' && {
        valorMensual: value === 'Vida' ? 420 : 69
      })
    }));
  };

  const handleEditCliente = (cliente: any) => {
    setEditingCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      cedula: cliente.cedula,
      fechaNacimiento: cliente.fechaNacimiento,
      direccion: cliente.direccion,
      seguro: cliente.seguro,
      valorMensual: cliente.valorMensual
    });
  };

  const handleUpdateCliente = () => {
    setClientes(clientes.map(cliente => 
      cliente.id === editingCliente.id 
        ? { ...cliente, ...formData }
        : cliente
    ));
    setEditingCliente(null);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      cedula: "",
      fechaNacimiento: "",
      direccion: "",
      seguro: "Salud",
      valorMensual: 69
    });
  };

  const handleToggleEstado = (id: number) => {
    setClientes(clientes.map(cliente => 
      cliente.id === id 
        ? { ...cliente, estado: cliente.estado === 'Activo' ? 'Inactivo' : 'Activo' }
        : cliente
    ));
  };

  const ClienteForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombre">Nombre Completo</Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre completo"
          />
        </div>
        <div>
          <Label htmlFor="cedula">Cédula</Label>
          <Input
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleInputChange}
            placeholder="Número de cédula"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="correo@ejemplo.com"
          />
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="+57 300 123 4567"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
          <Input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="seguro">Tipo de Seguro</Label>
          <select
            id="seguro"
            name="seguro"
            value={formData.seguro}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          >
            <option value="Salud">Seguro de Salud ($69/mes)</option>
            <option value="Vida">Seguro de Vida ($420/mes)</option>
          </select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          placeholder="Dirección completa"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-salus-blue" />
          <h3 className="text-2xl font-bold text-salus-gray">Clientes</h3>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-salus-gray-light">Total Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-salus-blue">{clientes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-salus-gray-light">Clientes Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {clientes.filter(c => c.estado === 'Activo').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-salus-gray-light">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {clientes.filter(c => c.estado === 'Pendiente').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de clientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Lista de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Seguro</TableHead>
                  <TableHead>Valor Mensual</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="font-medium">{cliente.id}</TableCell>
                    <TableCell>{cliente.nombre}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.telefono}</TableCell>
                    <TableCell>{cliente.seguro}</TableCell>
                    <TableCell className="font-semibold text-salus-blue">
                      ${cliente.valorMensual}/mes
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cliente.estado === 'Activo' 
                          ? 'bg-green-100 text-green-800' 
                          : cliente.estado === 'Pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cliente.estado}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={editingCliente?.id === cliente.id} onOpenChange={(open) => !open && setEditingCliente(null)}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditCliente(cliente)}
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Editar Cliente</DialogTitle>
                              <DialogDescription>
                                Modifique la información del cliente.
                              </DialogDescription>
                            </DialogHeader>
                            <ClienteForm />
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingCliente(null)}>
                                Cancelar
                              </Button>
                              <Button onClick={handleUpdateCliente} className="bg-salus-blue hover:bg-salus-blue-dark">
                                Actualizar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant={cliente.estado === 'Activo' ? 'destructive' : 'default'} 
                          size="sm"
                          onClick={() => handleToggleEstado(cliente.id)}
                        >
                          {cliente.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                        </Button>
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

export default GestionClientes;
