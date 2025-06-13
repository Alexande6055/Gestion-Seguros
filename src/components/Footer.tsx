
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Salud Para Ti</h3>
            <p className="text-gray-300 mb-6">
              Brindamos protección médica confiable para ti y tu familia con los mejores planes de seguros de salud.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/planes" className="text-gray-300 hover:text-white">
                  Nuestros Planes
                </Link>
              </li>
              <li>
                <Link to="/coberturas" className="text-gray-300 hover:text-white">
                  Coberturas
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-300 hover:text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/servicios/emergencias" className="text-gray-300 hover:text-white">
                  Atención de Emergencias
                </Link>
              </li>
              <li>
                <Link to="/servicios/consultas" className="text-gray-300 hover:text-white">
                  Consultas Médicas
                </Link>
              </li>
              <li>
                <Link to="/servicios/hospitalizacion" className="text-gray-300 hover:text-white">
                  Hospitalización
                </Link>
              </li>
              <li>
                <Link to="/servicios/medicamentos" className="text-gray-300 hover:text-white">
                  Medicamentos
                </Link>
              </li>
              <li>
                <Link to="/servicios/especialistas" className="text-gray-300 hover:text-white">
                  Especialistas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-6 w-6 mr-3 text-insurance-purple" />
                <span className="text-gray-300">info@saludparati.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-6 w-6 mr-3 text-insurance-purple" />
                <span className="text-gray-300">+1 (800) 123-4567</span>
              </li>
              <li className="text-gray-300">
                Av. Principal #123<br />
                Ambato, Tungurahua<br />
                Ecuador
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} Salud Para Ti. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="/terminos" className="text-gray-400 hover:text-white">
                Términos y Condiciones
              </Link>
              <Link to="/privacidad" className="text-gray-400 hover:text-white">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
