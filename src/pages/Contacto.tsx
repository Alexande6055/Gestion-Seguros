
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactoPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Un asesor se comunicará contigo pronto.",
    });
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-16 bg-insurance-blue">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Comunícate con nosotros para resolver todas tus dudas.
            </p>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Envíanos un mensaje</h2>
                <p className="text-gray-600 mb-8">
                  Completa el formulario y uno de nuestros asesores se pondrá en contacto contigo lo antes posible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insurance-purple"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insurance-purple"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insurance-purple"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-insurance-purple"
                      placeholder="¿Cómo podemos ayudarte?"
                    />
                  </div>
                  
                  <Button type="submit" className="bg-insurance-purple hover:bg-purple-700 text-white w-full py-6">
                    Enviar Mensaje
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Información de Contacto</h2>
                <p className="text-gray-600 mb-8">
                  También puedes contactarnos directamente a través de los siguientes medios:
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-insurance-purple mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Correo Electrónico</h4>
                      <p className="text-gray-600">info@saludparati.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-insurance-purple mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Teléfono</h4>
                      <p className="text-gray-600">+1 (800) 123-4567</p>
                      <p className="text-gray-600">Lunes a Viernes, 9am a 6pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-insurance-purple mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Dirección</h4>
                      <p className="text-gray-600">
                        Av. Principal #123<br />
                        Ciudad de México, CP 12345<br />
                        México
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-insurance-purple mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Horario de Atención</h4>
                      <p className="text-gray-600">
                        Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                        Sábados: 10:00 AM - 2:00 PM<br />
                        Domingos y Festivos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 bg-insurance-blue p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-4">Atención de Emergencias</h4>
                  <p className="text-gray-700 mb-2">
                    Para emergencias médicas, comunícate a nuestra línea de atención 24/7:
                  </p>
                  <p className="text-xl font-bold text-insurance-purple">
                    +1 (800) 999-8888
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactoPage;
