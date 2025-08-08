import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";

function RelatedProducts() {
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
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

export default RelatedProducts;
