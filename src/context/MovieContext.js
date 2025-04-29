/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  // Use API key from environment variables
  const API_KEY = '660506c1';
  const API_URL = 'https://www.omdbapi.com';

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    fetchMovies();
  }, []);

  const fetchMovies = async (query = "Marvel") => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `${API_URL}/?apikey=${API_KEY}&s=${query}`
      );

      if (response.data.Response === 'True') {
        const moviesList = response.data.Search || [];
        const detailedMovies = await Promise.all(
          moviesList.map(async (movie) => {
            try {
              const detailResponse = await axios.get(
                `${API_URL}/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
              );
              return detailResponse.data;
            } catch (error) {
              console.error(`Error fetching details for movie ${movie.imdbID}:`, error);
              return movie; // Return basic movie info if detailed fetch fails
            }
          })
        );
        setMovies(detailedMovies);
      } else {
        setError(response.data.Error || 'No movies found');
        if (query !== "Marvel") {
          fetchMovies("Marvel"); // Fallback to default movies
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError('Failed to fetch movies. Please try again later.');
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
