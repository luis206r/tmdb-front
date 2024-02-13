import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../commons/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../stylesheets/Loader.css";

export const Movies = ({ moviesToShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const apikeys = useSelector((state) => state.apikey);
  useEffect(() => {
    if (apikeys.api_key) {
      setIsLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apikeys.api_key}`
        )
        .then((res) => {
          setMovies(res.data.results);
          setIsLoading(false);
        });
      // .then(() => { //bug con peliculas repetidas :(
      //   axios
      //     .get(`https://api.themoviedb.org/3/movie/upcoming?page=1`, {
      //       headers: {
      //         Authorization: apikeys.api_token,
      //       },
      //     })
      //     .then((res2) => {
      //       setMovies((prevMovies) => [...prevMovies, ...res2.data.results]);
      //       setIsLoading(false);
      //     });
      // });
    }
  }, [apikeys]);

  useEffect(() => {
    setMovies(moviesToShow);
  }, [moviesToShow]);

  return (
    <>
      <h2 class="title">Movies {`(${movies.length})`}</h2>
      <div className="columns is-multiline layout">
        {movies.map((movie) => (
          <div className="column is-2" key={movie.id}>
            <Link to={`/info/movie/${movie.id}`}>
              <Card data={movie} />
            </Link>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};
