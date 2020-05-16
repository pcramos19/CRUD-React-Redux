import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark black justify-content-between">
      <div className="container">
        <Link to={'/'} className="text-light">
          <img src="../../logo_transparent.png" alt="ulist"/>
        </Link>
        <Link to={'/productos/nuevo'} className="btn btn-danger nuevo-post d-block d-md-inline-block">Agregar Producto &#43;</Link>
      </div>
    </nav>
  );
};

export default Header;