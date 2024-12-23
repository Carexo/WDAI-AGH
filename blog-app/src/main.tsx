import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout.tsx";
import CounterPage from "./pages/Counter";
import Home from "./pages";
import Blog from "./pages/Blog";
import AddBlog from "./pages/Blog/Add";
import ArticlePage from "./pages/Article/:id";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog">
            <Route index element={<Blog />} />
            <Route path="add" element={<AddBlog />} />
          </Route>
          <Route path="/article/:id" element={<ArticlePage />} />
        </Route>
        <Route path="/counter" element={<CounterPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
