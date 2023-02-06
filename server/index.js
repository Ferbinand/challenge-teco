import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import clientemodel from './clientmodel.js';

//import cors from 'cors';

const app = express();
//ajustes puerto y express
const port=4500
app.use(express.json());





//mongoose coneccion a mongo atlas
const url = "mongodb+srv://mariano:CBvBq8TKs4mWn0XH@cluster0.jkbqtqo.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, {})

//middleware para transformar objetos como json
app.use(cors()); //para que conecte el back con el front
app.use(express.json({limit: "30mb"}));



//Obtener el total del listado de los clientes
app.get('/api/clientes', async (req,res) => {
    const clientes = await clientemodel.find();
    res.json({
        clientes
    });
});

//ruta de error
app.get('/favicon.ico', (req, res) => res.status(204));

//Obtener un solo cliente por ID (cambiar a "DNI")
app.get('/:id', async (req,res) => {
    const cliente = await clientemodel.findById(req.params.id);
    res.json({
        cliente: cliente
    });
});

//posteo de un nuevo cliente
app.post('/api/clientes', async (req,res) => { 
    const {nombre, apellido, dni, genero, telefono, estado} = req.body;
    const cliente = new clientemodel({
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        genero: genero,
        telefono: telefono,
        estado: estado
    });
    await cliente.save();
    res.json({
        status: "Cliente guardado"
    })   
})

//Actualiza cliente (EDIT) por ID
app.put ('/:id', async (req,res) => {
    const {nombre, apellido, dni, genero, telefono, estado} = req.body;
    const clienteNuevo ={
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        genero: genero,
        telefono: telefono,
        estado: estado
    }
    await clientemodel.findByIdAndUpdate(req.params.id, clienteNuevo, {useFindAndModify:false});
    res.json({
        status: "Cliente actualizado"
    });

})

// borrar registro
app.delete("/:id", async (req,res) => {
    await clientemodel.findByIdAndRemove(req.params.id, {useFindAndModify: false});
    res.json({
        status: "Cliente eliminado"
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


















