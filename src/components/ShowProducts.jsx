// ./components/ShowProducts.jsx
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SortIcon from "@mui/icons-material/Sort";
import { getFinalPrice } from "../utils";
import AddToCartButton from "./AddToCartButton";
import { setSearch, setCategory } from "../filtersSlice";
export default function ShowProducts() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const select = useSelector((state) => state.filter.category);
  const input = useSelector((state) => state.filter.search);

  //============================================================
  const quary = input.toLowerCase().trim();
  const filterdItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(quary) &&
      (select === "" || item.category === select),
  );

  //============================================================
  return (
    <>
      <div className="wrapper-input-filter">
        <div className="input">
          <input
            id="search"
            value={input}
            onChange={(event) => dispatch(setSearch(event.target.value))}
            type="text"
            placeholder=" "
          />
          <label htmlFor="search">search for product</label>
        </div>
        <div className="filter">
          <SortIcon />
          <select
            aria-label="filter"
            name="filter"
            id="filter"
            value={select}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="">All categories</option>
            <option value="smartphones">smartphones</option>
            <option value="laptops">laptops</option>
            <option value="tablets">tablets</option>
            <option value="mobile-accessories">mobile-accessories</option>
          </select>
        </div>
      </div>
      {(status === "idle" || status === "loading") && (
        <p role="status" className="status-message">
          loading ...
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="status-message">
          {error}
        </p>
      )}
      {status === "succeeded" && filterdItems.length === 0 && (
        <p role="status" className="no-results">
          No products match your search.
        </p>
      )}
      <ul className="products">
        {status === "succeeded" &&
          filterdItems.map((product) => {
            const finalPrice = getFinalPrice(product).toFixed(2);
            return (
              <li key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <div className="card-image">
                    <span className="badge">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="card-body">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="card-title">{product.title}</h3>
                  </Link>
                  <div className="card-rating">
                    ★ {product.rating.toFixed(1)}
                  </div>
                  <div className="card-price">
                    <span className="price">${finalPrice}</span>
                    <span className="old-price">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <AddToCartButton productId={product.id} />
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
