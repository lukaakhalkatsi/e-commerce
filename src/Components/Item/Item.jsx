import "./Item.css";
import { Link } from "react-router-dom";

function Item({ id, name, image, new_price, old_price }) {
  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt=""
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">${new_price}</div>
        <div className="item-price-old">${old_price}</div>
      </div>
    </div>
  );
}

export default Item;
