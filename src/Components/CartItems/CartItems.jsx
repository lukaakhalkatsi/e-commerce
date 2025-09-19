import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import all_product from "../Assets/all_product.js";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext.jsx";

function CartItems() {
  const { cartItems, removeItemFromCart } = useContext(CartContext);
  const handleRemoveItemFromCart = async (slug) => {
    console.log(slug);
    try {
      await removeItemFromCart(slug);
    } catch (error) {
      console.log(error);
    }
  };
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

      {cartItems?.items?.length > 0 ? (
        cartItems.items.map((item, index) => (
          <div key={item.slug || index}>
            <div className="cartitems-format caritems-format-main">
              <img
                src={item.product.image}
                alt=""
                className="carticon-product-icon"
              />
              <p>{item.product.name}</p>
              <p>${item.product.current_price}</p>
              <button className="cartitems-quantity">{item.quantity}</button>
              <p>${item.quantity * Number(item.product.current_price)}</p>
              <img
                className="cartitems-remove-icon"
                onClick={() => handleRemoveItemFromCart(item.product.slug)}
                src={remove_icon}
                alt=""
              />
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}

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
