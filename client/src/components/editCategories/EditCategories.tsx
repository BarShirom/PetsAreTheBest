import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../../features/categories/categoriesSelectors";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../features/categories/categoriesThunks";
import "./EditCategories.css";

const EditCategories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesLoading);
  const error = useAppSelector(selectCategoriesError);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAdd = () => {
    if (!newCategoryName.trim()) return;
    dispatch(addCategory(newCategoryName));
    setNewCategoryName("");
  };

  const handleUpdate = () => {
    if (!editingId || !editingName.trim()) return;
    dispatch(updateCategory({ _id: editingId, name: editingName }));
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = (_id: string) => {
    dispatch(deleteCategory(_id));
  };

  return (
    <div className="editCategoriesContainer">
      <div className="addCategoryForm">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
        />
        <button onClick={handleAdd}>Add Category</button>
      </div>

      {loading && <p>Loading categories...</p>}
      {error && <p className="errorText">Error: {error}</p>}

      <ul className="categoryList">
        {categories.map((cat) => (
          <li key={cat._id}>
            {editingId === cat._id ? (
              <>
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditingId(cat._id);
                      setEditingName(cat.name);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cat._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditCategories;
