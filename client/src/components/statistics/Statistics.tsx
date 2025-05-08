import { useState, useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectOrders } from "../../features/orders/ordersSelectors";
import { selectUsers } from "../../features/users/usersSelectors";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import "./Statistics.css"

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
];

const Statistics = () => {
  const orders = useAppSelector(selectOrders);
  const users = useAppSelector(selectUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | "all">("all");

  // 📊 All Products Sold (Pie Chart)
  const totalProductsSold = useMemo(() => {
    const productMap: Record<string, number> = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (productMap[item.name]) {
          productMap[item.name] += item.quantity;
        } else {
          productMap[item.name] = item.quantity;
        }
      });
    });
    return Object.entries(productMap).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // 📈 Products per selected user (Bar Chart)
  const userProductsData = useMemo(() => {
    if (selectedUserId === "all") return [];
    const productMap: Record<string, number> = {};
    const userOrders = orders.filter((o) => o.userId === selectedUserId);
    userOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (productMap[item.name]) {
          productMap[item.name] += item.quantity;
        } else {
          productMap[item.name] = item.quantity;
        }
      });
    });
    return Object.entries(productMap).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  }, [orders, selectedUserId]);

  return (
    <div className="statisticsContainer">
      <div className="chartBlock">
        <h3>Total Products Sold (Pie)</h3>
        <PieChart width={400} height={400} style={{ margin: "0 auto" }}>
          <Pie
            data={totalProductsSold}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {totalProductsSold.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="chartBlock">
        <h3>Products Sold by Customer (Bar)</h3>
        <select
          onChange={(e) =>
            setSelectedUserId(
              e.target.value === "all" ? "all" : e.target.value
            )
          }
          value={selectedUserId}
        >
          <option value="all">Select a customer</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectedUserId !== "all" && userProductsData.length > 0 && (
          <BarChart
            width={500}
            height={300}
            style={{ margin: "0 auto" }}
            data={userProductsData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#82ca9d" />
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default Statistics;
