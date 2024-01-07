"use client";
import { useGetUserByIdQuery } from "@/app/_providers/api/userApi";
import EditUserForm from "@/app/user/dash/_components/EditUserForm";
import Loading from "@/app/user/dash/_components/Loading";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = useGetUserByIdQuery(parseInt(params.id));
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !user ? (
        <div className="text-center">Something went wrong</div>
      ) : (
        <EditUserForm user={user} adminEdit={true} />
      )}
    </>
  );
}
