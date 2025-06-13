import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Planes", path: "/planes" },
    { name: "Coberturas", path: "/coberturas" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Asesores", path: "/asesores" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png"
                alt="Salus Logo"
              />
              <span className="ml-2 text-xl font-bold text-salus-blue">SALUS</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-salus-blue bg-salus-blue/10 border-b-2 border-salus-blue"
                    : "text-gray-700 hover:text-salus-blue hover:bg-salus-blue/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-salus-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-salus-blue/90 transition-colors duration-200"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-salus-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-salus-blue"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-salus-blue bg-salus-blue/10"
                    : "text-gray-700 hover:text-salus-blue hover:bg-salus-blue/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium bg-salus-blue text-white hover:bg-salus-blue/90 transition-colors duration-200"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
