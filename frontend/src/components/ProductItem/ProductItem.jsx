import React, { useContext } from "react";
import "./ProductItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ProductItem = ({ id, name, price, description, image, unit }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="product-item">
      <div className="product-item-img-container">
        <img
          className="product-item-image"
          src={url + "/images/" + image}
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="product-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>
      <div className="product-item-info">
        <div className="product-item-name-rating">
          <span className="product-name">{name}</span>
          <span className="product-rating">
            <img src={assets.rating_starts} alt="rating stars" />
          </span>
        </div>
        <p className="product-item-desc">{description}</p>
        <p className="product-item-price">
          ${price}
          {unit && unit !== "Select" && <span className="unit"> / {unit}</span>}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
