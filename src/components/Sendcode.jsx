import React, { useState } from "react";
import useInput from "../hooks/useInput";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOnlyMail } from "../state/user";
import "../stylesheets/Loader.css";
import { message } from "antd";

export const Sendcode = () => {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //para validar formato de correo y evitar enviar codigo a correos invalidos
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mailCode, setMailCode] = useState("");
  const email = useInput();
  const code = useInput();

  const handleSendCode = function (e) {
    if (regexCorreo.test(email.value)) {
      setIsLoading(true);
      e.preventDefault();
      axios
        .put("https://tmdb-35y0.onrender.com/api/user/sendcode", { userMail: email.value })
        .then((res) => {
          setMailCode(res.data);
        })
        .then(() => {
          dispatch(setOnlyMail(email.value));
        })
        .then(() => {
          message.success("Se envió el código");
          setIsLoading(false);
        })
        .catch((error) => {
          message.error("Intente nuevamente...");
          setIsLoading(false);
        });
    } else {
      message.error("mail inválido");
    }
  };

  const handleValidate = function (e) {
    e.preventDefault();
    if (code.value == mailCode) {
      message.success("Código válido");
      navigate("/changepassword");
    }
    else{
      message.error("Código inválido");
    }
  };
  const handleSubmit = function (e) {
    handleValidate(e);
  };

  return (
    <>
      <section class="hero  is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" class="box" onSubmit={handleSendCode}>
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
                    <button class="button is-success" onClick={handleSendCode}>
                      Send code
                    </button>
                  </div>

                  <div class="field">
                    <label for="" class="label">
                      Code
                    </label>
                    <div class="control has-icons-left ">
                      <input
                        {...code}
                        type="text"
                        placeholder="e.g. 123456"
                        class="input"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div class="field">
                    <button class="button is-success" onClick={handleValidate}>
                      Validate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};
