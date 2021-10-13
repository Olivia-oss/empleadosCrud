import { Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import firebase from './firebase';

class App extends Component{

//document.title = 'Gestión de empleados';

state = {
  data:[],
  modalEditar:false,
  modalInsertar:false,
  modalEliminar:false,
  form:{
    img: '',
    title:'',
    desc:'',
    price:'',
  },
  clave:''
}

handleChangeImg = () =>{
  let name="img";
  let value=document.getElementById(name).files[0];

  this.setState({form: {
    ...this.state.form,
    [name]: URL.createObjectURL(value)
  }})
}

peticionesGet = () => {
  firebase.child('product').on('value', empleado => {
    if(empleado.val() !== null){
      this.setState({...this.state.data, data:empleado.val()})
    }else{
      this.setState({data:[]})
    }
  })
}

componentDidMount(){
  this.peticionesGet();
}

peticionPost = () =>{
  firebase.child("product").push(this.state.form,
    error => {
      if(error) console.log(error);
    })
    this.setState({modalInsertar:false})
}

peticionPut = () =>{
  firebase.child(`product/${this.state.clave}`).set(
    this.state.form,
    error =>{
      if(error)console.log(error);
    }
  )
  this.setState({modalEditar:false})
}

peticionDelete = () =>{
  firebase.child(`product/${this.state.clave}`).remove(
    error => {
      if(error)console.log(error);
    }
  );
  this.setState({modalEliminar:false})
}


handleChange = e => {
  this.setState({form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }})

  console.log(this.state.form);
}

seleccionarEmpleado = async(empleado, clave, caso) =>{
  await this.setState({form: empleado, clave:clave});

  (caso === "Editar")?this.setState({modalEditar:true}):
  this.setState({modalEliminar:true})
}


  render(){
    return (
      <div className="container">
      <h3 className="text-center m-2 titulo">👉🏼E m p l e a d o s👈🏼</h3>
      <div className="App">
        <br/>
        <div className="row">
    <button className="btn btn-primary btn-block m-2" onClick={()=>this.setState({modalInsertar:true})}>Nuevo Empleado ➕👨🏻‍💻</button>
    </div>
   <br />
   <br />
   {this.state.data.length === 1 ? (
     <li className="list-group-item text-center">🤡Aún no hay empleados registrados🤡</li>
   ) : (
        <table className="table table-striped table align-middle table-bordered text-center">
          <thead className="table-dark">
            <tr>
            <th>CLAVE</th>
            <th>IMAGEN</th>
            <th>TITUTO</th>
            <th>DESCRIPCION</th>
            <th>PRECIO</th>
            <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {   
            Object.keys(this.state.data).map(i=>(
              <tr key={i} >
                <td>{i}</td>
                <td><img src={this.state.data[i].img}></img></td>
                 <td>{this.state.data[i].title}</td>
                <td>{this.state.data[i].desc}</td>
                <td>{this.state.data[i].price}</td>
                <td>
                  <button className="btn btn-warning m-2" onClick={()=>this.seleccionarEmpleado(this.state.data[i],i,"Editar")}>Editar📝</button>
                  <button className="btn btn-danger" onClick={()=>this.seleccionarEmpleado(this.state.data[i],i,"Eliminar")}>Eliminar🗑️</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
        )}
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Clave</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="clave"
                value={this.state.form?this.state.clave:''}
              />
              <br />
  
              <label>Imagen</label>
              <input
                className="form-control"
                id="img"
                type="text"
                name="img"
                onChange={this.handleChange}
              />
              <br />
  
              <label>Titulo</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={this.state.form?this.state.form.title:''}
                onChange={this.handleChange}
              />
              <br />
              <label>Descripcion</label>
              <input
                className="form-control"
                type="text"
                name="desc"
                value={this.state.form?this.state.form.desc:''}
                onChange={this.handleChange}
              />
              <br />
              <label>Precio</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={this.state.form?this.state.form.price:''}
                onChange={this.handleChange}
              />
              <br />
             
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
              Actualizar
            </button>
            <button
              className="btn btn-danger" onClick={()=>this.setState({modalEditar:false})}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
  
        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás Seguro que deseas eliminar el registro {this.state.form && this.state.form.title}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={()=>this.setState({modalEliminar:false})}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
  
  <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">  
            <label>Imagen</label>
              <input
                className="form-control"
                id="img"
                type="text"
                name="img"
                onChange={this.handleChange}
              />
              <br />
  
              <label>Titulo</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={this.state.form && this.state.form.nombre}
                onChange={this.handleChange}
              />
              <br />
              <label>Descripcion</label>
              <input
                className="form-control"
                type="text"
                name="desc"
                value={this.state.form && this.state.form.edad}
                onChange={this.handleChange}
              />
              <br />
              <label>Precio</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={this.state.form && this.state.form.sexo}
                onChange={this.handleChange}
              />
              <br />
             
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary"
            onClick={()=>this.peticionPost()}>
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={()=>this.setState({modalInsertar:false})}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
        </div>
      </div>
    );
  }
}

export default App;
