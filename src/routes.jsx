import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import SearchPage from "./pages/SearchPage";

const routes = (
  <Routes>
    <Route path="/" element={<SearchPage />} />
    <Route path="/favorites" element={<Favorites />} />
  </Routes>
);

export default routes;
