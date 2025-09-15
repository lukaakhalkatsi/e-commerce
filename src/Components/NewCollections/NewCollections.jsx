import "./NewCollections.css";
import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

function NewCollections() {
  const { products } = useContext(ShopContext);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {products.map(({ id, name, image, new_price, old_price }, i) => {
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
        })}
      </div>
    </div>
  );
}

export default NewCollections;
