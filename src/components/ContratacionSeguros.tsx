// Importaciones necesarias al inicio del archivo
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import { ListaSeguros } from "@/Model/Seguro";
import SegurosApi from "@/service/Seguros";
import { generarCaratulaPDF } from "./PDF";

type FormData = {
  nombre: string;
  apellido: string;
  cedula: string;
  correo: string;
  telefono: string;
  direccion: string;
  ciudad?: string;
  fechaFinalizacion?: string;
  tipoSeguro: string;
  coberturaAdicional: string;
  observaciones: string;
};

type Beneficiario = {
  nombre: string;
  apellido: string;
  cedula: string;
  fecha_nacimiento: string;
  parentesco: string;
  telefono: string;
};

const ContratacionSeguros = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    fechaFinalizacion: '',
    tipoSeguro: '',
    coberturaAdicional: '',
    observaciones: '',
  });

  const [beneficiario, setBeneficiario] = useState<Beneficiario>({
    nombre: '',
    apellido: '',
    cedula: '',
    fecha_nacimiento: '',
    parentesco: '',
    telefono: '',
  });

  const [documentosPersonales, setDocumentosPersonales] = useState<File[]>([]);
  const [tipoSeguro, setTipoSeguro] = useState<ListaSeguros[]>([]);
  useEffect(() => {
    const fetchSeguros = async () => {
      const response = await SegurosApi.obtenerListaSeguros();
      setTipoSeguro(response);
    };
    fetchSeguros();
  }, []);

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'telefono') {
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBeneficiarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'telefono' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setBeneficiario(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = Array.from(e.target.files || []);
    const archivosValidos = archivos.filter(archivo => archivo.type === "application/pdf");
    if (archivosValidos.length !== archivos.length) {
      toast({
        title: "Archivo inválido",
        description: "Algunos archivos no son PDF ",
        variant: "destructive",
      });
    }

    setDocumentosPersonales(prev => [...prev, ...archivosValidos]);


  };


  const handleTipoSeguroChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipoSeguro: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🔥 PREVIENE EL REFRESCO DE LA PÁGINA

    if (!formData.nombre || !formData.apellido || !formData.cedula || !formData.correo || !formData.telefono || !formData.tipoSeguro) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      });
      return;
    }

    if (formData.tipoSeguro === 'Vida') {
      const camposBeneficiario = Object.values(beneficiario).some(c => !c);
      if (camposBeneficiario) {
        toast({
          title: "Datos incompletos",
          description: "Debe completar todos los campos del beneficiario",
          variant: "destructive",
        });
        return;
      }
    }

    const seguroSeleccionado = tipoSeguro.find(s => s.nombre === formData.tipoSeguro);
    const idSeguro = seguroSeleccionado ? seguroSeleccionado.id_seguro : null;
    if (idSeguro) {
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const documentos = await Promise.all(
        documentosPersonales.map(file => toBase64(file))
      );
      const pdfBlob = generarCaratulaPDF();
      const pdfFile = new File([pdfBlob], "Caratula_Poliza_Seguro.pdf", { type: "application/pdf" });
      const data = await SegurosApi.crearContratoSeguro({
        id_usuario: {
          apellido: formData.apellido,
          cedula: formData.cedula,
          correo: formData.correo,
          nombre: formData.nombre,
          password: formData.cedula,
          telefono: formData.telefono,
          tipo: "1",
          username: formData.nombre + " " + formData.apellido
        },
        id_seguro: seguroSeleccionado ? seguroSeleccionado.id_seguro : null,
        fechaContrato: (new Date()).toISOString(),
        fechaFin: formData.fechaFinalizacion,
        documento: documentos
      }, pdfFile);
      console.log(data)
      toast({
        title: "Contratación exitosa",
        description: "La contratación del seguro se ha registrado correctamente",
      });


      setFormData({
        nombre: '',
        apellido: '',
        cedula: '',
        correo: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        fechaFinalizacion: '',
        tipoSeguro: '',
        coberturaAdicional: '',
        observaciones: '',
      });

      setBeneficiario({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha_nacimiento: '',
        parentesco: '',
        telefono: '',
      });

      setDocumentosPersonales([]); // Limpiar archivos adjuntos
    }

  };


  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contratación de Seguro
          </CardTitle>
          <CardDescription>
            Ingrese la información del nuevo cliente y los detalles del seguro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Formulario principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombres</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="apellido">Apellidos</Label>
                <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cedula">Cédula</Label>
                <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="correo">Email</Label>
                <Input id="correo" name="correo" type="email" value={formData.correo} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required maxLength={10} />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="fechaFinalizacion">Fecha de Finalizacion</Label>
                <Input id="fechaFinalizacion" name="fechaFinalizacion" type="date" value={formData.fechaFinalizacion} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <Label htmlFor="tipoSeguro">Tipo de Seguro</Label>
              <Select value={formData.tipoSeguro} onValueChange={handleTipoSeguroChange}>
                <SelectTrigger><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
                <SelectContent>
                  {tipoSeguro.length > 0 &&
                    tipoSeguro.map((seguro) => (
                      <SelectItem key={seguro.id_seguro} value={seguro.nombre}>
                        {seguro.nombre}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Si el seguro es de vida, mostrar campos del beneficiario */}
            {formData.tipoSeguro === 'Vida' && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Información del Beneficiario</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre</Label>
                    <Input name="nombre" value={beneficiario.nombre} onChange={handleBeneficiarioChange} />
                  </div>
                  <div>
                    <Label>Apellido</Label>
                    <Input name="apellido" value={beneficiario.apellido} onChange={handleBeneficiarioChange} />
                  </div>
                  <div>
                    <Label>Cédula</Label>
                    <Input name="cedula" value={beneficiario.cedula} onChange={handleBeneficiarioChange} />
                  </div>
                  <div>
                    <Label>Fecha de Nacimiento</Label>
                    <Input name="fecha_nacimiento" type="date" value={beneficiario.fecha_nacimiento} onChange={handleBeneficiarioChange} />
                  </div>
                  <div>
                    <Label>Parentesco</Label>
                    <Input name="parentesco" value={beneficiario.parentesco} onChange={handleBeneficiarioChange} />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input name="telefono" value={beneficiario.telefono} onChange={handleBeneficiarioChange} maxLength={10} />
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label>Documentos de Información Personal (PDF)</Label>
              <Input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleDocumentoChange}
              />
              {documentosPersonales.length > 0 && (
                <ul className="list-disc list-inside text-sm text-green-700 mt-1">
                  {documentosPersonales.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}

            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-salus-blue hover:bg-salus-blue/90">Contratar Seguro</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContratacionSeguros;
