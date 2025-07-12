import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';
import axios from 'axios';

const AvailableFoods = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [searchText, setSearchText] = useState('');
    const [isThreeCol, setIsThreeCol] = useState(true);

    useEffect(() => {
        axios.get('https://food-loop-server-nu.vercel.app/foods', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                const available = res.data.filter(food => food.status === 'available');
                setAllFoods(available);
            });
    }, []);

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredFoods = allFoods
        .filter(food =>
            food.foodName.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
            if (!sortOrder) return 0;
            const dateA = new Date(a.expiredDateTime);
            const dateB = new Date(b.expiredDateTime);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
                Available Foods for Donation
            </h1>

            {/* Search, Sort & Layout Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="input input-bordered w-full"
                />

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={sortOrder}
                    onChange={handleSortChange}
                >
                    <option value="">Sort by Expiration</option>
                    <option value="asc">Earliest Expiry</option>
                    <option value="desc">Latest Expiry</option>
                </select>

                <button onClick={() => setIsThreeCol(!isThreeCol)} className="btn btn-outline bg-green-300">
                    {isThreeCol ? '2-Column Layout' : '3-Column Layout'}
                </button>
            </div>

            {/* Food Cards Grid */}
            <div className={`grid gap-8 ${isThreeCol ? 'lg:grid-cols-3 md:grid-cols-2' : 'md:grid-cols-2 grid-cols-1'}`}>
                {filteredFoods.map(food => (
                    <FoodCard key={food._id} food={food} />
                ))}
            </div>

            {filteredFoods.length === 0 && (
                <p className="text-center mt-8 text-gray-500">No food items match your search.</p>
            )}
        </div>
    );
};

export default AvailableFoods;



