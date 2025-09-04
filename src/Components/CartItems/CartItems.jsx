import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import all_product from "../Assets/all_product.js";

function CartItems() {
  return (
    <div className="cartitems">
      <div className="caritems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item) => {
        if (item.id === 1 || item.id === 2) {
          return (
            <div>
              <div className="cartitems-format caritems-format-main">
                <img
                  src={item.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.name}</p>
                <p>${item.old_price}</p>
                <button className="cartitems-quantity">3</button>
                <p>$255</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default CartItems;
