/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { MovieContext } from '../context/MovieContext.jsx'


function MovieApp() {
    const [query, setQuery] = useState('');
    const { movies, fetchMovies, loading, error, favorites, toggleFavorite } = useContext(MovieContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies(query);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">🎬 Movie Finder</h1>
            <motion.form
                onSubmit={handleSubmit}
                className="flex items-center border border-gray-400 rounded-lg py-2 px-4 bg-gray-800 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <input
                    type="text"
                    className="outline-none bg-transparent text-white p-2 w-full"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="p-2 text-gray-300 hover:text-white">
                    <FaSearch />
                </button>
            </motion.form>

            {error && <p className="text-red-400 mt-4">{error}</p>}

            {loading ? (
                <p className="mt-4">Loading...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}

           
        </div>
    );
}

export default MovieApp;
