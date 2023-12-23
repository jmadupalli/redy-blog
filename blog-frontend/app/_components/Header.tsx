"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 bg-gray-100 text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <Link href="/">
          <span className="w-8 h-8 text-red-600 text-xl font-serif">
            redy blog
          </span>
        </Link>

        <ul className="items-stretch hidden space-x-3 md:flex"></ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Link href="/user/login">
            <button className="px-5 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
              Log in
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
