import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema(
    {
        // Identificador legible obligatorio, trim quita los espacios de los extremos (Espacios en blanco)
        // Uppercase lo convierte en mayuscula
        // Unique solicita un indice unico en mongoDB (No es un validador de mongoose)
        codigo: {
            type: String,
            required: [true, "El codigo del ticket es obligatorio"],
            unique: true,
            uppercase: true,
            trim: true
        },
        // Tituo obligatorio, sin espacios en blanco, con una longitud minima de 5.
        titulo: {
            type: String,
            required: [true, "El titulo es obligatorio"],
            trim: true,
            minlength: [5, "El titulo debe tener al menos 5 caracteres"],

        },
        // Enum Crea una lista y restringe los valores aceptados mediante una lista, default se usa cuando no se indica
        // minlength valida que si no es menor que 5 no guarde.
        prioridad: {
            type: String,
            requird: true,
            enum: {
                values: ["Baja", "Media", "Alta", "Critica"],
                message: "{VALUE} No es una prioridad valida"
            },
            default: "Media"
        },
        // Limitamos las opciones permitidas con el enum 
        // Su valor inicial es "Abierto" si es quien crea el ticket no especifica otro.
        estado: {
            type: String,
            requird: true,
            enum: ["Abierto", "En progreso", "Resuelto", "Cerrado"],
            default: "Abierto",
        },
        // Es opcional, no contiene un required.
        agente: {
            type: String,
            trim: true,
        }, 
        // Si no se especifican horas, empieza en cero, min impide valores negativos.
        horasInvertidas: {
            type: Number,
            default: 0,
            min: [0, "Las horas no pueden ser negativas"]

        }, 
        // Array de texto, cada documento empieza con una lista viva
        etiquetas: {
            type: [String],
            default: []
        }
    },
    {
        // Mongoose: añade y mantiene createAt y el updatedAt de forma automatica.
        timestamps: true

    },
);

// En servidores que recargen modulos, reutiliza el modelo ya registrado para evitar el error de intentar compilar dos veces

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

// Se necesita para exportar, y asi poder usarlo en la api y otras consultas que necesitemos.

export default Ticket;
