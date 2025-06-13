import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";

// ✅ Tipo personalizado para la respuesta del backend
type LoginResponse = {
  usuario: {
    tipo: number;
  };
  token: string;
  mensaje: string;
};

export function logout(navigate: (path: string) => void) {
  localStorage.removeItem("token");
  navigate("/login");
}

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Cambia los nombres de los campos para coincidir con el backend
      const response = await axios.post<LoginResponse>("http://localhost:8000/login", {
        correo: formData.email,
        password: formData.password,
      });

      const { usuario, token, mensaje } = response.data;

      // Guarda el token para futuras peticiones protegidas
      localStorage.setItem("token", token);

      alert(mensaje);

      // Redirige según el tipo de usuario
      if (usuario.tipo === 0) {
        navigate("/admin");
      } else if (usuario.tipo === 1) {
        navigate("/cliente");
      } else if (usuario.tipo === 2) {
        navigate("/agente");
      } else {
        alert("Tipo de usuario no reconocido");
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      alert(
        error.response?.data?.error ||
        "Credenciales incorrectas o error de conexión"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo y encabezado */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/84d5c2fc-1a5b-4438-b68e-c9b2f0c8c75b.png" 
                alt="SALUS ASEGURADORA" 
                className="h-16 w-auto"
              />
              <Shield className="h-8 w-8 text-salus-blue" />
            </div>
            <h1 className="text-2xl font-bold text-salus-gray mb-2">SALUS ASEGURADORA</h1>
            <p className="text-salus-gray-light">Inicia sesión en tu cuenta</p>
          </div>

          {/* Formulario de login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-salus-gray">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-salus-blue focus:border-salus-blue"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-salus-gray">Contraseña</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pr-10 focus:ring-salus-blue focus:border-salus-blue"
                  placeholder="Tu contraseña"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-salus-blue focus:ring-salus-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-salus-gray">
                  Recordarme
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-salus-blue hover:bg-salus-blue-dark text-white py-3 rounded-lg font-semibold"
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-salus-gray-light hover:text-salus-blue">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
