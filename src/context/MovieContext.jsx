/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    fetchMovies(); // Fetch default movies on mount
  }, []);

  const fetchMovies = async (query = "Marvel") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      if (response.data.Response === 'True') {
        const moviesList = response.data.Search || [];
        const detailedMovies = await Promise.all(
          moviesList.map(async (movie) => {
            const detailResponse = await axios.get(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}&plot=short`
            );
            return detailResponse.data;
          })
        );
        setMovies(detailedMovies);
      } else {
        setError(response.data.Error);
        if (query !== "Marvel") {
          fetchMovies("Marvel"); // Fallback to default movies
        }
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <MovieContext.Provider value={{ 
      movies, 
      fetchMovies, 
      loading, 
      error, 
      favorites, 
      toggleFavorite 
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
