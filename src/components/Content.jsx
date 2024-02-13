import React, { useEffect, useState } from "react";
import { Movies } from "./Movies";
import axios from "axios";
import { Series } from "./Series";
import "font-awesome/css/font-awesome.min.css";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";

export const Content = () => {
  const user = useSelector((state) => state.user);
  const [searchMoviesResults, setSearchMoviesResults] = useState([]);
  const [searchSeriesResults, setSearchSeriesResults] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const year = useInput();
  const searchValue = useInput();

  const apikeys = useSelector((state) => state.apikey);

  const handleOnKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (searchValue.value != "" && apikeys.api_key) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              searchValue.value
            )}${yearFilter}&include_adult=false&page=1`,
            {
              headers: {
                Authorization: apikeys.api_token,
              },
            }
          )
          .then((res) => {
            setSearchMoviesResults(res.data.results);
          })
          .catch((error) => console.error(error));

        axios
          .get(
            `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
              searchValue.value
            )}${yearFilter}&include_adult=false&page=1`,
            {
              headers: {
                Authorization: apikeys.api_token,
              },
            }
          )
          .then((res) => {
            setSearchSeriesResults(res.data.results);
          })
          .catch((error) => console.error(error));
      }
    }
  };

  useEffect(() => {
    if (year.value != "") setYearFilter(`&year=${year.value}`);
    else setYearFilter("");
  }, [year.value]);

  return (
    <>
      <section class="hero ">
        <div class="hero-body has-text-centered">
          <div class="container">
            <h1 class="title">Welcome to The Movie Data Base, {user.name}</h1>
          </div>
        </div>
      </section>

      <section class="hero">
        <div class="container">
          <div class="box is-flex is-justify-content-center">
            <div class="field is-grouped">
              <div class="control has-icons-left">
                <input
                  {...searchValue}
                  onKeyDown={handleOnKeyDown}
                  type="text"
                  placeholder="Search content"
                  class="input"
                  required
                  style={{ minWidth: 500 }}
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-search"></i>
                </span>
              </div>
              <div class="control">
                <input
                  {...year}
                  onKeyDown={handleOnKeyDown}
                  class="input"
                  type="text"
                  placeholder="Año"
                  required
                  style={{ maxWidth: 100 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero ">
        <div class="hero-body ">
          {searchMoviesResults.length == 0 ? (
            <h1 class="title" style={{fontSize:"35px"}}><b>Trending and upcoming movies and tv shows</b></h1>
          ) : (
            <h1 class="title" style={{fontSize:"35px"}}><b>Search results</b></h1>
          )}
          <Movies moviesToShow={searchMoviesResults || []} />
          <Series seriesToShow={searchSeriesResults || []} />
        </div>
      </section>
    </>
  );
};
