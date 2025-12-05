import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/siderbar/siderbar";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (!user || user?.publicMetadata?.role !== "ADMIN") redirect("/");
  return (
    <div className="w-full h-full">
      <Sidebar isAdmin={true} />
      <div className="w-full ml-[300px]">
        <Header />
        <div className="w-full mt-[75px]">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
