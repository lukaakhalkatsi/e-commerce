import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import all_product from "../Assets/all_product.js";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext.jsx";

function CartItems() {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
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
      {cartItems.items.map((item) => {
        return (
          <div>
            <div className="cartitems-format caritems-format-main">
              <img src={item.image} alt="" className="carticon-product-icon" />
              <p>{item.product_name}</p>
              <p>${item.old_price}</p>
              <button className="cartitems-quantity">{item.quantity}</button>
              <p>$255</p>
              <img className="cartitems-remove-icon" src={remove_icon} alt="" />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${0}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${cartItems.total_price}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
