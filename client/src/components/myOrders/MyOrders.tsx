import { useAppSelector } from "../../app/hooks";
import { selectUserId } from "../../features/auth/authSelectors";
import { selectOrders } from "../../features/orders/ordersSelectors";
import "./MyOrders.css";

const MyOrders = () => {
  const orders = useAppSelector(selectOrders);
  const userId = useAppSelector(selectUserId);

  const userOrders = orders.filter((order) => order.userId === userId);

  return (
    <div className="ordersContainer">
      {userOrders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        userOrders.map((order) => (
          <div key={order._id} className="orderCard">
            <p>
              <strong>Order number:</strong> {order._id}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.date).toLocaleString()}
            </p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  <div>
                    {item.name} - ${item.price * item.quantity}
                  </div>
                  <div> {item.quantity}</div>
                </li>
              ))}
            </ul>
            ${order.totalAmount}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
