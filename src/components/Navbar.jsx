import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../state/user";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOutClick = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    return axios
      .post("http://localhost:3001/api/logout",{},{withCredentials:true})
      .then(() => {
        localStorage.removeItem('userToken');
        navigate("/login");
      })
      .catch(() => console.error("Error al salir de la cuenta"));
  };

  return (
    <nav className="navbar has-background-black-ter mb-4">
      <h3 className="navbar-item has-text-weight-bold has-text-white">TMDB</h3>
      <div className="navbar-item navbar-end">
        <Link to="/home">
          <button className="button is-ghost has-text-white">Home</button>
        </Link>
        <Link to="/profile">
          <button className="button is-ghost has-text-white">Profile</button>
        </Link>
        <Link to="/social">
          <button className="button is-ghost has-text-white">Social</button>
        </Link>
        <button className="button is-ghost has-text-white">About</button>
      </div>
      <div className="navbar-item navbar-end">
        <a onClick={handleLogOutClick} className="button is-primary">
          <strong>logout</strong>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
