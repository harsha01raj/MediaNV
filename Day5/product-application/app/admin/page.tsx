'use client'
import { useState } from "react";

export default function Admin() {
    const [Url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [offer, setOffer] = useState("");
    const [newItem, setNewItem] = useState("");
    const [error, setError] = useState("");


    function handleAdd() {
        if (newItem.trim()) {
            setIngredients(prev => [...prev, newItem.trim()]);
            setNewItem("");
        }
    }
    return (
        <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 md:p-8">

                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Welcome to Admin Panel
                </h1>

                <form className="space-y-5">

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            placeholder="https://example.com/burger.jpg"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            placeholder="Describe the dish..."
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Dish Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Dish Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter dish name"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Ingredients
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add ingredient"
                                className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                onChange={(e) => setNewItem(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                onClick={handleAdd}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                    </div>

                    {/* Calories */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Category
                        </label>
                        <select
                            className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            <option value="starter">Starter</option>
                            <option value="main-course">Main Course</option>
                            <option value="dessert">Dessert</option>
                            <option value="beverage">Beverage</option>
                            <option value="snack">Snack</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                        Offer
                    </button>

                </form>
            </div>
        </section>
    );
}