
import { Shield, Heart, Clock, Users, Activity } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-insurance-purple" />,
      title: "Cobertura Completa",
      description: "Protección médica integral para ti y tu familia en todo momento",
    },
    {
      icon: <Heart className="h-12 w-12 text-insurance-purple" />,
      title: "Atención Personalizada",
      description: "Te acompañamos en cada paso con nuestro equipo de profesionales",
    },
    {
      icon: <Clock className="h-12 w-12 text-insurance-purple" />,
      title: "Atención 24/7",
      description: "Disponibles para ti las 24 horas del día, los 7 días de la semana",
    },
    {
      icon: <Users className="h-12 w-12 text-insurance-purple" />,
      title: "Red de Médicos",
      description: "Accede a los mejores especialistas y centros médicos del país",
    },
    {
      icon: <Activity className="h-12 w-12 text-insurance-purple" />,
      title: "Chequeos Preventivos",
      description: "Exámenes regulares para mantener tu salud en óptimas condiciones",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Por qué elegirnos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Nuestros planes de salud están diseñados para brindarte la mejor atención cuando más lo necesitas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-insurance-purple/30 flex flex-col items-center text-center"
            >
              <div className="bg-insurance-blue/30 p-4 rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
