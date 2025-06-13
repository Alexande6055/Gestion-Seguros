
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Plans from "@/components/Plans";
import CallToAction from "@/components/CallToAction";

const PlanesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS" 
                className="h-12 w-auto"
              />
              <span className="text-salus-blue font-semibold text-lg">SALUS ASEGURADORA</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-salus-gray">
              Nuestros Planes de Protección
            </h1>
            <p className="text-salus-gray-light text-lg md:text-xl max-w-2xl mx-auto">
              Descubre el plan de salud ideal para ti y tu familia con la mejor cobertura médica del mercado
            </p>
          </div>
        </div>
        <Plans />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default PlanesPage;
