// Importaciones necesarias al inicio del archivo
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type FormData = {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad?: string;
  fechaContratacion?: string;
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
    nombres: '',
    apellidos: '',
    cedula: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    fechaContratacion: '',
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
  const archivosValidos = archivos.filter(archivo =>
    ["application/pdf", "image/jpeg", "image/png"].includes(archivo.type)
  );

  if (archivosValidos.length !== archivos.length) {
    toast({
      title: "Archivo inválido",
      description: "Algunos archivos no son PDF o imágenes JPG/PNG",
      variant: "destructive",
    });
  }

  setDocumentosPersonales(prev => [...prev, ...archivosValidos]);
  };


  const handleTipoSeguroChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipoSeguro: value }));
  };

  const handleCoberturaAdicionalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, coberturaAdicional: e.target.value }));
  };

  const handleObservacionesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, observaciones: e.target.value }));
  };

  const handleSubmit = (e: React.Event) => {
    e.preventDefault();

    if (!formData.nombres || !formData.apellidos || !formData.cedula || !formData.email || !formData.telefono || !formData.tipoSeguro) {
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

    toast({
      title: "Contratación exitosa",
      description: "La contratación del seguro se ha registrado correctamente",
    });

    console.log("Datos enviados:", formData, beneficiario, documentosPersonales);

    setFormData({
      nombres: '',
      apellidos: '',
      cedula: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      fechaContratacion: '',
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
  };

  const generarContratoPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Contrato de Seguro", 105, 15, { align: "center" });

    const body: any[][] = [
      ["Nombres", formData.nombres],
      ["Apellidos", formData.apellidos],
      ["Cédula", formData.cedula],
      ["Email", formData.email],
      ["Teléfono", formData.telefono],
      ["Dirección", formData.direccion],
      ["Ciudad", formData.ciudad || "N/A"],
      ["Fecha de Contratación", formData.fechaContratacion || "N/A"],
      ["Tipo de Seguro", formData.tipoSeguro],
      ["Cobertura Adicional", formData.coberturaAdicional],
      ["Observaciones", formData.observaciones],
      ["Documentos Personales", documentosPersonales.length > 0 ? `${documentosPersonales.length} archivos adjuntos` : "No adjuntos"],
    ];

    if (formData.tipoSeguro === "Vida") {
      body.push(
        ["--- Beneficiario ---", ""],
        ["Nombre", beneficiario.nombre],
        ["Apellido", beneficiario.apellido],
        ["Cédula", beneficiario.cedula],
        ["Fecha de Nacimiento", beneficiario.fecha_nacimiento],
        ["Parentesco", beneficiario.parentesco],
        ["Teléfono", beneficiario.telefono]
      );
    }

    autoTable(doc, {
      startY: 25,
      head: [["Campo", "Valor"]],
      body,
    });

    doc.save(`Contrato_${formData.apellidos}_${formData.cedula}.pdf`);
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
                <Label htmlFor="nombres">Nombres</Label>
                <Input id="nombres" name="nombres" value={formData.nombres} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cedula">Cédula</Label>
                <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
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
                <Label htmlFor="fechaContratacion">Fecha de Contratación</Label>
                <Input id="fechaContratacion" name="fechaContratacion" type="date" value={formData.fechaContratacion} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <Label htmlFor="tipoSeguro">Tipo de Seguro</Label>
              <Select value={formData.tipoSeguro} onValueChange={handleTipoSeguroChange}>
                <SelectTrigger><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vida">Vida</SelectItem>
                  <SelectItem value="Salud">Salud</SelectItem>
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
              <Label htmlFor="coberturaAdicional">Cobertura Adicional</Label>
              <Textarea id="coberturaAdicional" name="coberturaAdicional" value={formData.coberturaAdicional} onChange={handleCoberturaAdicionalChange} />
            </div>

            <div>
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleObservacionesChange} />
            </div>

            <div>
              <Label>Documentos de Información Personal (PDF/JPG/PNG)</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
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
              <Button type="button" onClick={generarContratoPDF} className="bg-green-600 hover:bg-green-700">Descargar Contrato PDF</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContratacionSeguros;
