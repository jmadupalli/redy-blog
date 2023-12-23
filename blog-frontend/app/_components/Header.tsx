"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_providers/store";
import { UserState, login, logout } from "../_providers/slices/userSlice";
import { useEffect } from "react";

export default function Header() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) dispatch(login(JSON.parse(storedUser) as UserState));
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logout());
    router.push("/user/logout");
  };
  return (
    <header className="p-4 bg-gray-100 text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <Link href="/">
          <span className="w-8 h-8 text-red-600 text-3xl font-serif">
            redy blog
          </span>
        </Link>

        <ul className="items-stretch hidden space-x-3 md:flex"></ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {!userState.firstName && (
            <Link href="/user/login">
              <button className="px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
                Log in
              </button>
            </Link>
          )}
          {userState.firstName && (
            <>
              <Link href="/user/dash">
                <button className="px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
                  Dashboard
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
