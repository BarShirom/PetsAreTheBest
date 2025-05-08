import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCartItems,
  selectCartTotal,
} from "../../features/cart/cartSelectors";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
import { addOrder } from "../../features/orders/ordersThunks";
import { selectUserId } from "../../features/auth/authSelectors";
import { Order } from "../../interfaces/interfaces";
import "./Cart.css";

const Cart = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  const handleOrder = () => {
    if (cartItems.length === 0) return;

    const order = {
      userId: userId!,
      items: cartItems,
      totalAmount: total,
      date: new Date().toISOString(),
    } as Omit<Order, "_id">;

    dispatch(addOrder(order));
    dispatch(clearCart());
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 2000);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cartContainer">
      <h2 className="cartTitle">🛒</h2>

      {cartItems.length === 0 ? (
        <p className="emptyCart">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cartItem">
              <div className="itemInfo">
                <span className="itemName">{item.name}</span>
                <span className="itemPrice">${item.price * item.quantity}</span>
              </div>
              <div className="quantityControls">
                <div className="quantityBtn">
                  <button onClick={() => dispatch(increaseQuantity(item._id))}>
                    +
                  </button>
                  <br />
                  <button onClick={() => dispatch(decreaseQuantity(item._id))}>
                    -
                  </button>
                  <br />
                </div>

                <span className="quantityValue">{item.quantity}</span>
              </div>
            </div>
          ))}

          <div className="totalOrderClear">
            <div className="totalAndOrder">
              <h3 className="cartTotal">Total: ${total}</h3>
              <button className="placeOrderBtn" onClick={handleOrder}>
                Order
              </button>
            </div>
            <button className="clearBtn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}

      {orderPlaced && (
        <span className="orderPlaced">✅ Order placed successfully!</span>
      )}
    </div>
  );
};

export default Cart;
