import { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

function ShopCategory({ ItemCategory, banner }) {
  const { products } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map(
          ({ id, name, image, new_price, old_price, category }, i) => {
            if (ItemCategory === category) {
              return (
                <Item
                  key={i}
                  id={id}
                  name={name}
                  image={image}
                  new_price={new_price}
                  old_price={old_price}
                />
              );
            } else {
              return null;
            }
          }
        )}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
}

export default ShopCategory;
