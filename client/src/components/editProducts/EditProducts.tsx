import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/productsSelectors";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../features/products/productsThunks";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../features/categories/categoriesSelectors";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import { Product } from "../../interfaces/interfaces";
import "./EditProducts.css";

const EditProducts = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    categoryId: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setNewProduct((prev) => ({
        ...prev,
        categoryId: categories[0]._id,
      }));
    }
  }, [categories]);

  const handleAdd = () => {
    if (
      !newProduct.name ||
      newProduct.price <= 0 ||
      !newProduct.categoryId ||
      !newProduct.image ||
      !newProduct.description
    ) {
      console.warn("Missing required fields:", newProduct);
      return;
    }

    dispatch(addProduct(newProduct));
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      image: "",
      categoryId: categories[0]?._id || "",
    });
  };

  const handleUpdate = () => {
    if (!editingProduct) return;

    const { _id, name, price, description, image, categoryId } = editingProduct;
    dispatch(
      updateProduct({ _id, name, price, description, image, categoryId })
    );

    setEditingId(null);
    setEditingProduct(null);
  };

  const handleDelete = (_id: string) => {
    dispatch(deleteProduct(_id));
  };

  return (
    <div className="editProductsContainer">
      <div className="editProductCardWrapper">
        <div className="editFormGrid">
          <input
            type="text"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <select
            value={newProduct.categoryId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoryId: e.target.value })
            }
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {newProduct.image && (
          <img
            className="editPreviewImage"
            src={newProduct.image}
            alt="Preview"
          />
        )}
        <button className="editAddBtn" onClick={handleAdd}>
          Add Product
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {categoriesLoading && <p>Loading categories...</p>}
      {error && <p className="editErrorText">Error: {error}</p>}

      <ul className="editProductList">
        {products.map((product) => {
          const isEditing = editingId === product._id && editingProduct;
          return (
            <li key={product._id} className="editProductCard">
              {isEditing ? (
                <div className="editFormGrid">
                  <input
                    type="text"
                    value={editingProduct.name ?? ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editingProduct.description ?? ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editingProduct.image ?? ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    value={editingProduct.price ?? 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value),
                      })
                    }
                  />
                  <select
                    value={editingProduct.categoryId ?? ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        categoryId: e.target.value,
                      })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="editBtnGroup">
                    <button className="editPrimaryBtn" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="editCancelBtn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  <p>
                    {categories.find((c) => c._id === product.categoryId)?.name}
                  </p>
                  <img src={product.image} alt={product.name} />
                  <div className="editProductText">
                    <h4>{product.name}</h4>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                  </div>
                  <div className="editBtnGroup">
                    <button
                      className="editPrimaryBtn"
                      onClick={() => {
                        setEditingId(product._id);
                        setEditingProduct({
                          ...product,
                          name: product.name || "",
                          price: product.price || 0,
                          description: product.description || "",
                          image: product.image || "",
                          categoryId: product.categoryId || "",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="editCancelBtn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EditProducts;
