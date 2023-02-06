import axios from "axios";
import {useEffect, useState} from 'react'
import ModalEdit from './ModalEdit'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


function Tabla (){
    const navigate = useNavigate()
    const [clientes , setClientes] = useState([])
    const [clientsLoaded, setClientsLoaded] = useState(false)
    const [value, setValue] = useState ("")
    const [filtrar, setFiltrar] = useState([])
    const [modaltr, setModaltr] = useState(false)
    const [clienteSeleccionado, setClienteSeleccionado] = useState()

    useEffect(()=>{ //para comprobar que se cargo
        if(clientsLoaded===false){
            getClientes()
            setClientsLoaded(true)
        }
    },[clientsLoaded])
    
    
    const getClientes = () => {
        axios.get('http://localhost:4500/api/clientes')
        .then(res =>{
            console.log("Obteniendo del servidor:", res.data)
            if(res.data.clientes.length===0) {
                sinClientes()
            }else{
                setClientes(res.data.clientes)
                setFiltrar(res.data.clientes)
            }
    }).catch(err => console.log(err));
    };

    function handleOnChange (e) {
        setValue(e.target.value)
    }

    const sinClientes = () => {
        Swal.fire(
            'Vacio!',
            'Debes crear un cliente antes de visualizarlo.',
            'error'
        )
        navigate("/")
    }

    const mostrarError = () => {Swal.fire(
        'Cliente no encontrado!',
        'El cliente no se encuentra en la base de datos.',
        'error'
        )
    }

    async function handleOnClick () {
        if(value!==""){
        const filtrado = clientes.filter(cliente => (cliente.dni===value))
        filtrado.length === 0 ? mostrarError() : setFiltrar(filtrado)
        }else {
            getClientes()
        }
        /*const filtrado = clientes.filter(cliente => (cliente.dni===value))
        if(filtrado.lenght === 0 ) {
            Swal.fire(
                'Cliente no encontrado!',
                'El cliente no se encuentra en la base de datos.',
                'error'
              )
        }else{
            console.log(filtrado.length) 
            setFiltrar(filtrado)}*/
            //ESTA NOTACION DE CONDICIONAL NO FUNCIONO, SE TUVO QUE SEPARAR EN CONSTANTE Y ASIGNAR UN TERNARIO... WTF
    }

     function handleShowModal(cliente){
        setClienteSeleccionado(cliente)
        setModaltr(true)
    }

    function handleDelete(cliente){
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Vas a eliminar un cliente de la base de datos',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar cliente!',
            cancelButtonText: 'No, conservar cliente'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Cliente Borrado!',
                'Tu cliente ha sido eliminado.',
                'success'
              ).then(()=>{
                 axios.delete(`http://localhost:4500/${cliente._id}`)
              }).then(navigate("/"));
            } 
          })
       
    }

    function showModalEdit(){
        if(modaltr===true && clienteSeleccionado){
            return (<ModalEdit onCancel={cancelEdit} onSubmit={handleSubmit} clienteprop={clienteSeleccionado}/>)
        }
    }
    function cancelEdit(){
        setModaltr(false);
        setClienteSeleccionado()
    }

    function handleSubmit(cliente){
        Swal.fire({
            title: 'Esta seguro?',
            text: 'Vas a cambiar la informacion del cliente en la base de datos',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, modificar cliente!',
            cancelButtonText: 'No, ignorar cambios'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Cliente Actualizado!',
                'Tu cliente ha sido modificado.',
                'success'
              ).then(()=>{
                setClienteSeleccionado()
                setModaltr(false)
                axios.put(`http://localhost:4500/${cliente._id}`, {
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    dni: cliente.dni,
                    telefono: cliente.telefono,
                    genero: cliente.genero,
                    estado: cliente.estado
                }).then(getClientes);
              })
            } 
          })
        }


    

    return(
        <div className="container">
            <br/>
            <div>
                <h1 text-align="center" >Clientes Telecom</h1>
            </div>
             <label>
                Busqueda por DNI
            </label>
            <br/>
            <input onChange={handleOnChange} value={value}/>
            <button type="button" className="btn btn-dark" onClick={handleOnClick}>
                Filtrar
            </button>
            <br/> <br/> <br/> <br/>
            
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <td>ID</td>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Telefono</th>
                    <th>Genero</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                {filtrar.map((cliente, index)=>{
                    return(
                        <tr key={cliente._id}>
                            <td>{index+1}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.dni}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.genero}</td>
                            <td>{cliente.estado ? "Activo": "Inactivo"}</td>
                            <td><button type="button" className="btn btn-primary" onClick={()=>{handleShowModal(cliente)}}>Editar</button></td>
                            <td><button type="button" className="btn btn-danger" onClick={()=>{handleDelete(cliente)}}>Eliminar</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="container">
                {showModalEdit()}
            </div>
        </div>
    );
}

export default Tabla;

