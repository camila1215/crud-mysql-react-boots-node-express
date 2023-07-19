import './App.css';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';




function App() {
const [formData, setFormData] = useState({
  id:'', nombre:'', edad:0, pais:'', cargo:'',
  anios:0
});
const noti = withReactContent(Swal);
const [empleadosList, setEmpleados] = useState([]);
const [editar, setEditar] = useState(false);

const limpiarCampos = () =>{
  setFormData({ id:'', nombre:'', edad:'', pais:'', cargo:'',
  anios:''});
  setEditar(false);
}

const editarEmpleado = (val)=>{
  console.log(val.nombre);
  setEditar(true);
  setFormData({
    id:val.id,
    nombre:val.nombre,
    edad: val.edad,
    pais:val.pais,
    cargo: val.cargo,
    anios:val.anios
  })
}

const add =()=>{
  Axios.post("http://localhost:3001/create", {
    nombre: formData.nombre,
    edad: parseInt(formData.edad),
    pais: formData.pais,
    cargo:formData.cargo,
    anios:parseInt(formData.anios)}).then(()=>{
      getEmpleados();
      limpiarCampos();
      noti.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado <strong>"+formData.nombre+" </strong> fue registrado correctamente!</i>",
        icon: 'success',
        timer: 2000
      })
    }).catch(function(error){
      noti.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró registrar el empleado!',
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error)).message
      })
    }) 
}


const update =()=>{
  console.log(formData);
  Axios.put("http://localhost:3001/update", {
    id: formData.id,
    nombre: formData.nombre,
    edad: parseInt(formData.edad),
    pais: formData.pais,
    cargo:formData.cargo,
    anios:parseInt(formData.anios)}).then(()=>{
      getEmpleados();
      limpiarCampos();
      noti.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: "<i>El empleado <strong>"+formData.nombre+" </strong> fue actualizado correctamente!</i>",
        icon: 'success',
        timer: 2000
      })
    }).catch(function(error){
      noti.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró actualizar el empleado!',
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error)).message
      })
    }) 
}

const eliminar =(valor)=>{
  noti.fire({
    title: "<strong>Eliminar!</strong>",
    html: "<i>¿Desea eliminar al empleado<strong> "+ valor.nombre +"</strong> ?</i>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminarlo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/delete/${valor.id}`).then(()=>{
        getEmpleados();
        limpiarCampos();
        noti.fire({
          position: "top-end",
          title: "<strong>Eliminación exitosa!</strong>",
          html: "<i>El empleado <strong>"+formData.nombre+" </strong> fue eliminado correctamente!</i>",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
  }).catch(function(error){
    noti.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se logró eliminar el empleado!',
      footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente mas tarde" : JSON.parse(JSON.stringify(error)).message
    })
  }) 
    }
  });
}

const getEmpleados =()=>{
  Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    })
}

useEffect(()=>{
  getEmpleados();
}, [])




const handleChange = (e) =>{
  setFormData(prev => ({...prev, [e.target.name] : e.target.value}));
}

  return (
    <div className='container'>
              <div className="card text-center">
                  <div className="card-header">
                    GESTION DE EMPLEADOS
                  </div>
                  <div className="card-body">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">Nombre: </span>
                      <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Ingrese el nombre" 
                          aria-label="Username" 
                          aria-describedby="basic-addon1"                   value={formData.nombre}
                          name='nombre'
                          onChange={(e)=> setFormData(prev => ({...prev, [e.target.name] : e.target.value}))}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">Edad: </span>
                      <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Ingrese la edad" 
                          aria-label="Edad" 
                          aria-describedby="basic-addon1"                   value={formData.edad}  
                          name='edad'
                          onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">Pais: </span>
                      <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Ingrese el país" 
                          aria-label="Pais" 
                          aria-describedby="basic-addon1"                   value={formData.pais}  
                          name='pais'
                          onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">Cargo: </span>
                      <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Ingrese el cargo" 
                          aria-label="Cargo" 
                          aria-describedby="basic-addon1"                   value={formData.cargo}  
                          name='cargo'
                          onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">Año: </span>
                      <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Ingrese el año" 
                          aria-label="anios" 
                          aria-describedby="basic-addon1"                   value={formData.anios}  
                          name='anios'
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="card-footer text-body">
                    {editar?  <>
                    <button onClick={update} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button> </>:
                     <button onClick={add} className='btn btn-success'>Registrar</button>
                    }
                     
                  </div>
          </div>

          <table className='table table-striped'>
          <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>
                <th scope="col">Cargo</th>
                <th scope="col">Experiencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>

            {empleadosList.map((valor, key)=>{
                          return (
                            <tr key={valor.id}>
                              <th scope="row">{valor.id}</th>
                              <td>{valor.nombre}</td>
                              <td>{valor.edad}</td>
                              <td>{valor.pais}</td>
                              <td>{valor.cargo}</td>
                              <td>{valor.anios}</td>
                              <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                  <button type="button" className="btn btn-info" onClick={()=>{editarEmpleado(valor)}}>Editar</button>
                                  <button type="button" className="btn btn-danger" onClick={()=>{eliminar(valor)}}>Eliminar</button>
                                </div>
                              </td>
                            </tr>
                          )
                      })}
             
             
            </tbody>
          </table>
    </div>
  );
}

export default App;
