import { useState } from "react";

interface Seguro {
  nombre: string;
  tipo: string;
  prima: string;
}

const GestionSeguros = () => {
  const [seguros, setSeguros] = useState<Seguro[]>([]);
  const [filtro, setFiltro] = useState("");

  const agregarSeguro = () => {
    const nombre = prompt("Nombre del seguro:");
    const tipo = prompt("Tipo de seguro:");
    const prima = prompt("Prima:");
    if (nombre && tipo && prima) {
      const nuevoSeguro: Seguro = { nombre, tipo, prima };
      setSeguros([...seguros, nuevoSeguro]);
    }
  };

  const editarSeguro = (index: number) => {
    const seguro = seguros[index];
    const nuevoNombre = prompt("Nuevo nombre:", seguro.nombre);
    const nuevoTipo = prompt("Nuevo tipo:", seguro.tipo);
    const nuevaPrima = prompt("Nueva prima:", seguro.prima);

    if (nuevoNombre && nuevoTipo && nuevaPrima) {
      const nuevosSeguros = [...seguros];
      nuevosSeguros[index] = {
        nombre: nuevoNombre,
        tipo: nuevoTipo,
        prima: nuevaPrima,
      };
      setSeguros(nuevosSeguros);
    }
  };

  const eliminarSeguro = (index: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este seguro?")) {
      const nuevosSeguros = [...seguros];
      nuevosSeguros.splice(index, 1);
      setSeguros(nuevosSeguros);
    }
  };

  const segurosFiltrados = seguros.filter((seguro) =>
    seguro.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-salus-blue">Gestión de Seguros</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar seguro"
          className="border border-gray-300 p-2 flex-1 rounded"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={agregarSeguro}
        >
          Agregar seguro
        </button>
      </div>

      <table className="w-full border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Prima</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {segurosFiltrados.map((seguro, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 border">{seguro.nombre}</td>
              <td className="p-2 border">{seguro.tipo}</td>
              <td className="p-2 border">{seguro.prima}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => editarSeguro(index)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => eliminarSeguro(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {segurosFiltrados.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-gray-500">
                No hay seguros registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GestionSeguros;
