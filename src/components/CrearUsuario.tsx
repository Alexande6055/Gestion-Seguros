import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CrearUsuario = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    username: '',
    password: '',
    tipo: '',
    cedula: '',
    telefono: ''
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTipoChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipo: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.username || !formData.password || !formData.tipo || !formData.cedula || !formData.telefono) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Validar teléfono
    if (formData.telefono.length !== 10 || !/^\d+$/.test(formData.telefono)) {
      toast({
        title: "Error", 
        description: "El teléfono debe tener exactamente 10 dígitos",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post("http://localhost:8000/usuario", formData);
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente",
      });
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        username: '',
        password: '',
        tipo: '',
        cedula: '',
        telefono: ''
      });
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "No se pudo crear el usuario",
        variant: "destructive",
      });
    }
  };

  const getRoleName = (tipo: string) => {
    switch(tipo) {
      case '0': return 'Administrador';
      case '1': return 'Cliente'; 
      case '2': return 'Agente';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-salus-blue hover:bg-salus-blue/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Crear Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Complete la información para crear un nuevo usuario en el sistema
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input
              id="correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="tipo">Rol</Label>
            <Select value={formData.tipo} onValueChange={handleTipoChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Administrador</SelectItem>
                <SelectItem value="1">Cliente</SelectItem>
                <SelectItem value="2">Agente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cedula">Cédula</Label>
            <Input
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="10 dígitos"
              maxLength={10}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-salus-blue hover:bg-salus-blue/90">
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CrearUsuario;
