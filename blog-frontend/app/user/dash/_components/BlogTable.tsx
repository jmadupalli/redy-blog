"use client";

import Link from "next/link";

export function BlogTable() {
  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <div className="grid grid-cols-2 w-full py-3">
          <h2 className="text-left inlne placeholder:mb-4 text-2xl font-semibold">
            Your blogs
          </h2>
          <div className="text-right">
            <Link href="dash/create">
              <button className="inline px-3 py-1 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
                Create Post
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-300">
              <tr className="text-center">
                <th className="p-3">#</th>
                <th className="p-3">Blog Title</th>
                <th className="p-3">Created At</th>
                <th className="p-3">Updated At</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="max-h-full overflow-auto">
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>97412378923</p>
                </td>
                <td className="p-3">
                  <p>Microsoft Corporation</p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>
                  <p className="text-gray-600">Friday</p>
                </td>
                <td className="p-3">
                  <p>01 Feb 2022</p>
                  <p className="text-gray-600">Tuesday</p>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-red-600 text-gray-50">
                    <span>Pending</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">
                  <p>97412378923</p>
                </td>
                <td className="p-3">
                  <p>Microsoft Corporation</p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>
                  <p className="text-gray-600">Friday</p>
                </td>
                <td className="p-3">
                  <p>01 Feb 2022</p>
                  <p className="text-gray-600">Tuesday</p>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-red-600 text-gray-50">
                    <span>Pending</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
