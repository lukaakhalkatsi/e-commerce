import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";

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
      <div>
        <div className="cartitems-format">
          <img src="" alt="" className="carticon-product-icon" />
          {/* <p>product name</p> */}
          {/* <p>product new price</p> */}
          <button className="cartitems-quantity"></button>
          {/* <p>total value of individual item</p> */}
          <img src={remove_icon} alt="" />
        </div>
        <hr />
      </div>
    </div>
  );
}

export default CartItems;
