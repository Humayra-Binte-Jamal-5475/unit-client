import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0ea5e9", "#38bff8", "#0369a1"];

const AdminOverview = () => {
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const res = await axios.get("https://unit-app-server.vercel.app/admin/overview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading overview</p>;

  const {
    totalRooms,
    availablePercentage,
    unavailablePercentage,
    totalUsers,
    totalMembers,
  } = data;

  const chartData = [
    { name: "Available", value: availablePercentage },
    { name: "Unavailable", value: unavailablePercentage },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p><strong>Total Rooms:</strong> {totalRooms}</p>
          <p><strong>Total Users:</strong> {totalUsers}</p>
          <p><strong>Total Members:</strong> {totalMembers}</p>
        </div>

        <div className="flex justify-center">
          <PieChart width={300} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
