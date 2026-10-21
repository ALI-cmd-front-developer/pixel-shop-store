// /components/Header.jsx
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../cartSlice";
import { Link } from "react-router-dom";
export default function Header() {
  const count = useSelector((state) => state.cart.ids.length);
  const dispatch = useDispatch();
  return (
    <header>
      <Link to={"/"} className="title">
        Pixel & Shop
      </Link>
      <nav className="nav">
        <button
          aria-label={`cart ${count} items`}
          onClick={() => dispatch(openCart())}
        >
          <ShoppingCartOutlinedIcon className="cart" /> <span>{count}</span>
        </button>
      </nav>
    </header>
  );
}
