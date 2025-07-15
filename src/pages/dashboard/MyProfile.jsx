import { getAuth } from "firebase/auth";

const MyProfile = () => {
  const user = getAuth().currentUser;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-2">
        <img src={user?.photoURL || "/placeholder.jpg"} alt="Profile" className="w-24 rounded-full" />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Agreement Date:</strong> None</p>
        <p><strong>Apartment Info:</strong> Floor: None, Block: None, Room No: None</p>
      </div>
    </div>
  );
};

export default MyProfile;
