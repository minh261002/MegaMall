import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user?.publicMetadata || user?.publicMetadata.role === "USER")
    redirect("/");

  if (user.publicMetadata.role === "ADMIN") redirect("/dashboard/admin");
  if (user.publicMetadata.role === "SELLER") redirect("/dashboard/seller");
};

export default DashboardPage;
