'use client'
import { useEffect, useState } from "react";

export default function Main() {
    const [token, setToken] = useState("");
    const [dishes, setDishes] = useState([]);
    const url = "http://localhost:3005/dish";
    const [currentIndex, setCurrentIndex] = useState(0);

    // Load token once
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Call API only when token is available
    useEffect(() => {
        if (!token) return;
        async function fetchData() {
            try {
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await res.json();
                console.log("API response:", result);

                setDishes(Array.isArray(result.data) ? result.data : []);
            } catch (error) {
                console.error("Error fetching dishes:", error);
                setDishes([]);
            }
        }

        fetchData();
    }, [token]);

    const images = [
        { "name": "image1", 'url': "https://t4.ftcdn.net/jpg/03/53/68/47/https://t4.ftcdn.net/jpg/16/93/85/69/240_F_1693856910_a2n3mGpgcqXDecbosNNiNueJa8f3zvMY.jpg" },
        { "name": "image2", 'url': "https://t4.ftcdn.net/jpg/13/20/67/71/240_F_1320677119_Y7Y1WWPUs12UJFkuhj9fpwka9UqwTlYw.jpg" },
        { "name": "image3", 'url': "https://t4.ftcdn.net/jpg/06/79/41/27/240_F_679412718_MAm1HMGn4c6RXdl7TvqFpB2M1jtlFKlS.jpg" },
        { "name": "image4", 'url': "https://t3.ftcdn.net/jpg/02/66/45/12/240_F_266451208_n0JCWeCeoycka2bUsKiXgxkOuWF004xd.jpg" },
        { "name": "image5", 'url': "https://t3.ftcdn.net/jpg/08/97/53/24/240_F_897532426_YzcdrBmciajfGNK9l8yei7bFasazapB0.jpg" }
    ];

    // Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <section className="mt-20 flex flex-col items-center bg-gray-100 w-full">
            <div className="relative w-full h-100  overflow-hidden rounded-lg shadow-lg">
                <img
                    src={images[currentIndex].url}
                    alt={images[currentIndex].name}
                    className="w-full h-full object-full transition-all duration-500"
                />

                {/* Prev Button */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                    &#10094;
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                    &#10095;
                </button>
            </div>

            {/* Dots */}
            <div className="flex mt-[-15px] space-x-2 mb-4 z-50">
                {images.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-black" : "bg-gray-400"}`}
                    ></span>
                ))}
            </div>


            <section className="w-full mt-14 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-15">
                {dishes.length === 0 ? (
                    <p className="text-gray-600 col-span-full text-center text-lg">
                        No dishes available
                    </p>
                ) : (
                    dishes.map((dish, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl 
                         border border-gray-200 overflow-hidden
                         hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                        >
                            {/* Offer Badge */}
                            {dish.offer && (
                                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 
                                 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    {dish.offer}% OFF
                                </span>
                            )}

                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col gap-2">
                                <h2 className="text-lg font-extrabold text-gray-900 tracking-wide">
                                    {dish.name}
                                </h2>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {dish.description}
                                </p>

                                {dish.ingredients && (
                                    <p className="text-xs text-gray-500 italic">
                                        {dish.ingredients.join(" • ")}
                                    </p>
                                )}

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-black text-red-600">
                                        ₹{dish.price}
                                    </span>

                                    <button
                                        className="px-4 py-2 rounded-full text-sm font-semibold 
                               bg-gradient-to-r from-black to-gray-800 text-white
                               hover:from-gray-800 hover:to-black transition-all"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>

        </section>
    );
}
