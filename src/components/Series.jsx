import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../commons/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const Series = ({ seriesToShow }) => {
  const [series, setSeries] = useState([]);
  const apikeys = useSelector((state) => state.apikey);
  useEffect(() => {
    if (apikeys.api_key) {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${apikeys.api_key}`
        )
        .then((res) => {
          setSeries(res.data.results);
        });
    }
  }, [apikeys]);

  useEffect(() => {
    setSeries(seriesToShow);
  }, [seriesToShow]);

  return (
    <>
      <h2 class="title">Tv Shows {`(${series.length})`}</h2>
      <div className="columns is-multiline layout">
        {series.map((serie) => (
          <div className="column is-2" key={serie.id}>
            <Link to={`/info/tv/${serie.id}`}>
              <Card data={serie} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
