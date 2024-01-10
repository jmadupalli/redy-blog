"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  return (
    <footer className="px-4 divide-y bg-gray-100 text-gray-800">
      <div></div>
      <div className="py-6 text-sm text-center text-gray-600">
        {(path.startsWith("/user") || path == "/onboarding") && (
          <>
            <a href="https://jayanthm.in" target="_blank">
              Made with &hearts;
            </a>{" "}
          </>
        )}
        © {new Date().getFullYear()} All rights reserved{" "}
      </div>
    </footer>
  );
}
