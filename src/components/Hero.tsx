
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-salus-blue/5 rounded-full -translate-y-48 translate-x-48"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS" 
                className="h-8 w-auto"
              />
              <span className="text-salus-blue font-semibold">SALUS ASEGURADORA</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-salus-gray">
              Tu salud es nuestra 
              <span className="text-salus-blue block">fortaleza</span>
            </h1>
            
            <p className="text-salus-gray-light text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              Protege a tu familia con los mejores planes de seguro médico. 
              Cobertura completa, atención de calidad y tranquilidad garantizada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/planes">
                <Button className="bg-salus-blue hover:bg-salus-blue-dark text-white text-lg px-8 py-6 rounded-lg">
                  Explorar Planes
                </Button>
              </Link>
              <Link to="/asesores">
                <Button variant="outline" className="border-salus-blue text-salus-blue hover:bg-salus-blue hover:text-white text-lg px-8 py-6 rounded-lg">
                  Hablar con Asesor
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-salus-blue mb-1">50K+</div>
                <div className="text-sm text-salus-gray-light">Clientes Protegidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-salus-blue mb-1">15+</div>
                <div className="text-sm text-salus-gray-light">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-salus-blue mb-1">98%</div>
                <div className="text-sm text-salus-gray-light">Satisfacción</div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Familia protegida con SALUS"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              
              {/* Floating cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <Shield className="h-8 w-8 text-salus-blue mb-2" />
                <div className="text-sm font-semibold text-salus-gray">Protección Total</div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <div className="text-sm font-semibold text-salus-gray">Cuidado Familiar</div>
              </div>
              
              <div className="absolute top-1/2 -right-6 bg-salus-blue text-white p-4 rounded-xl shadow-lg">
                <Users className="h-8 w-8 mb-2" />
                <div className="text-sm font-semibold">24/7 Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
