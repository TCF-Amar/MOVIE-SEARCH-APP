/* eslint-disable no-unused-vars */
import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
    return (
        <motion.div
            className="bg-gray-800 md:p-4 rounded-lg shadow-lg text-center hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
        >
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                alt={movie.Title}
                className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
            <div className="text-sm text-gray-400 mt-2">
                <p>{movie.Year} • {movie.Runtime}</p>
                <p className="mt-1 hidden md:block">{movie.Genre}</p>
                <p className="mt-2 text-yellow-400">⭐ {movie.imdbRating}/10</p>
            </div>
            <p className="text-sm mt-3 text-gray-300 line-clamp-3 hidden md:block">{movie.Plot}</p>
            <div className="flex justify-between items-center mt-3 p-2">
                <span className="text-sm bg-gray-600 px-2 py-1 rounded">{movie.Type}</span>
                <button
                    className={`p-2 rounded-lg transition-colors ${
                        isFavorite
                            ? 'text-red-400'
                            : 'text-gray-400 hover:text-red-400'
                    }`}
                    onClick={() => onToggleFavorite(movie)}
                >
                    <FaBookmark />
                </button>
            </div>
        </motion.div>
    );
}

export default MovieCard;
