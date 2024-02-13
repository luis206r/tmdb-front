import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../commons/Card";
import "../stylesheets/Loader.css";

export const Profile = () => {
  const userGlobal = useSelector((state) => state.user);
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    if (id == undefined) {
      setUser(userGlobal);
    }
    if (id != undefined) {
      axios.get(`https://tmdb-35y0.onrender.com/api/user/${id}`,{},{ withCredentials: true }).then((res) => {
        const userData = res.data;
        axios.get(`https://tmdb-35y0.onrender.com/api/userfavorites/${id}`,{},{ withCredentials: true }).then((resFavorites) => {
          const userWithFavorites = {
            ...userData,
            favorites: resFavorites.data,
          };
          setUser(userWithFavorites);
        });
      });
    }
  }, [id]);

  if (!user.name) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    ); //los metodos set toman un tiempo
  }
  return (
    <section class="hero ">
      <div class="hero-body ">
        <h2 class="title">{user.name + "'s Info"}</h2>

        <div class="columns">
          <div class="column is-6">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        // src="https://bulma.io/images/placeholders/96x96.png"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">
                      {user.name} {user.lastname}
                    </p>
                    <p class="subtitle is-6">{user.email}</p>
                  </div>
                </div>

                <div class="content">
                  <p>
                    <strong>About:</strong> Lorem ipsum dolor sit amet,
                    consectetur
                  </p>
                </div>
                <div class="content">
                  <p>
                    <strong>Age: </strong>22
                  </p>
                </div>
                <div class="content">
                  <p>
                    <strong>From: </strong>Lima, Perú
                  </p>
                </div>
                <div class="content">
                  <p>
                    <strong>Major: </strong>Computer Science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <h2 class="title">Favorite Movies</h2>
        <div className="columns is-multiline layout">
          {user.favorites.map((fav) => {
            return (
              fav.type == "movie" && (
                <div className="column is-2" key={fav.id}>
                  <Link to={`/info/movie/${fav.type_id}`}>
                    <Card data={fav} />
                  </Link>
                </div>
              )
            );
          })}
        </div>

        <h2 class="title">Favorite TV Shows</h2>
        <div className="columns is-multiline layout">
          {user.favorites.map((fav) => {
            return (
              fav.type == "tv" && (
                <div className="column is-2" key={fav.id}>
                  <Link to={`/info/tv/${fav.type_id}`}>
                    <Card data={fav} />
                  </Link>
                </div>
              )
            );
          })}
        </div>
      </div>
    </section>
  );
};
