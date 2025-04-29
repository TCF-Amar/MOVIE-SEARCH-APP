/* eslint-disable no-unused-vars */
import React, { useContext, useState, useMemo } from 'react';
import { MovieContext } from '../context/MovieContext.jsx';
import MovieCard from './MovieCard';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Saved() {
    const { favorites, toggleFavorite } = useContext(MovieContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('title'); // 'title', 'year', 'rating'

    // Filter and sort movies based on search query and sort option
    const filteredMovies = useMemo(() => {
        let result = [...favorites];
        
        // Apply search filter
        if (searchQuery) {
            result = result.filter(movie => 
                movie.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                movie.Year.includes(searchQuery) ||
                movie.Genre?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case 'year':
                    return parseInt(b.Year) - parseInt(a.Year);
                case 'rating':
                    return parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0);
                case 'title':
                default:
                    return a.Title.localeCompare(b.Title);
            }
        });

        return result;
    }, [favorites, searchQuery, sortBy]);

    const clearAllFavorites = () => {
        // Clear favorites from localStorage
        localStorage.setItem('favorites', '[]');
        // Clear favorites from context
        favorites.forEach(movie => toggleFavorite(movie));
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-900 text-white p-6"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold mb-4 md:mb-0">❤️ Saved Movies ({favorites.length})</h1>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Search input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search saved movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg w-full sm:w-64"
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Sort dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                            <option value="title">Sort by Title</option>
                            <option value="year">Sort by Year</option>
                            <option value="rating">Sort by Rating</option>
                        </select>

                        {/* Clear all button */}
                        {favorites.length > 0 && (
                            <button
                                onClick={clearAllFavorites}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                            >
                                <FaTrash />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {favorites.length === 0 ? (
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-gray-400 text-lg mt-12"
                    >
                        No saved movies yet. Start adding some movies to your favorites!
                    </motion.p>
                ) : filteredMovies.length === 0 ? (
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-gray-400 text-lg mt-12"
                    >
                        No movies match your search.
                    </motion.p>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {filteredMovies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                isFavorite={true}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default Saved;