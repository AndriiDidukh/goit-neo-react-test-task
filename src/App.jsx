import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { fetchCampers } from "./redux/campersOps";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CamperFeatures from "./components/CamperFeatures/CamperFeatures";
import CamperReviews from "./components/CamperReviews/CamperReviews";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<DetailsPage />}>
          <Route path="features" element={<CamperFeatures />} />
          <Route path="reviews" element={<CamperReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
