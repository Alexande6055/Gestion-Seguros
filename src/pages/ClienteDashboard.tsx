
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
import FormularioReembolso from "@/components/FormularioReembolso";
import TablaPagos from "@/components/TablaPagos";
import {
  ClipboardList,
  Stethoscope,
  CreditCard,
  LogOut,
  ChevronRight,
  PencilLine
} from "lucide-react";
import { UsuarioLocal } from "@/Model/Usuario";
import FormularioFirmaElectronica from "@/components/FormularioFirmaElectronica";
import ContratosCliente from "@/components/ContratosCliente";

type MenuOption = "seguros" | "reembolsos" | "pagos" | "firmas";

const ClienteDashboard = () => {
  const usuario: UsuarioLocal = JSON.parse(localStorage.getItem("usuario"));

  const [activeMenu, setActiveMenu] = useState<MenuOption>("seguros");
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
    { id: "seguros" as const, label: "Mis Seguros", icon: ClipboardList },
    { id: "reembolsos" as const, label: "Solicitar Reembolso", icon: Stethoscope },
    { id: "pagos" as const, label: "Pagos y Vencimientos", icon: CreditCard },
    { id: "firmas" as const, label: "Firmar Documento", icon: PencilLine },

  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "reembolsos":
        return (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <FormularioReembolso />
            </div>
          </div>
        );
      case "pagos":
        return (
          <div className="p-6">
            <TablaPagos />
          </div>
        );
      case "firmas":
        return (
          <div className="p-6 max-w-2xl mx-auto">
            <FormularioFirmaElectronica />
          </div>
        );
      default:
        return <ContratosCliente />
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
                <p className="text-xs text-gray-500">Panel Cliente</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Mi Cuenta</SidebarGroupLabel>
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
                  nombre: usuario.nombre,
                  apellido: usuario.apellido,
                  email: usuario.correo,
                  rol: usuario.rol,
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

export default ClienteDashboard;
