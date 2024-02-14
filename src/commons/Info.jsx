import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFavorites } from "../state/user";
import "../stylesheets/Loader.css";
import { message } from "antd";

export const Info = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { type, id } = useParams();
  const [info, setInfo] = useState({});
  const [trailerURL, setTrailerURL] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [contentIsInFavorites, setContentIsInFavorites] = useState(false);

  const evaluateButton = (favs) => {
    const isInFavs = favs.some((favObj) => favObj.type_id == +id);
    if (isInFavs) {
      setContentIsInFavorites(true);
      setButtonText("Remove from favs 💔");
    } else setButtonText("Add to favs 💚");
  };

  useEffect(() => {
    evaluateButton(user.favorites);
    setIsLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/${type}/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGI5ODYwMGVjZWZmNGNkZTNlN2NkM2RhNWE4M2EyYSIsInN1YiI6IjY1M2ZlYWFkY2M5NjgzMDE0ZWJhNjRkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2IoAmKFN5q51hDBHQtOdB-JpTrllajXQTabv0HKLLN0",
        },
      })
      .then((res) => {
        setInfo({ ...info, ...res.data });
        setIsLoading(false);
      });

    axios
      .get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGI5ODYwMGVjZWZmNGNkZTNlN2NkM2RhNWE4M2EyYSIsInN1YiI6IjY1M2ZlYWFkY2M5NjgzMDE0ZWJhNjRkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2IoAmKFN5q51hDBHQtOdB-JpTrllajXQTabv0HKLLN0",
        },
      })
      .then((res) => {
        console.log(res.data);
        const teasers = res.data.results.filter(
          (video) => video.type === "Teaser"
        );
        const trailers = res.data.results.filter(
          (video) => video.type === "Trailer"
        );
        if (trailers.length > 0) {
          const trailerKey = trailers[0].key; 
          setTrailerURL(`https://www.youtube.com/embed/${trailerKey}`);
        } else if (teasers.length > 0) {
          const teaserKey = teasers[0].key; 
          setTrailerURL(`https://www.youtube.com/embed/${teaserKey}`);
        }
      });
  }, []);

  useEffect(() => {
    if (contentIsInFavorites) setButtonText("Remove from favs 💔");
    else if (!contentIsInFavorites) setButtonText("Add to favs 💚");
  }, [contentIsInFavorites]);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (!contentIsInFavorites) {
      return axios
        .post(`https://tmdb-35y0.onrender.com/api/addfavorites/${user.user_id}`, {
          type: type,
          type_id: +id,
          title: type == "movie" ? info.title : info.name,
          poster_path: info.poster_path,
          release_date:
            type == "movie" ? info.release_date : info.first_air_date,
        } , {withCredentials:true})
        .then(() => {
          return axios
            .get(`https://tmdb-35y0.onrender.com/api/userfavorites/${user.user_id}`,{},{withCredentials:true})
            .then((res) => dispatch(setFavorites(res.data)))
            .then(() => {
              setContentIsInFavorites(true);
              message.success("Se agregó a favoritos");
            });
        })
        .catch(() => {
          message.error("algo salio mal...");
          console.error("algo salio mal...");
        });
    } else if (contentIsInFavorites) {
      return axios
        .post(`https://tmdb-35y0.onrender.com/api/removefavorites/${user.user_id}`, {
          type: type,
          type_id: +id,
        }, {withCredentials:true})
        .then(() => {
          return axios
            .get(`https://tmdb-35y0.onrender.com/api/userfavorites/${user.user_id}`,{},{withCredentials:true})
            .then((res) => dispatch(setFavorites(res.data)))
            .then(() => {
              setContentIsInFavorites(false);
              message.success("Se removió de favoritos");
            });
        })
        .catch(() => {
          message.error("algo salio mal...");
          console.error("algo salio mal...");
        });
    }
  };
  return (
    <>
      <section class="hero ">
        <div class="hero-body ">
          <div class="columns is-centered">
            <div class="column is-4">
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                    <img
                      src={
                        info.poster_path
                          ? `https://image.tmdb.org/t/p/original${info.poster_path}`
                          : !isLoading
                          ? "https://ih1.redbubble.net/image.4786164722.8625/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
                          : ""
                      }
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="card">
                <div class="card-content">
                  <p class="title is-2">
                    {info.original_title
                      ? info.original_title
                      : info.original_name}
                  </p>
                  <p class="subtitle is-7">
                    {info.release_date
                      ? info.release_date
                      : info.first_air_date}
                  </p>
                  <div class="content has-text-left">{info.overview}</div>
                  <div class="content has-text-left">
                    <button class="button is-info is-rounded">
                      {(+info.vote_average).toFixed(1)}
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button onClick={handleOnClick} class="button is-success">
                      {buttonText}
                    </button>
                  </div>
                  {trailerURL != "" && (
                    <div>
                      <iframe
                        style={{
                          borderRadius: "15px",
                          width: "100%",
                          aspectRatio: "3/1.8",
                        }}
                        src={trailerURL}
                        frameborder="0"
                        allowfullscreen
                        ng-show="showvideo"
                      ></iframe>
                    </div>
                  )}
                </div>
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
