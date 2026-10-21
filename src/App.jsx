//App.jsx
import "./App.css";
import DrawerScreen from "./components/CartDrawer.jsx";
import ProductPage from "./components/ProductPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
//=======components==========================================
import ShowProducts from "./components/ShowProducts";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./productsSlice.js";
//=======components==========================================

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);
  return (
    <>
      <Header />
      <DrawerScreen />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ShowProducts />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
