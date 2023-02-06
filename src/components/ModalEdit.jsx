import {useEffect, useState} from 'react'

function ModalEdit({clienteprop, onSubmit, onCancel}) {
  const [cliente, setCliente] = useState()
  useEffect(()=>{
    setCliente({
      _id: clienteprop._id,
      nombre: clienteprop.nombre,
      apellido: clienteprop.apellido,
      dni: clienteprop.dni,
      telefono: clienteprop.telefono,
      genero: clienteprop.genero,
      estado: clienteprop.estado
    })
  },[clienteprop])

function handleOnChange (e) {
  const newDataClient = {...cliente}
  newDataClient[e.target.id] = e.target.value
  setCliente(newDataClient)
}

  if (cliente){

    return (
      <div className='container'>
        <br/><br/><br/>
        <h2>Editar datos</h2>

        <form>

          <div className="col-md-2 form-group">
            <label >Nombre</label>
            <input id="nombre" value={cliente.nombre} onChange={(e)=>{handleOnChange(e)}}/>
          </div>

          <div className="col-md-2 form-group">
            <label >Apellido</label>
            <input id="apellido" value={cliente.apellido} onChange={(e)=>{handleOnChange(e)}}/>
          </div>

          <div className="col-md-2 form-group">
            <label >DNI </label>
            <input id="dni" value={cliente.dni} onChange={(e)=>{handleOnChange(e)}}/>
          </div>

          <div className="col-md-2 form-group">
            <label >Telefono</label>
            <input id="telefono" value={cliente.telefono} onChange={(e)=>{handleOnChange(e)}}/>
          </div>

          <div className="col-md-2 form-group">
            <label >Genero</label>
            <input id="genero" value={cliente.genero} onChange={(e)=>{handleOnChange(e)}}/>
          </div>

          <div className="form-check">
            <label >Estado</label>
            <select value={cliente.estado} id="estado" className="form-select" aria-label="Default select example" onChange={(e)=>{handleOnChange(e)}}>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>


          <button type="button" className="btn btn-primary" onClick={()=>{onSubmit(cliente)}}>Guardar</button>

          <button type="button" className="btn btn-dark" onClick={()=>{onCancel()}} >Cancelar</button>

        </form>
        
      </div>
    );
  }else{
    return(<></>)
  }

}

export default ModalEdit;