
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { SolicitudesProvider } from "@/context/SolicitudesContext";
import Index from "./pages/Index";
import Planes from "./pages/Planes";
import Nosotros from "./pages/Nosotros";
import Asesores from "./pages/Asesores";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AgenteDashboard from "./pages/AgenteDashboard";
import ClienteDashboard from "./pages/ClienteDashboard";
import NotFound from "./pages/NotFound";
import Coberturas from "./pages/Coberturas";
import "./App.css";

function App() {
  return (
    <SolicitudesProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/asesores" element={<Asesores />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/coberturas" element={<Coberturas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/agente" element={<AgenteDashboard />} />
            <Route path="/cliente" element={<ClienteDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </SolicitudesProvider>
  );
}

export default App;
