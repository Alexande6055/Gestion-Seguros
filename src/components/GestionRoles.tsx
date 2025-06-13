import { useState } from "react";
import { UserCog, Eye, EyeOff, ChevronDown, ChevronUp, Edit, Power, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Datos de ejemplo
const asesores = [
  { id: 1, nombre: "Juan Pérez", email: "juan.perez@salus.com", contrasena: "password123", estado: "Activo", fechaIngreso: "2023-01-15" },
  { id: 2, nombre: "María García", email: "maria.garcia@salus.com", contrasena: "secure456", estado: "Activo", fechaIngreso: "2023-03-20" },
  { id: 3, nombre: "Carlos López", email: "carlos.lopez@salus.com", contrasena: "mypass789", estado: "Inactivo", fechaIngreso: "2022-11-10" },
];

const clientes = [
  { id: 1, nombre: "Ana Rodríguez", email: "ana.rodriguez@email.com", contrasena: "cliente123", estado: "Activo", seguro: "Salud", fechaRegistro: "2023-02-10" },
  { id: 2, nombre: "Pedro Martínez", email: "pedro.martinez@email.com", contrasena: "pedrom456", estado: "Activo", seguro: "Vida", fechaRegistro: "2023-04-05" },
  { id: 3, nombre: "Laura Sánchez", email: "laura.sanchez@email.com", contrasena: "lauras789", estado: "Pendiente", seguro: "Salud", fechaRegistro: "2023-05-12" },
];

const GestionRoles = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<{[key: string]: boolean}>({});
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const togglePasswordVisibility = (id: string) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const maskPassword = (password: string, isVisible: boolean) => {
    return isVisible ? password : '•'.repeat(password.length);
  };

  const handleEdit = (user: any, type: 'asesor' | 'cliente') => {
    setEditingUser({ ...user, type });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Guardando usuario editado:', editingUser);
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleToggleStatus = (id: number, type: 'asesor' | 'cliente') => {
    console.log(`Cambiando estado del ${type} con ID:`, id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <UserCog className="w-6 h-6 text-salus-blue" />
        <h3 className="text-2xl font-bold text-salus-gray">Gestión de Roles y Accesos</h3>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifique la información del usuario
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input
                  id="edit-nombre"
                  value={editingUser.nombre}
                  onChange={(e) => setEditingUser({...editingUser, nombre: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-estado">Estado</Label>
                <Select value={editingUser.estado} onValueChange={(value) => setEditingUser({...editingUser, estado: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="bg-salus-blue hover:bg-salus-blue/90">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Accordion type="multiple" className="w-full space-y-4">
        <AccordionItem value="asesores" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <UserCog className="w-5 h-5 text-salus-blue" />
              <span className="text-lg font-semibold text-salus-gray">Asesores de Seguros</span>
              <span className="bg-salus-blue text-white px-2 py-1 rounded-full text-xs">{asesores.length}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contraseña</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Ingreso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asesores.map((asesor) => (
                    <TableRow key={asesor.id}>
                      <TableCell className="font-medium">{asesor.id}</TableCell>
                      <TableCell>{asesor.nombre}</TableCell>
                      <TableCell>{asesor.email}</TableCell>
                      <TableCell className="min-w-[150px]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono">
                            {maskPassword(asesor.contrasena, passwordVisibility[`asesor-${asesor.id}`])}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePasswordVisibility(`asesor-${asesor.id}`)}
                            className="h-6 w-6 p-0"
                          >
                            {passwordVisibility[`asesor-${asesor.id}`] ? 
                              <EyeOff className="h-3 w-3" /> : 
                              <Eye className="h-3 w-3" />
                            }
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          asesor.estado === 'Activo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {asesor.estado}
                        </span>
                      </TableCell>
                      <TableCell>{asesor.fechaIngreso}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(asesor, 'asesor')}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            variant={asesor.estado === 'Activo' ? 'destructive' : 'default'} 
                            size="sm"
                            onClick={() => handleToggleStatus(asesor.id, 'asesor')}
                          >
                            {asesor.estado === 'Activo' ? (
                              <>
                                <PowerOff className="w-3 h-3 mr-1" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <Power className="w-3 h-3 mr-1" />
                                Activar
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="clientes" className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <UserCog className="w-5 h-5 text-salus-blue" />
              <span className="text-lg font-semibold text-salus-gray">Clientes</span>
              <span className="bg-salus-blue text-white px-2 py-1 rounded-full text-xs">{clientes.length}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contraseña</TableHead>
                    <TableHead>Seguro</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Registro</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">{cliente.id}</TableCell>
                      <TableCell>{cliente.nombre}</TableCell>
                      <TableCell>{cliente.email}</TableCell>
                      <TableCell className="min-w-[150px]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono">
                            {maskPassword(cliente.contrasena, passwordVisibility[`cliente-${cliente.id}`])}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePasswordVisibility(`cliente-${cliente.id}`)}
                            className="h-6 w-6 p-0"
                          >
                            {passwordVisibility[`cliente-${cliente.id}`] ? 
                              <EyeOff className="h-3 w-3" /> : 
                              <Eye className="h-3 w-3" />
                            }
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{cliente.seguro}</TableCell>
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
                      <TableCell>{cliente.fechaRegistro}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(cliente, 'cliente')}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            variant={cliente.estado === 'Activo' ? 'destructive' : 'default'} 
                            size="sm"
                            onClick={() => handleToggleStatus(cliente.id, 'cliente')}
                          >
                            {cliente.estado === 'Activo' ? (
                              <>
                                <PowerOff className="w-3 h-3 mr-1" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <Power className="w-3 h-3 mr-1" />
                                Activar
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GestionRoles;
