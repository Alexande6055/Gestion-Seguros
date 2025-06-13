
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Plans = () => {
  const plans = [
    {
      name: "Seguro de Vida",
      price: "$420",
      period: "mensual",
      description: "Protección integral para tu familia",
      features: [
        "Cobertura por fallecimiento",
        "Invalidez total y permanente",
        "Enfermedades graves",
        "Asistencia funeraria",
        "Beneficiarios múltiples",
        "Sin exámenes médicos",
      ],
      highlighted: false,
    },
    {
      name: "Seguro de Salud",
      price: "$69",
      period: "mensual",
      description: "Atención médica completa para ti",
      features: [
        "Consultas médicas ilimitadas",
        "Emergencias médicas",
        "Medicamentos incluidos",
        "Laboratorios y diagnósticos",
        "Hospitalización completa",
        "Telemedicina 24/7",
      ],
      highlighted: true,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
              alt="SALUS" 
              className="h-8 w-auto"
            />
            <span className="text-salus-blue font-semibold">PLANES DE PROTECCIÓN</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-salus-gray">
            Nuestros Seguros Disponibles
          </h2>
          <p className="text-salus-gray-light max-w-2xl mx-auto text-lg">
            Elige el seguro que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.highlighted
                  ? "border-2 border-salus-blue relative bg-white scale-105"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-salus-gray">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-salus-blue">{plan.price}</span>
                  <span className="text-salus-gray-light">/{plan.period}</span>
                </div>
                <p className="text-salus-gray-light mb-6">{plan.description}</p>
                
                <Button
                  className={`w-full mb-8 py-6 rounded-lg font-semibold ${
                    plan.highlighted
                      ? "bg-salus-blue hover:bg-salus-blue-dark text-white"
                      : "bg-salus-gray hover:bg-salus-gray/90 text-white"
                  }`}
                >
                  Contratar Plan
                </Button>
                
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-salus-gray mb-3">
                    Incluye:
                  </div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-salus-gray-light text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
