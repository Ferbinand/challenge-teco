import mongoose from 'mongoose';

const ClienteSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    dni: {type: String, required: true},
    genero: {type: String},
    telefono: {type: String},
    estado: {type:Boolean}
});

export default mongoose.model("clientemodel", ClienteSchema);