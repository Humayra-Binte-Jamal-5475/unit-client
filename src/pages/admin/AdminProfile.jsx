/* src/pages/admin/AdminProfile.jsx */
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <p><strong>Name:</strong> {user?.firebaseUser?.displayName}</p>
      <p><strong>Email:</strong> {user?.firebaseUser?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
    </div>
  );
};

export default AdminProfile;
