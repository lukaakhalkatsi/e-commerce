import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import starr_dull_icon from "../Assets/star_dull_icon.png";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { LoaderCircle } from "lucide-react";

function ProductDisplay({ product }) {
  const { addItemToCart, loading } = useContext(CartContext);

  const handleAddItemToCart = async (slug) => {
    console.log(slug);
    try {
      await addItemToCart(slug);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={starr_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => handleAddItemToCart(product.slug)}>
          {loading ? <LoaderCircle /> : <span>ADD TO CART</span>}
        </button>

        <p className="productdisplay-right-category">
          <span>Category :</span>
          Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>
          Modern, Latest, Crop Top
        </p>
      </div>
    </div>
  );
}

export default ProductDisplay;
