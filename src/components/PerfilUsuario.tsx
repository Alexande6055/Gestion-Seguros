
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  ultimoAcceso: string;
}

interface PerfilUsuarioProps {
  usuario?: Usuario;
  onCerrarSesion: () => void;
}

const PerfilUsuario = ({ 
  usuario = {
    nombre: "Admin",
    apellido: "Sistema",
    email: "admin@salus.com",
    rol: "Administrador",
    ultimoAcceso: "2024-01-15"
  },
  onCerrarSesion 
}: PerfilUsuarioProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const iniciales = `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-salus-blue text-white text-sm">
              {iniciales}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900">
              {usuario.nombre} {usuario.apellido}
            </span>
            <span className="text-xs text-gray-500">{usuario.rol}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-900">
              {usuario.nombre} {usuario.apellido}
            </p>
            <p className="text-xs text-gray-500">{usuario.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <div className="text-xs text-gray-500">Rol: {usuario.rol}</div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PerfilUsuario;
