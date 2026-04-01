import './index.css'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router';
import { App } from "./App.jsx";
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'
import Search from './components/Search'
import Category from './components/Category'
import ErrorPage from './components/ErrorPage'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
