# 🎬 Movie Search App

A modern, responsive movie search application built with React that allows users to search for movies, view details, and manage their favorites.

## ✨ Features

- 🔍 Search for movies using the OMDB API
- 📱 Responsive design that works on desktop and mobile
- 💫 Smooth animations and transitions using Framer Motion
- ❤️ Save favorite movies locally
- 🔄 Sort and filter saved movies
- 🌓 Movie details including plot, rating, and year
- 🎯 Error handling and loading states

## 🚀 Technologies Used

- **React** - Frontend library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Router** - Navigation and routing
- **React Icons** - Icon components

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd movie-search-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```env
VITE_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## 🎮 Usage

- **Search Movies**: Type a movie title in the search bar and press enter
- **View Details**: Click on a movie card to see more details
- **Save Favorites**: Click the heart icon to save a movie to favorites
- **Manage Favorites**: 
  - Navigate to the Saved page to view all favorites
  - Sort favorites by title, year, or rating
  - Search within your saved movies
  - Remove individual movies or clear all favorites

## 🏗️ Project Structure

```
src/
├── components/        # React components
│   ├── Header.jsx    # Navigation header
│   ├── MovieApp.jsx  # Main search component
│   ├── MovieCard.jsx # Movie card component
│   └── Saved.jsx     # Saved movies page
├── context/          # React context
│   └── MovieContext.js  # Global state management
└── assets/          # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

