// ProductPage.jsx
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { getFinalPrice } from "../utils";

export default function ProductPage() {
  const { status, error, items } = useSelector((state) => state.products);
  const { id } = useParams();
  const product = items.find((item) => item.id === Number(id));

  if (status === "idle" || status === "loading") {
    return (
      <p role="status" className="status-message">
        loading ...
      </p>
    );
  }

  if (status === "failed") {
    return (
      <div className="product-page">
        <p role="alert" className="status-message">
          {error}
        </p>
        <Link to="/" className="product-back">
          ← Back to products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <p className="status-message">Product not found</p>
        <Link to="/" className="product-back">
          ← Back to products
        </Link>
      </div>
    );
  }

  const finalPrice = getFinalPrice(product).toFixed(2);

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-info">
        <Link to="/" className="product-back">
          ← Back to products
        </Link>
        <h1>{product.title}</h1>
        {product.brand && (
          <p className="product-brand">Brand: {product.brand}</p>
        )}
        <div className="card-rating">Rate: ★ {product.rating.toFixed(1)}</div>
        <div className="card-price">
          <span className="price">Price: ${finalPrice}</span>
          <span className="old-price">${product.price.toFixed(2)}</span>
        </div>
        <p>description:</p>
        <p className="product-description">{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
