import React, { useContext, useState } from "react";
import { cartContext, productContext } from "../../App";
import "../../Styles/ProductPreview.css";

const ProductPreview = () => {
  const { productDetails } = useContext(productContext);
  const { setCartItems } = useContext(cartContext);
  const imageCount = productDetails ? productDetails.images.length : 0;
  const [showPopup, setShowPopup] = useState(false);

  const imgClass =
    imageCount === 1
      ? "one-img"
      : imageCount === 2
      ? "two-img"
      : imageCount === 3
      ? "three-img"
      : imageCount === 4
      ? "four-img"
      : "";

  const handleAddToCart = (curItems) => {
    setCartItems((prevItems) => {
      if (prevItems.some((item) => item.id === curItems.id)) {
        return prevItems;
      } else {
        return [...prevItems, curItems];
      }
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="product-preview">
      {productDetails ? (
        <div className="product-container">
          <div className={`img-container ${imgClass}`}>
            {productDetails.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="product-img"
              />
            ))}
          </div>
          <div className="specifications">
            <div className="details">
              <span className="type">{productDetails.category}</span>
              <span className="title">{productDetails.title}</span>
              <span className="description">{productDetails.description}</span>
            </div>
            <div className="price-details">
              <span className="price">${productDetails.price}</span>

              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(productDetails)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-details">No product details available</p>
      )}
      {showPopup && <div className="add-to-cart-popup">Item Added to Cart</div>}
    </div>
  );
};

export default ProductPreview;
