import React from "react";
import MovieApp from "./components/MovieApp.jsx";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Saved from "./components/Saved.jsx";
import MovieProvider from "./context/MovieContext.jsx";

const App = () => (
  <MovieProvider>
    <Header />
    <main className="pt-12">
      <Routes>
        <Route path="/" element={<MovieApp />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </main>
  </MovieProvider>
);

export default App;