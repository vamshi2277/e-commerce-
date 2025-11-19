import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { searchContext, productContext, fetchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { LIST_OF_CATEGORIES } from "./Constants";
import "../../Styles/Category.css";

const Category = () => {
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const { searchTerm, categoryGroup } = useContext(searchContext);
  const { setProductDetails } = useContext(productContext);
  const { data, setData, error, setError, loading, setLoading } =
    useContext(fetchContext);
  const navigate = useNavigate();

  const [filterOpen, setFilterOpen] = useState(false);

  const handleProduct = (item) => {
    setProductDetails(item);
    navigate("/product");
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://dummyjson.com/products?limit=0`);
      setData(res.data.products);
      console.log("API Response:", res.data.products);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  }, [setData, setError, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setSelectedSubCategories([]);
  }, [categoryGroup]);

  const handleCheckboxChange = (subCategory) => {
    setSelectedSubCategories((prevSelected) => {
      if (prevSelected.includes(subCategory)) {
        return prevSelected.filter((item) => item !== subCategory);
      } else {
        return [...prevSelected, subCategory];
      }
    });
  };

  const filteredProducts = useMemo(() => {
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return data.filter(
        (product) =>
          product.tags.some((tag) =>
            tag.toLowerCase().includes(lowerSearchTerm)
          ) || product.title.toLowerCase().includes(lowerSearchTerm)
      );
    } else if (categoryGroup) {
      return data.filter((item) =>
        LIST_OF_CATEGORIES[categoryGroup]?.some(
          (subcategory) =>
            (selectedSubCategories.length === 0 ||
              selectedSubCategories.includes(subcategory.toLowerCase())) &&
            item.category.toLowerCase() === subcategory.toLowerCase()
        )
      );
    } else {
      return data;
    }
  }, [data, searchTerm, categoryGroup, selectedSubCategories]);

  return (
    <div className="category-container">
      {loading ? (
        <p className="category-loading">Loading...</p>
      ) : error ? (
        <p className="category-error">{error}</p>
      ) : (
        <div className="product-container-main">
          {!searchTerm && (
            <>
              <button
                className={`filter-btn ${filterOpen ? "open" : ""}`}
                onClick={() => setFilterOpen((prev) => !prev)}
              >
                Filter
              </button>
              <div
                className={`subcategory-filter-container ${
                  filterOpen ? "open" : ""
                }`}
              >
                <div>
                  <label htmlFor="subcategory">Filter :</label>
                  <br />
                  <div className="subcategory-filter-checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="subcategory"
                        value=""
                        checked={selectedSubCategories.length === 0}
                        onChange={() => setSelectedSubCategories([])}
                      />
                      All
                    </label>
                    {LIST_OF_CATEGORIES[categoryGroup]?.map((subCategory) => (
                      <label key={subCategory}>
                        <input
                          type="checkbox"
                          name="subcategory"
                          value={subCategory}
                          checked={selectedSubCategories.includes(
                            subCategory.toLowerCase()
                          )}
                          onChange={() =>
                            handleCheckboxChange(subCategory.toLowerCase())
                          }
                        />
                        {subCategory}
                      </label>
                    ))}
                  </div>
                </div>
                <div
                  className={`close-filter-btn  ${filterOpen ? "" : "open"}`}
                  onClick={() => setFilterOpen(false)}
                >
                  X
                </div>
              </div>
            </>
          )}
          <div className="product-list-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="product-list-card"
                  onClick={() => handleProduct(item)}
                >
                  <section className="product-list-image">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="product-list-img"
                    />
                  </section>
                  <section className="product-list-details">
                    <span className="product-list-type">
                      {item.brand || item.category}
                    </span>
                    <span className="product-list-title">{item.title}</span>
                    <span className="product-list-price">${item.price}</span>
                  </section>
                </div>
              ))
            ) : (
              <p className="product-list-no-items">No products found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
