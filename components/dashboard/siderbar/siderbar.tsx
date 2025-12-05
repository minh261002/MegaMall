import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import Logo from "../shared/logo";
import { UserInfo } from "./user-info";

interface SiderBarProps {
  isAdmin: boolean;
}

const SiderBar: React.FC<SiderBarProps> = async ({ isAdmin }) => {
  const user = await currentUser();
  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 bottom-0 left-0">
      <Logo />
      <UserInfo
        user={{
          name: user?.firstName || "User",
          email: user?.emailAddresses[0]?.emailAddress || "user@example.com",
          avatar: user?.imageUrl || "/default-avatar.png",
          role: (user?.publicMetadata as { role?: string })?.role || "USER",
        }}
      />
    </div>
  );
};

export default SiderBar;
