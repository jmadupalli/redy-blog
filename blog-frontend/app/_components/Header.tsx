"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_providers/store";
import { UserState, login, logout } from "../_providers/slices/userSlice";
import { useEffect } from "react";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "./ui/dropdown-menu";
import { SiteSettings } from "../_providers/api/userApi";

export default function Header({
  settings,
}: {
  settings: SiteSettings | undefined;
}) {
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
      <div className="container flex items-center justify-between h-16 mx-auto">
        <Link href="/">
          <span className="w-8 h-8 text-red-600 text-3xl font-serif">
            {settings?.siteName ?? "redy blog"}
          </span>
        </Link>

        <ul className="items-stretch hidden space-x-3 md:flex"></ul>
        <div className="items-center flex-shrink-0  flex">
          {settings && settings.showLogin && !userState.firstName && (
            <Link href="/user/login">
              <button className="px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
                Log in
              </button>
            </Link>
          )}
          {userState.firstName && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
                  Menu &#8964;
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuLabel className="text-xs">
                    Signed in as:
                    <br />
                    {userState.firstName} {userState.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/user/dash">
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/user/settings">
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                      Settings
                    </DropdownMenuItem>
                  </Link>

                  {userState.role == "ROLE_ADMIN" && (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Admin</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-white">
                          <Link href="/user/admin/site">
                            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                              Site Settings
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/user/admin/manage">
                            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                              Manage Users
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  )}

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
