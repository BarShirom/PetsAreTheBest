import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyOrders from "./components/myOrders/MyOrders";
import Products from "./components/products/Products";
import UsersRoute from "./components/routes/UsersRoute";
import UsersLayout from "./components/usersLayout/UsersLayout";
import MyAccount from "./components/myAccount/MyAccount";
import AdminRoute from "./components/routes/AdminRoute";
import AdminLayout from "./components/adminLayout/AdminLayout";
import Statistics from "./components/statistics/Statistics";
import Categories from "./components/editCategories/EditCategories";
import Users from "./components/users/Users";
import AuthLayout from "./components/auth/AuthLayout";
import ProductDetails from "./components/productDetails/ProductDetails";
import Cart from "./components/cart/Cart";
import EditProducts from "./components/editProducts/EditProducts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<UsersRoute />}>
          <Route element={<UsersLayout />}>
            <Route path="/myAccount" element={<MyAccount />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myOrders" element={<MyOrders />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/editCategories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/editProducts" element={<EditProducts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
