import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, Category } from "../../interfaces/interfaces";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./categoriesThunks";

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.categories.findIndex(
            (c) => c.id === action.payload.id
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.categories = state.categories.filter(
            (c) => c.id !== action.payload
          );
        }
      );
  },
});

export default categoriesSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Category, CategoriesState } from "../../interfaces/interfaces";

// const initialState: CategoriesState = {
//   categories: [],
//   loading: false,
//   error: null,
// };

// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://localhost:3001/categories");
//       return response.data as Category[];
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue("Failed to fetch categories");
//     }
//   }
// );

// export const addCategory = createAsyncThunk(
//   "categories/addCategory",
//   async (name: string, thunkAPI) => {
//     try {
//       const response = await axios.post("http://localhost:3001/categories", {
//         name,
//       });
//       return response.data as Category;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue("Failed to add category");
//     }
//   }
// );

// export const updateCategory = createAsyncThunk(
//   "categories/updateCategory",
//   async ({ id, name }: Category, thunkAPI) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:3001/categories/${id}`,
//         { name }
//       );
//       return response.data as Category;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue("Failed to update category");
//     }
//   }
// );

// export const deleteCategory = createAsyncThunk(
//   "categories/deleteCategory",
//   async (id: number, thunkAPI) => {
//     try {
//       await axios.delete(`http://localhost:3001/categories/${id}`);
//       return id;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue("Failed to delete category");
//     }
//   }
// );

// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchCategories.fulfilled,
//         (state, action: PayloadAction<Category[]>) => {
//           state.categories = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(
//         addCategory.fulfilled,
//         (state, action: PayloadAction<Category>) => {
//           state.categories.push(action.payload);
//         }
//       )

//       .addCase(
//         updateCategory.fulfilled,
//         (state, action: PayloadAction<Category>) => {
//           const index = state.categories.findIndex(
//             (c) => c.id === action.payload.id
//           );
//           if (index !== -1) state.categories[index] = action.payload;
//         }
//       )

//       .addCase(
//         deleteCategory.fulfilled,
//         (state, action: PayloadAction<number>) => {
//           state.categories = state.categories.filter(
//             (c) => c.id !== action.payload
//           );
//         }
//       );
//   },
// });

// export default categoriesSlice.reducer;
