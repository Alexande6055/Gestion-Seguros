
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Heart,
  Shield
} from "lucide-react";

interface Seguro {
  id: string;
  tipo: 'Vida' | 'Salud';
  nombre: string;
  fechaContrato: string;
  estado: 'activo' | 'pendiente' | 'vencido';
  cobertura: string;
}

const segurosMockData: Seguro[] = [
  {
    id: "SEG001",
    tipo: 'Vida',
    nombre: "Seguro de Vida Premium",
    fechaContrato: "2024-01-10",
    estado: 'activo',
    cobertura: "$100,000"
  },
  {
    id: "SEG002", 
    tipo: 'Salud',
    nombre: "Seguro de Salud Familiar",
    fechaContrato: "2024-01-15",
    estado: 'activo',
    cobertura: "Cobertura completa"
  }
];

type MenuOption = "seguros" | "reembolsos" | "pagos";

const ClienteDashboard = () => {
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
      default:
        return (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mis Seguros Contratados</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {segurosMockData.map((seguro) => (
                  <Card key={seguro.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {seguro.tipo === 'Vida' ? (
                            <Heart className="h-5 w-5 text-red-500" />
                          ) : (
                            <Shield className="h-5 w-5 text-blue-500" />
                          )}
                          Seguro de {seguro.tipo}
                        </CardTitle>
                        <Badge 
                          variant={seguro.estado === 'activo' ? 'default' : 'destructive'}
                        >
                          {seguro.estado}
                        </Badge>
                      </div>
                      <CardDescription>{seguro.nombre}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID del Seguro:</span>
                          <span className="font-medium">{seguro.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fecha de Contrato:</span>
                          <span className="font-medium">{seguro.fechaContrato}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cobertura:</span>
                          <span className="font-medium">{seguro.cobertura}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
                  nombre: "Juan",
                  apellido: "Pérez", 
                  email: "juan.perez@email.com",
                  rol: "Cliente",
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
