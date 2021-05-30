import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import Cono from "../../notFound.png";
import {
  addMovieFavorite,
  getMovies,
  removeMovieFavorite,
} from "../../actions/index";

export function Buscador(props) {
  return (
    <div className="searchContainer">
      {props.movies ? (
        <ul id="moviesList">
          {props.movies.map((movie) => (
            <div className="movieCard" key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <img className="poster" src={movie.Poster} />
              </Link>

              {props.favorites.indexOf(movie) === -1 ? (
                <button
                  className="fav"
                  onClick={() => props.addMovieFavorite(movie)}
                >
                  ☆
                </button>
              ) : (
                <button
                  className="fav"
                  onClick={() => props.removeMovieFavorite(movie.imdbID)}
                >
                  ⭐
                </button>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <div className="errorContainer">
          <h1 className="errorMsg">
            Sorry! We can't find a movie that matches your search. Try again
          </h1>
          <img src={Cono} width="100" height="100" />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,
    favorites: state.moviesFavourites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
    removeMovieFavorite: (id) => dispatch(removeMovieFavorite(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
/* 
export default Buscador; */
