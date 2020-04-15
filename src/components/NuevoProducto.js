import React, {useState} from "react";

// Redux
import {crearNuevoProductoAction} from '../actions/productosAction';
import {validarFormularioAction, validacionExito, validacionError} from '../actions/validacionAction';
import {useDispatch, useSelector} from 'react-redux';

const NuevoProducto = ({history}) => {

  // state
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  // Crear nuevo producto
  const dispatch = useDispatch();
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));
  const validarFormulario = () => dispatch(validarFormularioAction());
  const exitoValidacion = () => dispatch(validacionExito());
  const errorValidacion = () => dispatch(validacionError());

  // Obtener los datos del state
  const error = useSelector((state) => state.error.error);
  
  // Agregar nuevo producto
  const submitNuevoProducto = e => {
    e.preventDefault();

    validarFormulario();

    // validar el formulario
    if (nombre.trim() === '' || precio.trim() === '') {
      errorValidacion();
      return;
    }

    // Si pasa la validacion 
    exitoValidacion();

    // crear nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    // redireccionar
    history.push('/');
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">
              Agregar Nuevo Producto
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {error ? <div className="font-weight alert alert-danger text-center mt-4">Todos los campos son obligatorios</div>: null}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;