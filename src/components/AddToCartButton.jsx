// AddToCartButton.jsx
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../cartSlice";

export default function AddToCartButton({ productId }) {
  const dispatch = useDispatch();
  const ids = useSelector((state) => state.cart.ids);
  const inCart = ids.includes(productId);
  return (
    <button
      className={inCart ? "card-btn gray" : "card-btn"}
      onClick={() =>
        dispatch(inCart ? removeFromCart(productId) : addToCart(productId))
      }
    >
      {inCart ? "in cart" : "add to cart"}
    </button>
  );
}
