import { jsPDF } from "jspdf";

export const generarCaratulaPDF = () => {
    const doc = new jsPDF();
    const marginX = 20;
    const maxY = 280;
    let y = 20;

    const addText = (text: string, x = marginX, lineHeight = 6, fontSize = 9, bold = false) => {
        if (y + lineHeight > maxY) {
            doc.addPage();
            y = 20;
        }
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(fontSize);
        doc.text(text, x, y);
        y += lineHeight;
    };

    const centerText = (text: string, fontSize = 10, bold = false) => {
        if (y + 8 > maxY) {
            doc.addPage();
            y = 20;
        }
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(fontSize);
        doc.text(text, 105, y, { align: "center" });
        y += 8;
    };

    // Encabezado
    centerText("SEGUROS EL ROBLE, S.A.", 16, true);
    centerText("PÓLIZA INDIVIDUAL", 13);
    centerText("SEGURO DE VIDA TEMPORAL", 13);
    centerText("CARÁTULA DE LA PÓLIZA", 13, true);
    y += 5;

    // Datos generales
    addText("Póliza No.: ______________________    Plan Contratado: ______________________    Moneda: ____________________", marginX, 7);
    addText("Forma de Pago: ____________________    Inicio de Vigencia: ____________________    Fin de Vigencia: ____________________", marginX, 7);
    addText("Edad de Aceptación: ____    Edad de Terminación: ____", marginX, 7);
    addText("Nombre del Asegurado Principal: ____________________________________________", marginX, 7);
    addText("Dirección del Asegurado Principal: ___________________________________________", marginX, 7);
    addText("Nombre del Contratante: ___________________________________________", marginX, 7);
    addText("Dirección del Contratante: ___________________________________________", marginX, 7);

    y += 5;
    addText("CUADRO DE BENEFICIOS", marginX, 8, 12, true);
    addText("Cobertura: ____________________________________________________________", marginX, 6);
    addText("Beneficio(s) Adicional(es): ________________________________________________", marginX, 6);
    addText("Suma Asegurada: _______________________________________________________", marginX, 6);
    addText("Nombre(s) y Apellidos del(los) Beneficiario(s): ______________________________", marginX, 6);
    addText("Parentesco: ____________________      Porcentaje: ____________________", marginX, 6);

    y += 5;
    addText("Seguros El Roble, S.A., conviene en otorgar cobertura al Asegurado Titular nombrado en", marginX);
    addText("la solicitud y a pagar los beneficios de acuerdo a las disposiciones de esta Póliza.", marginX);
    addText("Todas las coberturas y beneficios están sujetos a las condiciones, exclusiones y demás", marginX);
    addText("términos de esta Póliza.", marginX);

    y += 5;
    addText("Consideración", marginX, 7, 12, true);
    addText("Esta Póliza se emite de acuerdo a la información ofrecida en la solicitud y al pago de la prima,", marginX);
    addText("la cual es pagadera según el medio y forma de pago acordados.", marginX);

    y += 5;
    addText("Días para Devolver la Póliza", marginX, 7, 12, true);
    addText("Si por cualquier razón el asegurado no está satisfecho con esta Póliza, podrá solicitar", marginX);
    addText("la cancelación dentro de los quince (15) días siguientes de haberla recibido.", marginX);
    addText("La Compañía devolverá cualquier prima pagada y la Póliza quedará sin efecto desde", marginX);
    addText("su inicio, siempre y cuando no se haya pagado ninguna reclamación.", marginX);

    y += 5;
    addText("Fecha de Vigencia", marginX, 7, 12, true);
    addText("La Póliza se hace efectiva a las 12:01 a.m. en la fecha indicada y cesará a las 12:00 medianoche", marginX);
    addText("según las condiciones de cancelación.", marginX);

    y += 5;
    addText("Notificación Importante sobre las Declaraciones en la Solicitud", marginX, 7, 12, true);
    addText("Esta Póliza se emite tomando en cuenta que las respuestas en la solicitud son veraces.", marginX);
    addText("Omisiones o declaraciones inexactas pueden invalidar la cobertura conforme al Artículo No. 908", marginX);
    addText("del Código de Comercio de Guatemala.", marginX);

    y += 10;
    addText("Firmado por : ____________________________", marginX);
    y += 5;
    addText("Apoderado", marginX);

    y += 10;
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    addText("ESTE TEXTO ES RESPONSABILIDAD DE LA ASEGURADORA Y FUE REGISTRADO EN LA SUPERINTENDENCIA DE", marginX, 4.5);
    addText("BANCOS SEGÚN RESOLUCIÓN No. 617-2018 DEL TRES DE ABRIL DEL 2018, REGISTRO QUE NO PREJUZGA", marginX, 4.5);
    addText("SOBRE EL CONTENIDO DEL MISMO.", marginX, 4.5);

    const pdfBlob = doc.output("blob");
    return pdfBlob;
};
