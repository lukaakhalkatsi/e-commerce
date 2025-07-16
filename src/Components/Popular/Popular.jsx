import "./Popular.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";

function Popular() {
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map(({ id, name, image, new_price, old_price }, i) => {
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

export default Popular;
