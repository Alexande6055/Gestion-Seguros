
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useSolicitudes } from "@/context/SolicitudesContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Solicitudes from "@/service/Solicitudes";

const formSchema = z.object({
  nombres: z.string().min(2, "Los nombres deben tener al menos 2 caracteres"),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  cedula: z.string().min(8, "La cédula debe tener al menos 8 caracteres"),
  telefono: z.string()
    .regex(/^09\d{8}$/, "El teléfono debe iniciar con 09 y tener 10 dígitos")
    .refine((val) => !/[a-zA-Z]/.test(val), "El teléfono no puede contener letras"),
  email: z.string().email("Ingrese un email válido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

const Asesores = () => {
  const { toast } = useToast();
  const { agregarSolicitud } = useSolicitudes();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      cedula: "",
      telefono: "",
      email: "",
      mensaje: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const solicitudData = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      cedula: values.cedula,
      telefono: values.telefono,
      email: values.email,
      mensaje: values.mensaje,
    };

    agregarSolicitud(solicitudData);
    Solicitudes.createSolicitud({
      ...solicitudData,
      nombre: solicitudData.nombres,
      apellido:solicitudData.apellidos
    });
    toast({
      title: "Solicitud enviada",
      description: "Su solicitud ha sido registrada exitosamente.",
    });

    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Nuestros Asesores</h1>
            <p className="text-lg text-muted-foreground">
              Contáctanos para obtener asesoría personalizada sobre nuestros seguros
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Solicitar Asesoría</CardTitle>
              <CardDescription>
                Complete el formulario y nos pondremos en contacto con usted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nombres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese sus nombres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apellidos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese sus apellidos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cedula"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cédula</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese su cédula" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: 0987654321"
                            {...field}
                            maxLength={10}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Ingrese su email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mensaje"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describa el tipo de asesoría que necesita"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Enviar Solicitud
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Asesores;
