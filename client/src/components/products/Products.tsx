import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import { fetchProducts } from "../../features/products/productsThunks";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import {
  selectProducts,
  selectProductsLoading,
} from "../../features/products/productsSelectors";
import { selectCategories } from "../../features/categories/categoriesSelectors";
import { Product } from "../../interfaces/interfaces";
import "./Products.css";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === selectedCategory);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setAddedToCartId(product._id || "");
    setTimeout(() => setAddedToCartId(null), 2000);
  };

  return (
    <div className="productsContainer">
      <div className="filterContainer">
        <label htmlFor="categorySelect">Filter by Category: </label>
        <select
          id="categorySelect"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading products...</p>}

      {categories
        .filter(
          (cat) => selectedCategory === "all" || cat._id === selectedCategory
        )
        .map((cat) => {
          const productsInCategory = filteredProducts.filter(
            (p) => p.categoryId === cat._id
          );

          return (
            <div key={cat._id}>
              <h3 className="productsCategoryTitle">{cat.name}</h3>
              <ul className="productsList">
                {productsInCategory.map((product) => (
                  <li key={product._id} className="productsCard">
                    <Link to={`/products/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="productsImage"
                      />
                      <div className="productsText">
                        <h4>{product.name}</h4>
                        <p>${product.price}</p>
                      </div>
                    </Link>
                    <div className="productsBtnGroup">
                      <button
                        className="productsAddToCartBtn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart 🛒
                      </button>
                      {addedToCartId === product._id && (
                        <span className="added-to-cart">✔ Added!</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default Products;

