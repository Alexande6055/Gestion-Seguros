
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Shield, Heart } from "lucide-react";

const NosotrosPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-16 bg-insurance-blue">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
              Conoce más sobre Salud Para Ti y nuestra misión de proteger la salud de miles de familias
            </p>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1578496479963-8c71cac903d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Equipo Salud Para Ti" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
                <p className="text-gray-600 mb-4">
                  Fundada en 2010, Salus nació con la misión de revolucionar la industria de seguros de salud en México, ofreciendo planes accesibles y con cobertura completa para todas las familias mexicanas.
                </p>
                <p className="text-gray-600 mb-4">
                  Desde nuestros inicios, nos hemos comprometido a proporcionar servicios de calidad, atención personalizada y una red médica de excelencia para cuidar de la salud de nuestros asegurados.
                </p>
                <p className="text-gray-600">
                  Hoy, más de 100,000 personas confían en nosotros para proteger su salud y la de sus familias. Nuestro compromiso sigue siendo el mismo: brindar tranquilidad y seguridad médica a todos nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Nuestros Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Users className="h-16 w-16 text-insurance-purple mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Compromiso</h3>
                <p className="text-gray-600">
                  Estamos comprometidos con el bienestar de nuestros asegurados, ofreciendo el mejor servicio y atención en todo momento.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Shield className="h-16 w-16 text-insurance-purple mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Confiabilidad</h3>
                <p className="text-gray-600">
                  Brindamos seguridad y tranquilidad a nuestros clientes, cumpliendo siempre con nuestras promesas y compromisos.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Heart className="h-16 w-16 text-insurance-purple mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Empatía</h3>
                <p className="text-gray-600">
                  Entendemos las necesidades de nuestros clientes y trabajamos para ofrecerles soluciones personalizadas y humanas.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
              <p className="text-gray-600 mb-12 text-lg">
                Brindar protección médica accesible y de calidad a todas las familias mexicanas, proporcionando tranquilidad y seguridad en cada etapa de sus vidas.
              </p>
              
              <h2 className="text-3xl font-bold mb-6">Nuestra Visión</h2>
              <p className="text-gray-600 text-lg">
                Ser la compañía de seguros médicos más confiable y centrada en el cliente, reconocida por nuestra excelencia en servicio y compromiso con el bienestar de nuestros asegurados.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NosotrosPage;
