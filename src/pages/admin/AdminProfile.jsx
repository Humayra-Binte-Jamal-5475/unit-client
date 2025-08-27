import { getAuth } from "firebase/auth";

const AdminProfile = () => {
  const { currentUser } = getAuth();

  // You can also fetch from backend if you store phone/address there
  const phone = currentUser?.phoneNumber || "Not set";
  const address = currentUser?.address || "Not set"; // custom field from DB if available

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow">
      <div className="text-center">
        <img
          src={currentUser?.photoURL || "/default-avatar.png"}
          alt="Admin"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">
          {currentUser?.displayName || "Admin User"}
        </h2>
        <p className="text-gray-500">{currentUser?.email}</p>
      </div>

      <div className="mt-6 space-y-2 text-left">
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {address}</p>
      </div>
    </div>
  );
};

export default AdminProfile;



