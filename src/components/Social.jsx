import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../commons/Card";
import { Link } from "react-router-dom";

export const Social = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (searchValue != "") {
        axios
          .get(`https://tmdb-35y0.onrender.com/api/allusers/search/${searchValue}`,{},{ withCredentials: true })
          .then((res) => setUsers(res.data));
      } else {
        axios.get("https://tmdb-35y0.onrender.com/api/allusers",{},{ withCredentials: true }).then((res) => setUsers(res.data));
      }
    }
  };

  useEffect(() => {
    axios.get("https://tmdb-35y0.onrender.com/api/allusers",{},{ withCredentials: true }).then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <section class="hero ">
        <div class="hero-body has-text-centered">
          <div class="container">
            <div class="box">
              <div class="control has-icons-left ">
                <input
                  onChange={handleChangeSearchValue}
                  onKeyPress={handleOnKeyDown}
                  type="text"
                  placeholder="Search people"
                  class="input "
                  required
                ></input>
                <span class="icon is-small is-left">
                  <i class="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero ">
        <div class="hero-body ">
          <h2 class="title">
            {searchValue == "" ? "Discover People" : "Search Results"}
          </h2>
          <div className="columns is-multiline layout">
            {users.map((user) => (
              <div className="column is-2" key={user.id}>
                <Link to={`/profile/${user.id}`}>
                  <Card data={user} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
