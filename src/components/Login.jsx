import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, setUser } from "../state/user";
import "font-awesome/css/font-awesome.min.css";
import useInput from "../hooks/useInput";
import { message } from "antd";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useInput();
  const password = useInput();

  const handleSubmit = function (e) {
    e.preventDefault();

    return axios
      .post("https://tmdb-35y0.onrender.com/api/login", {
        email: email.value,
        password: password.value,
      },{ withCredentials: true })
      .then((res) => {
        if (res.data.user.name) {
          //seteo jwt a localstorage 
          localStorage.setItem('userToken',res.data.token);
          //
          dispatch(setUser({ ...res.data.user, favorites: [] }));
          return axios
            .get(`https://tmdb-35y0.onrender.com/api/userfavorites/${res.data.user.user_id}`)
            .then((res) => {
              dispatch(setFavorites(res.data));
            });
        }
      })
      .then(() => navigate("/home"))
      .catch(() => message.error("Contraseña incorrecta"));
  };

  return (
    <section class="hero  is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box" onSubmit={handleSubmit}>
                <div class="field">
                  <label for="" class="label">
                    Email
                  </label>
                  <div class="control has-icons-left ">
                    <input
                      {...email}
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input "
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">
                    Password
                  </label>
                  <div class="control has-icons-left">
                    <input
                      {...password}
                      type="password"
                      placeholder="*******"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <button class="button is-success" type="submit">
                    Login
                  </button>
                  &nbsp;&nbsp;or&nbsp;&nbsp;
                  <Link to="/register">
                    <button class="button is-success">Register</button>
                  </Link>
                </div>
                <div class="field">
                  <Link to="/sendcode">
                    <p>Forgot your password?</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
