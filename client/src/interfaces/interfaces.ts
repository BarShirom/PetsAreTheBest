// Authentication
export interface TokenPayload {
  email: string;
  sub: string; 
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
}

// Redux Auth State
export interface AuthState {
  token: string | null;
  role: string | null;
  name: string | null;
  email: string | null;
  sub: string | null;
}

// Products
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: string; 
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

// Categories
export interface Category {
  _id: string;
  name: string;
}

// Cart
export interface CartState {
  items: ProductWithQuantity[];
}

// Orders
export interface Order {
  _id: string;
  userId: string;
  items: ProductWithQuantity[];
  totalAmount: number;
  date: string;
}

export interface OrdersState {
  orders: Order[];
}

// For My Account Edit
export interface EditUser {
  name: string;
  email: string;
  password?: string;
}

// Redux states
export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

