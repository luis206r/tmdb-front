import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import useInput from "../hooks/useInput";
import { setFavorites, setUser } from "../state/user";
import { useDispatch } from "react-redux";
import { message } from "antd";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useInput();
  const name = useInput();
  const lastName = useInput();
  const password = useInput();

  const handleSubmit = function (e) {
    e.preventDefault();
    return axios
      .post("https://tmdb-35y0.onrender.com/api/register", {
        name: name.value,
        lastname: lastName.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => res.data)
      .then((createdUser) => setUser(createdUser))
      .then(() => message.success("Usuario creado"))
        // return axios
        //   .post("https://tmdb-35y0.onrender.com/api/login", {
        //     email: email.value,
        //     password: password.value,
        //   },{ withCredentials: true })
        //   .then((res) => {
        //     if (res.data.name) {
        //       dispatch(setUser({ ...res.data, favorites: [] }));
        //       return axios
        //         .get(`https://tmdb-35y0.onrender.com/api/userfavorites/${res.data.user_id}`,{},{ withCredentials: true })
        //         .then((res) => {
        //           dispatch(setFavorites(res.data));
        //         });
        //     }
        //   })
        .then(() => navigate("/login"))
        .catch(() => console.error("Algo salió mal..."));
      };

  return (
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box" onSubmit={handleSubmit}>
                <div class="field">
                  <label for="" class="label">
                    Name
                  </label>
                  <div class="control has-icons-left">
                    <input {...name} type="text" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">
                    Last name
                  </label>
                  <div class="control has-icons-left">
                    <input {...lastName} type="text" class="input" required />
                    <span class="icon is-small is-left">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">
                    Email
                  </label>
                  <div class="control has-icons-left">
                    <input
                      {...email}
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      class="input"
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
                  <button type="submit" class="button is-success">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
