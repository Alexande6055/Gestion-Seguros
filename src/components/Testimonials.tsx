
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Cliente desde 2020",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    content: "El servicio ha sido excepcional. Cuando mi hijo necesitó atención urgente, el seguro respondió inmediatamente y cubrió todos los gastos. La tranquilidad que me da SALUS no tiene precio.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Cliente desde 2018",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Después de comparar varias aseguradoras, elegí SALUS por su cobertura completa y precio justo. Cuando necesité una operación, todo el proceso fue sin complicaciones y con excelente atención.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Suárez",
    role: "Cliente desde 2021",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "La atención al cliente es inigualable. Cada vez que he tenido una duda o necesitado ayuda con trámites, el equipo ha estado ahí para ayudarme rápidamente. ¡Muy recomendado!",
    rating: 4,
  },
  {
    id: 4,
    name: "Roberto Méndez",
    role: "Cliente desde 2019",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    content: "Como dueño de un negocio, busqué una aseguradora que ofreciera buen servicio para mis empleados. SALUS superó mis expectativas con planes flexibles y excelente servicio.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Miles de familias confían en nosotros para proteger su salud
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-insurance-blue to-blue-100 rounded-2xl shadow-xl p-8 md:p-12 relative">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-center">{currentTestimonial.name}</h4>
                <p className="text-gray-600 text-center">{currentTestimonial.role}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <svg
                  className="h-10 w-10 text-insurance-purple opacity-20 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-800 text-lg italic mb-4">
                  {currentTestimonial.content}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white shadow-md hover:bg-insurance-purple hover:text-white transition-colors"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-white shadow-md hover:bg-insurance-purple hover:text-white transition-colors"
                aria-label="Testimonio siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
