
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CallToAction";
import { CheckCircle, Hospital, Thermometer, Briefcase, Activity } from "lucide-react";

const CoberturasPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-16 bg-insurance-blue">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Coberturas</h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
              Conoce todos los beneficios y coberturas que ofrecen nuestros planes de seguro
            </p>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Servicios médicos cubiertos</h2>
                <p className="text-gray-600 mb-8">
                  Nuestros planes ofrecen una amplia cobertura de servicios médicos para asegurar tu bienestar y el de tu familia. Te protegemos con la mejor atención médica cuando más lo necesitas.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">Consultas médicas</h4>
                      <p className="text-gray-600">Atención con médicos generales y especialistas en nuestra red médica.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">Hospitalización</h4>
                      <p className="text-gray-600">Cobertura en los mejores hospitales y clínicas del país.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">Estudios y diagnósticos</h4>
                      <p className="text-gray-600">Acceso a laboratorios, radiografías y estudios especializados.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">Medicamentos</h4>
                      <p className="text-gray-600">Descuentos y coberturas en una amplia gama de medicamentos.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">Emergencias</h4>
                      <p className="text-gray-600">Atención inmediata en casos de urgencias médicas.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1631815588090-602c6c8cce35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Servicios médicos cubiertos" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Beneficios adicionales</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Hospital className="h-12 w-12 text-insurance-purple mb-4" />
                <h3 className="text-xl font-semibold mb-3">Red Hospitalaria</h3>
                <p className="text-gray-600">Accede a los mejores hospitales y clínicas con instalaciones modernas y tecnología avanzada.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Thermometer className="h-12 w-12 text-insurance-purple mb-4" />
                <h3 className="text-xl font-semibold mb-3">Chequeos Preventivos</h3>
                <p className="text-gray-600">Programas de prevención y chequeos médicos regulares para mantener tu salud.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Briefcase className="h-12 w-12 text-insurance-purple mb-4" />
                <h3 className="text-xl font-semibold mb-3">Especialistas</h3>
                <p className="text-gray-600">Acceso a médicos especialistas en todas las áreas para atención completa.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Activity className="h-12 w-12 text-insurance-purple mb-4" />
                <h3 className="text-xl font-semibold mb-3">Seguimiento</h3>
                <p className="text-gray-600">Monitoreo continuo de tu salud y planes de tratamiento personalizados.</p>
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default CoberturasPage;
