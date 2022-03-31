import { Schema, model } from 'mongoose';

//Creamos la estructura de nuestra base de datos
const schema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    }
}, {
    timestamps: true //Crea dos datos más (fecha de creación y actualización)
});

export default model('Note', schema)