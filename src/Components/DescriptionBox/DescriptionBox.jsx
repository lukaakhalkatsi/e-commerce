import "./DescriptionBox.css";

function DescriptionBox() {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An eCommerce website is an online platform that allows businesses or
          individuals to sell products and services over the internet. It serves
          as a digital storefront where customers can browse items, view
          detailed descriptions, compare prices, add products to a shopping
          cart, and securely complete purchases through integrated payment
          gateways.
        </p>
        <p>
          E-commerce websites typically display products or services with
          detailed descriptions, high-quality images, pricing information, and,
          in many cases, customer reviews or ratings. These elements help
          potential buyers make informed purchasing decisions by providing both
          visual and textual information about the item.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox;
