import React, { useContext } from 'react';
import "../../Styles/Gallery.css";
import { fetchContext } from '../../App';
import { LIST_OF_CATEGORIES } from '../Pages/Constants';

const Gallery = () => {
  const { data } = useContext(fetchContext);

  const getFilteredProducts = (categoryGroup) => {
    return data.filter((item) =>
      LIST_OF_CATEGORIES[categoryGroup]?.some(
        (subcategory) => item.category.toLowerCase() === subcategory.toLowerCase()
      )
    ).slice(0, 10); 
  };

  return (
    <div className="galleries-container">
      {Object.keys(LIST_OF_CATEGORIES).map((categoryGroup, index) => (
        <div key={index} className="gallery">
          <h2>{categoryGroup}</h2>
          <div className="image-slider">
            {getFilteredProducts(categoryGroup).map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.thumbnail} alt={`Slider image ${index + 1}`} />
                <span>{image.title}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
