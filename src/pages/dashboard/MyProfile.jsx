import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../Loading";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};


const fetchAgreements = async () => {
  const res = await axios.get(
    "https://unit-app-server.vercel.app/member/agreements",
    { headers: getAuthHeaders() }
  );
  return res.data;
};

const MyProfile = () => {
  const { user, isLoading: userLoading } = useContext(AuthContext);

  const { data: agreements, isLoading: agreementsLoading, error } = useQuery({
    queryKey: ["memberAgreements"],
    queryFn: fetchAgreements,
  });

  if (userLoading || agreementsLoading) return <Loading />;

  if (!user) return <p className="text-center mt-6">User not found.</p>;
  if (error) return <p className="text-center mt-6 text-red-500">Failed to load agreement data</p>;

  // Assuming the latest active agreement
  const agreement = agreements && agreements.length > 0 ? agreements[0] : null;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-6">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user?.photoURL || "/placeholder.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user?.displayName || "No Name"}</h2>
        <p className="text-gray-600 dark:text-gray-300">{user?.email || "No Email"}</p>
        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm font-semibold">
          {user?.role || "User"}
        </span>
      </div>

      <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          <strong>Agreement Date:</strong> {agreement?.createdAt ? new Date(agreement.createdAt).toLocaleDateString() : "Not Available"}
        </p>
        <p>
          <strong>Apartment Info:</strong>{" "}
          {agreement
            ? `Floor: ${agreement.floor}, Block: ${agreement.block}, Room No: ${agreement.apartmentNo}`
            : "Not Assigned"}
        </p>
        <p>
          <strong>Phone:</strong> {user?.phone || "Not Provided"}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;


