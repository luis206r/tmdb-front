import React, { useState } from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, setUser } from "../state/user";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const Newpass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const password = useInput();
  const repPassword = useInput();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (password.value != "" && password.value == repPassword.value) {
      return axios
        .put("https://tmdb-35y0.onrender.com/api/user/changepassword", {
          email: user.email,
          password: password.value,
        },{ withCredentials: true })
        .then((res) => {
          if (typeof res.data == "string") {
            message.error("La contraseña debe ser nueva");
          } else {
            message.success("Se cambió la contraseña");
            navigate("/login");
          }
        })
        .catch((error) => console.error(error));
    }
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
                    New Password
                  </label>
                  <div class="control has-icons-left">
                    <input
                      {...password}
                      type="password"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">
                    Repeat new password
                  </label>
                  <div class="control has-icons-left">
                    <input
                      {...repPassword}
                      type="password"
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
                    Save
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
