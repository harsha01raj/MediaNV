export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Burger<span className="text-red-500">King</span>
                        </h2>
                        <p className="text-sm text-gray-400">
                            Flame-grilled burgers made your way. Fresh ingredients, bold
                            flavors, and happiness in every bite.
                        </p>
                    </div>

                    {/* Menu */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Menu
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-red-500 cursor-pointer">Burgers</li>
                            <li className="hover:text-red-500 cursor-pointer">Custom Burger</li>
                            <li className="hover:text-red-500 cursor-pointer">Sides</li>
                            <li className="hover:text-red-500 cursor-pointer">Drinks</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Company
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-red-500 cursor-pointer">About Us</li>
                            <li className="hover:text-red-500 cursor-pointer">Careers</li>
                            <li className="hover:text-red-500 cursor-pointer">Franchise</li>
                            <li className="hover:text-red-500 cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Stay Connected
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                            Get offers & updates straight to your inbox.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none"
                            />
                            <button className="bg-red-500 px-4 py-2 rounded-r-lg hover:bg-red-600 transition text-white">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Copyright */}
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} BurgerKing. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <span className="hover:text-red-500 cursor-pointer">Facebook</span>
                        <span className="hover:text-red-500 cursor-pointer">Instagram</span>
                        <span className="hover:text-red-500 cursor-pointer">Twitter</span>
                    </div>

                </div>

            </div>
        </footer>
    );
}