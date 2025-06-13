import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import PerfilUsuario from "@/components/PerfilUsuario";
import GestionClientes from "@/components/GestionClientes";
import GestionRoles from "@/components/GestionRoles";
import CrearUsuario from "@/components/CrearUsuario";
import GestionReembolsos from "@/components/GestionReembolsos";
import HistorialPagos from "@/components/HistorialPagos";
import ReportesAdmin from "@/components/ReportesAdmin";
import SolicitudesContacto from "@/components/SolicitudesContacto";
import {
  Users,
  Shield,
  LogOut,
  ChevronRight,
  FileText,
  CreditCard,
  MessageCircle,
  BarChart3
} from "lucide-react";

type MenuOption = "clientes" | "roles" | "crear-usuario" | "reembolsos" | "pagos" | "solicitudes" | "reportes";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<MenuOption>("clientes");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { id: "clientes" as const, label: "Clientes", icon: Users },
    { id: "roles" as const, label: "Gestión de Roles", icon: Shield },
    { id: "crear-usuario" as const, label: "Crear Usuario", icon: Users },
    { id: "reembolsos" as const, label: "Reembolsos", icon: FileText },
    { id: "pagos" as const, label: "Historial Pagos", icon: CreditCard },
    { id: "solicitudes" as const, label: "Solicitudes Contacto", icon: MessageCircle },
    { id: "reportes" as const, label: "Reportes", icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "roles":
        return (
          <div className="p-6">
            <GestionRoles />
          </div>
        );
      case "crear-usuario":
        return (
          <div className="p-6">
            <div className="flex justify-center">
              <CrearUsuario />
            </div>
          </div>
        );
      case "reembolsos":
        return (
          <div className="p-6">
            <GestionReembolsos />
          </div>
        );
      case "pagos":
        return (
          <div className="p-6">
            <HistorialPagos />
          </div>
        );
      case "solicitudes":
        return (
          <div className="p-6">
            <SolicitudesContacto />
          </div>
        );
      case "reportes":
        return (
          <div className="p-6">
            <ReportesAdmin />
          </div>
        );
      default:
        return (
          <div className="p-6">
            <GestionClientes />
          </div>
        );
    }
  };

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS" 
                className="h-8 w-auto"
              />
              <div>
                <h2 className="text-lg font-semibold text-salus-blue">SALUS</h2>
                <p className="text-xs text-gray-500">Panel Admin</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Administración</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeMenu === item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className="w-full justify-start"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {activeMenu === item.id && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-gray-200 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-gray-900">
                  {menuItems.find(item => item.id === activeMenu)?.label || "Dashboard"}
                </h1>
              </div>
              
              <PerfilUsuario 
                usuario={{
                  nombre: "Admin",
                  apellido: "Sistema", 
                  email: "admin@salus.com",
                  rol: "Administrador",
                  ultimoAcceso: "2024-01-15"
                }}
                onCerrarSesion={handleLogout}
              />
            </header>
            
            <main className="flex-1 overflow-auto">
              {renderContent()}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
