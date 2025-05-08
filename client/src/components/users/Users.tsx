import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUsers } from "../../features/users/usersSelectors";
import { selectOrders } from "../../features/orders/ordersSelectors";
import { fetchUsers } from "../../features/users/usersThunks";
import "./Users.css";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const allOrders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="usersContainer">
      {users.map((user) => {
        const userOrders = allOrders.filter(
          (order) => order.userId === user._id
        );

        return (
          <div key={user._id} className="userCard">
            <h3>
              Name: {user.name} <br />
              Email: {user.email}
            </h3>

            {userOrders.length > 0 && (
              <ul>
                {userOrders.map((order) => (
                  <li key={order._id}>
                    Order number: {order._id}
                    <br /> Date: {new Date(order.date).toLocaleString()}
                    <br />${order.totalAmount}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Users;
