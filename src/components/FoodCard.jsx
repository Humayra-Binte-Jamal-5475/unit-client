import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
    const {
        _id,
        foodName,
        foodImage,
        foodQuantity,
        pickupLocation,       
        expiredDateTime,
        donorName,
        status
    } = food;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md mx-auto">
            <img src={foodImage} alt={foodName} className="h-48 w-full object-cover" />
            <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold text-green-600">{foodName}</h2>
                <p className="text-sm text-gray-500">Donor: {donorName}</p>
                <p className="text-gray-600 text-sm">Quantity: {foodQuantity}</p>
                <p className="text-gray-600 text-sm">Pickup Location: {pickupLocation}</p>
                <p className="text-gray-600 text-sm">Expires: {expiredDateTime}</p>
                <p className={`text-sm font-medium ${status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {status}
                </p>
                <div className="pt-3">
                    <Link to={`/foods/${_id}`}>
                        <button className="btn btn-success">See More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
