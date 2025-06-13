import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import ContratacionSeguros from "@/components/ContratacionSeguros";
import SolicitudesContacto from "@/components/SolicitudesContacto";
import GestionReembolsos from "@/components/GestionReembolsos";
import HistorialPagos from "@/components/HistorialPagos";
import GestionClientes from "@/components/GestionClientes";
import { 
  Shield, 
  Users, 
  FileText, 
  BarChart3, 
  TrendingUp,
  LogOut,
  ChevronRight,
  MessageCircle,
  DollarSign,
  CreditCard
} from "lucide-react";

type MenuOption = "dashboard" | "clientes" | "contratacion" | "solicitudes-contacto" | "reembolsos" | "pagos" | "reportes";

const AgenteDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<MenuOption>("dashboard");
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
    { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
    { id: "clientes" as const, label: "Clientes", icon: Users },
    { id: "contratacion" as const, label: "Nueva Venta", icon: FileText },
    { id: "solicitudes-contacto" as const, label: "Solicitudes de Contacto", icon: MessageCircle },
    { id: "reembolsos" as const, label: "Reembolsos", icon: DollarSign },
    { id: "pagos" as const, label: "Historial Pagos", icon: CreditCard },
    { id: "reportes" as const, label: "Reportes", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "clientes":
        return (
          <div className="p-6">
            <GestionClientes />
          </div>
        );
      case "contratacion":
        return <ContratacionSeguros />;
      case "solicitudes-contacto":
        return (
          <div className="p-6">
            <SolicitudesContacto />
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
      case "reportes":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-salus-blue">Mis Reportes</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Reportes de ventas del agente...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-salus-gray">Dashboard del Agente</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas Este Mes</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+20% vs mes anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mis Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">+3 nuevos este mes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Comisiones</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,340</div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Meta Mensual</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">80%</div>
                  <p className="text-xs text-muted-foreground">12/15 ventas</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas Recientes</CardTitle>
                  <CardDescription>Últimas pólizas vendidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Juan Pérez - Seguro de Vida</p>
                        <p className="text-sm text-gray-500">$420/mes</p>
                      </div>
                      <span className="text-xs text-gray-400">Hoy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">María García - Seguro de Salud</p>
                        <p className="text-sm text-gray-500">$69/mes</p>
                      </div>
                      <span className="text-xs text-gray-400">Ayer</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Carlos López - Seguro de Vida</p>
                        <p className="text-sm text-gray-500">$420/mes</p>
                      </div>
                      <span className="text-xs text-gray-400">Hace 2 días</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                  <CardDescription>Tareas frecuentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setActiveMenu("contratacion")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Nueva Venta
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setActiveMenu("clientes")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Ver Clientes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => setActiveMenu("reportes")}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Ver Reportes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-gray-200 p-2">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS" 
                className="h-8 w-auto"
              />
              <div>
                <h2 className="text-lg font-semibold text-salus-blue">SALUS</h2>
                <p className="text-xs text-gray-500">Panel Agente</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Ventas</SidebarGroupLabel>
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
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => setActiveMenu("reportes")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Reportes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
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
                  nombre: "Carlos",
                  apellido: "Agente", 
                  email: "agente@salus.com",
                  rol: "Agente de Ventas",
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

export default AgenteDashboard;
