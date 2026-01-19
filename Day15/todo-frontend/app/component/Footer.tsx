export function Footer() {
    return (
        <footer className="w-full mt-10 border-t">
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                {/* Left */}
                <span>
                    © {new Date().getFullYear()} Todo App
                </span>

                {/* Center */}
                <span className="italic text-gray-400">
                    Stay focused. Get things done.
                </span>

                {/* Right */}
                <div className="flex gap-4">
                    <a
                        href="#"
                        className="hover:text-gray-700 transition-colors"
                    >
                        Privacy
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-700 transition-colors"
                    >
                        Terms
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-700 transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}