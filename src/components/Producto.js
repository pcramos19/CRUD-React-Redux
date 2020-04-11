import React from 'react';
import {Link, useHistory} from "react-router-dom";


import { useDispatch } from "react-redux";
import { borrarProductoAction, obtenerProductoEditar } from "../actions/productoActions"

const Producto = ({producto}) => {

    const { nombre, precio, id} = producto

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmarEliminarProducto = id => {

        dispatch ( borrarProductoAction(id))
    }

    const redireccionarEdicion = producto => {
        dispatch (obtenerProductoEditar(producto))
        history.push(`/productos/editar/${id}`)
    }

    return(
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> $ {precio} </span></td>
            <td className="acciones">
                <button 
                    type= "button" 
                    className="btn btn-primary mr-2"
                    onClick={ () => redireccionarEdicion(producto)}
                >
                Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Producto;