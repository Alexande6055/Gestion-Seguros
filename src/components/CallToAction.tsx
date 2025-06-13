
import { Shield } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-salus-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 -translate-x-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 translate-x-48"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <img 
              src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
              alt="SALUS" 
              className="h-12 w-auto filter brightness-0 invert"
            />
            <Shield className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Protege a los que más amas hoy mismo
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            No esperes a que sea demasiado tarde. Con SALUS ASEGURADORA, 
            tu familia tendrá la mejor protección las 24 horas del día.
          </p>
          
          <div className="text-center">
            <p className="text-white/80 text-lg">
              Inicia sesión para contratar tu seguro ideal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
