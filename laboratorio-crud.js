// Mongoose proporciona el cliente y los modelos de mongoDB.
// dotenv carga las variables de entorno desde el archivo env.
// Importamos el modelo para usarlo. 

import mongoose from "mongoose";
import dotenv from "dotenv";
import Ticket from "./models/tickets.js";


// Para poder utilizarlo.
dotenv.config();


async function ejecutarCicloCrud(){
    try {
        // MONGODB_URI Se lee desde el archivo del entorno .env
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a MongoDB Atlas.\n");

        // Vacia la coleccion antes de insertar los ejemplos para que cada ejecucion empiece los mismos datos.
        // Un filtro vacio ({}) coincide con todos
        // Esta operacion elimina todos los tickets de una coleccion si es que ante habia. Es util para una practica controlada.
        await Ticket.deleteMany({});


        // 1- CREATE (Crear DOCUMENTO)
        console.log("---1. Fase create: Insertando Tickets iniciales")
        

        // insertMany crea varios documentos en una sola operacion y devuelve los documentos creados que
        // aqui  se usan para informar cuantos se crearon
        const ticketCreados = await Ticket.insertMany([
    {
        codigo: "BUG-101",
        titulo: "Pasarela de pago lanza error 500 con tarjetas Visa",
        prioridad: "Critica",
        estado: "Abierto",
        etiquetas: ["pagos", "backend", "produccion"],
    },
    {
        codigo: "BUG-102",
        titulo: "El botón de login se desalinea en pantallas móviles",
        prioridad: "Baja",
        estado: "En progreso",
        agenteAsignado: "Sofía Castro",
        horasInvertidas: 2,
        etiquetas: ["ui", "css", "movil"],
    },
    {
        codigo: "BUG-103",
        titulo: "Fuga de memoria en el servidor de WebSockets",
        prioridad: "Alta",
        estado: "En progreso",
        agenteAsignado: "Marcos Vega",
        horasInvertidas: 5,
        etiquetas: ["backend", "rendimiento", "produccion"],
    },
    {
        codigo: "BUG-104",
        titulo: "Error tipográfico en el pie de página de contacto",
        prioridad: "Baja",
        estado: "Resuelto",
        agenteAsignado: "Sofía Castro",
        horasInvertidas: 1,
        etiquetas: ["ui", "texto"],
    },
    {
        codigo: "BUG-105",
        titulo: "Lentitud al exportar reportes en PDF desde el panel",
        prioridad: "Media",
        estado: "Abierto",
        etiquetas: ["backend", "reportes"],
    },
    ]);
    console.log(`Se crearon ${ticketCreados.length} tickets`);

    // 2. READ (Consultas con operadore)
    console.log("2--- 2. Fase read: Consultas con operadores")

    // $or devuelve documentos que cumplen al menos con una condicion: prioridad critica o mas de cuatro horas.
    // .select limita los campos de las respuestas 
    // El signo delante de _id excluye ese campo
    // Los resultados se guardan en una variable que podemos inspeccionar despues.
    // find devuelve una lista, incluso cuando hay una sola coincidencia. 

    const urgentesOComplejos = await Ticket.find({
        $or: [{prioridad:"Critica"}, {horasInvertidas: {$gt: 4}}], 
    }).select("Codigo titulo prioridad horasInveridas -_id");
    console.log("A) Criticos ó con > 4 horas ($or):", urgentesOComplejos);

    } catch (error) {
        // Si alguna operacion falla en el try, el flujo salta hacia aqui, el error se informa
        console.error("Error en el lab:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("\nDesconectado de Mongo Atlas");
    }
}

ejecutarCicloCrud();