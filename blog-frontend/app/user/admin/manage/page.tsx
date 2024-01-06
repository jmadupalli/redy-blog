import { UserTable } from "./_components/UserTable";
export default function ManageUsers() {
  return (
    <>
      <div className="container text-center w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <h2>Manage Users</h2>
      </div>
      <div className="container text-center mt-2 w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <UserTable />
      </div>
    </>
  );
}
