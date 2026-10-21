// CartDrawer.jsx
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@mui/material/Drawer";
import { closeCart, removeFromCart } from "../cartSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { getFinalPrice } from "../utils";
import { Link } from "react-router-dom";
export default function DrawerScreen() {
  const dispatch = useDispatch();
  const { isOpen, ids } = useSelector((state) => state.cart);
  const items = useSelector((state) => state.products.items);
  const cartItems = items.filter((item) => ids.includes(item.id));
  const total = cartItems.reduce((prev, curr) => {
    return prev + getFinalPrice(curr);
  }, 0);

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => dispatch(closeCart())}>
      <div className="cart-drawer">
        <h2 className="cart-title">Your cart</h2>
        {cartItems.length === 0 && (
          <p className="cart-empty">Your cart is empty</p>
        )}
        <ul className="cart-list">
          {cartItems.map((item) => {
            const finalPrice = getFinalPrice(item).toFixed(2);
            return (
              <li className="cart-item" key={item.id}>
                <Link
                  to={`/product/${item.id}`}
                  className="cart-link"
                  onClick={() => dispatch(closeCart())}
                >
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <span>Price :${finalPrice}</span>
                  </div>
                </Link>
                <button
                  aria-label="delete"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="cart-remove"
                >
                  <HighlightOffIcon />
                </button>
              </li>
            );
          })}
        </ul>
        {cartItems.length > 0 && (
          <div className="cart-total">Total :${total.toFixed(2)}</div>
        )}
      </div>
    </Drawer>
  );
}
