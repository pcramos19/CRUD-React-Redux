import axios from "axios";

const clienteAxios = axios.create({
    baseURL: "https://my-json-server.typicode.com/arturo-enriquez/db-productos"
});

export default clienteAxios;