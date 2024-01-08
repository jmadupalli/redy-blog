"use client";

import { useListUsersQuery } from "@/app/_providers/api/userApi";
import Loading from "@/app/user/dash/_components/Loading";
import UserRow from "./UserRow";
import CreateUserDialog from "./CreateUser";

export function UserTable() {
  const users = useListUsersQuery();
  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <div className="grid grid-cols-2 w-full py-3">
          <h2 className="text-left inlne placeholder:mb-4 text-2xl font-semibold">
            All Users
          </h2>
          <div className="text-right">
            <CreateUserDialog />
          </div>
        </div>
        <div className="overflow-x-auto">
          {users.isLoading && <Loading />}
          {!users.isLoading && (
            <table className="min-w-full text-xs">
              <thead className="bg-gray-300">
                <tr className="text-center">
                  <th className="p-3">ID</th>
                  <th className="p-3">First Name</th>
                  <th className="p-3">Last Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="max-h-full overflow-auto">
                {users.data?.length == 0 ? (
                  <tr className="border-b text-center border-opacity-20 border-gray-300 bg-gray-50">
                    <td colSpan={5}>No users found</td>
                  </tr>
                ) : (
                  users.data?.map((user) => (
                    <>
                      <UserRow key={user.id} user={user} />
                    </>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
