import { SearchIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="border-2 p-2 flex items-center justify-between fixed top-0 left-0 w-full z-50 bg-white shadow">
            <div className="flex items-center gap-5">
                <div className="relative w-15 h-15 flex">
                    <Image
                        src="/Burger.png"
                        alt="Product"
                        fill
                        className="object-contain"
                    />
                </div>
                <p className='font-bold text-2xl '>Burger King</p>
            </div>
            <div className="flex w-100 border-1 border-black p-2 rounded-lg justify-between">
                <input type="text" placeholder="Enter Burger Name" />
                <SearchIcon/>
            </div>
            <nav className="flex gap-10">
                <Link href="">Home</Link>
                <Link href="">Custome Burger </Link>
                <Link href="">King Deals</Link>
            </nav>
            <nav className="flex gap-10">
                <Link href=""><ShoppingCart /></Link>
                <Link href="">Login / Register</Link>
            </nav>
        </header>
    );
}