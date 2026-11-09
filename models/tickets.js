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
                values: ["Baja", "Media", "Alta", "Critica"]
                message: "{VALUE} No es una prioridad valida"
            },
            default: "Media"
        }, 

        
    }.
    {

    }
)