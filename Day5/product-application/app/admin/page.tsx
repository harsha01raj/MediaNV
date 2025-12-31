'use client'
import { useEffect, useState } from "react";

export default function Admin() {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [offer, setOffer] = useState("");
    const [error, setError] = useState("");
    const URL = "http://localhost:3005/dish";
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    function handleAdd() {
        if (!newItem.trim()) return;

        setIngredients(prev => [...prev, newItem.trim()]);
        setNewItem("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !price || !category) {
            setError("Please fill all required fields");
            return;
        }
        if (!token) {
            setError("User not authenticated");
            return;
        }
        console.log(token);
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    image,
                    ingredients,
                    price,
                    category,
                    offer
                })
            })
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Adding Dish Fail");
                return;
            }
            console.log('Success:', data);
            localStorage.setItem("token", data.Token);
            setImage("");
            setDescription("");
            setName("");
            setIngredients([]);
            setNewItem("");
            setPrice("");
            setCategory("");
            setOffer("");
            setError("");
            alert("Dish Succuessfully added");
        } catch (error) {
            console.log(error);
        }

        setError("");
        alert("Dish added successfully!");
    }

    return (
        <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 md:p-8">

                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Welcome to Admin Panel
                </h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            value={image}
                            placeholder="https://example.com/burger.jpg"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            placeholder="Describe the dish..."
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Dish Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Dish Name *
                        </label>
                        <input
                            type="text"
                            value={name}
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
                                value={newItem}
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
                        {ingredients.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {ingredients.map((item, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        🍽️ {item}
                                    </span>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Price (₹) *
                        </label>
                        <input
                            type="number"
                            value={price}
                            placeholder="Enter price"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Category *
                        </label>
                        <select
                            value={category}
                            className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select category</option>
                            <option value="starter">Starter</option>
                            <option value="main-course">Main Course</option>
                            <option value="dessert">Dessert</option>
                            <option value="beverage">Beverage</option>
                            <option value="snack">Snack</option>
                        </select>
                    </div>

                    {/* Offer */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Offer
                        </label>
                        <input
                            type="text"
                            value={offer}
                            placeholder="e.g. 20% OFF"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setOffer(e.target.value)}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                        Add Dish
                    </button>

                </form>
            </div>
        </section>
    );
}