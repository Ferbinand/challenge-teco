import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


const NuevoCliente = () => {
    const navigate = useNavigate()
    const [creado, setCreado] = useState(false)
    const [data,setData] = useState()
    

    function handleOnChange(e){
        const newData = {...data}
        newData[e.target.id]= e.target.value
        setData(newData)
        console.log(newData)
    }

    function submit(e){
        e.preventDefault();
        if(!data || !data.nombre || !data.apellido || !data.dni || !data.telefono){
            Swal.fire(
                'Error',
                'El nombre, apellido y telefono son campos obligatorios.',
                'error'
            )
            return
        }
        axios.post('http://localhost:4500/api/clientes',{
            _id:data._id,
            nombre:data.nombre,
            apellido:data.apellido,
            dni:data.dni,
            telefono:data.telefono,
            genero: data.genero,
            estado: data.estado
        })
        .then(res=>{
            setCreado(true)
            console.log(res.data)
        })
    }

    useEffect(()=>{
        if(creado){
            Swal.fire(
                'Cliente creado!',
                'El cliente ha sido creado en la base de datos.',
                'success'
            )
            navigate("/Tabla")
        }
    }, [creado])

   
  return (
    <div className="col-md-3 container">
        <br/><br/>
        <h1>Crear cliente</h1>
        <hr></hr>
        <form onSubmit={(e)=> submit(e)}>
        <br/>
            <div>
            <input onChange={(e)=>handleOnChange(e)} id="nombre" value={data && data.nombre ? data.nombre : ""}  placeholder="nombre" type="text"/>
            </div>
            <p/>
            <div>
            <input onChange={(e)=>handleOnChange(e)} id="apellido" value={data && data.apellido ? data.apellido : ""} placeholder="apellido" type="text"/>
            </div>
            <p/>
            <div>
            <input onChange={(e)=>handleOnChange(e)} id="dni" value={data && data.dni ? data.dni : ""} placeholder="dni" type="text"/>
            </div>
            <p/>
            <div>
            <input onChange={(e)=>handleOnChange(e)} id="telefono" value={data && data.telefono ? data.telefono : ""} placeholder="telefono" type="text"/>
            </div>
            <p/>
            <div>
            <input onChange={(e)=>handleOnChange(e)} id="genero" value={data && data.genero ? data.genero : ""} placeholder="genero" type="text"/>
            </div>
            <p/>
            <div className="form-check">
                <input onChange={(e)=>handleOnChange(e)} id="estado" type="checkbox" className="form-check-input" value={true} />
                <label className="form-check-label" htmlFor="exampleCheck1">Estado activo?</label>
            </div>
            <br/>

            <button type="submit" className="btn btn-dark">Guardar</button>
        </form>
    </div>
  )
}

export default NuevoCliente