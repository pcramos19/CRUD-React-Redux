import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
  } from '../types';
  
  import clienteAxios from '../config/axios';
  import Swal from 'sweetalert2';
  
  // Crear un nuevo producto - Funcion principal
  export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
      dispatch(nuevoProducto());
  
      // Insertar en la API
      clienteAxios.post('/libros', producto)
        .then(res => {
          console.log(res);
          // Se inserta correctamente
          dispatch(agregarProductoExito(producto));
        })
        .catch(err => {
          console.log(err);
          // Si hay un error
          dispatch(agregarProductoError(err));
        })
    }
  }
  
  export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
  });
  
  export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
  })
  
  export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
  })
  
  // Obtener listado de productos (Consultar API)
  export function obtenerProductosAction() {
    return (dispatch) => {
      dispatch(obtenerProductosComienzo());
  
      // Consultar la API
      clienteAxios.get('/libros')
        .then(res => {
          // console.log(res);
          dispatch(descargaProductosExitosa(res.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(descargaProductosError());
        })
    }
  }
  
  export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
  })
  
  export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
  })
  
  export const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
  })
  
  
  // Funcion que limina un Producto en especifico
  export function borrarProductoAction(id) {
    return (dispatch) => {
      dispatch(obtenerProductoEliminar());
  
      // Eliminar en la API
      clienteAxios.delete(`/libros/${id}`)
        .then(res => {
          dispatch(eliminarProductoExito(id));
        })
        .catch(err => {
          // console.log(err);
          dispatch(eliminarProductoError());
        })
    }
  }
  
  export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
  })
  
  export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
  })
  
  export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
  })
  
  
  // Obtener el Producto a Editar
  export function obtenerProductoEditarAction(id) {
    return (dispatch) => {
      dispatch(obtenerProductoAction());
  
      // obtener producto de la API
      clienteAxios.get(`/libros/${id}`)
        .then(res => {
          dispatch(productoEditarExito(res.data));
        })
        .catch(err => {
          // console.log(err);
          dispatch(productoEditarError());
        })
    }
  }
  
  export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
  })
  
  export const productoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
  })
  
  export const productoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
  })
  
  
  // Modifica un producto en la API y sate
  export function editarProductoAction(producto) {
    return (dispatch) => {
      dispatch(comenzarEdicionProducto());
  
      // Consultar la API
      clienteAxios.put(`/libros/${producto.id}`, producto)
        .then(res => {
          dispatch(editarProductoExito(res.data));
  
          Swal.fire(
            'Almacenado',
            'El producto se actualizo correctamente',
            'success'
          );
        })
        .catch(err => {
          // console.log(err);
          dispatch(editarProductoError());
        })
    }
  }
  
  export const comenzarEdicionProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
  })
  
  export const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
  })
  
  export const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
  })
