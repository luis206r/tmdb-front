import React, { useEffect, useState } from "react";
import { Content } from "./components/Content";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate, useHistory } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Info } from "./commons/Info";
import { Profile } from "./components/Profile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, setUser } from "./state/user";
import { Social } from "./components/Social";
import { setKeys } from "./state/apikey";
import { Sendcode } from "./components/Sendcode";
import { Newpass } from "./components/Newpass";

export const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:3001/api/apikeys").then((res) => dispatch(setKeys(res.data)));

    axios //favorites
      .get("http://localhost:3001/api/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        }
      }, { withCredentials: true })
      .then((res) => {
        if (res.data.name) {
          dispatch(setUser({ ...res.data, favorites: [] }));
          axios
            .get(`http://localhost:3001/api/userfavorites/${res.data.user_id}`)
            .then((res) => {
              dispatch(setFavorites(res.data));
            });
        }
      })
      .then(() => navigate("/home"))
      .catch(() => {
        console.error("Aun no te has logeado");
        navigate("/login");
      });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Content />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendcode" element={<Sendcode />} />
        <Route path="/changepassword" element={<Newpass />} />
        <Route
          path="/info/:type/:id"
          element={
            <>
              <Navbar />
              <Info />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
        <Route
          path="/social"
          element={
            <>
              <Navbar />
              <Social />
            </>
          }
        />
      </Routes>
    </>
  );
};
