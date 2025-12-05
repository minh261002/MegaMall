import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ThemeToggle } from "../shared/theme-toggle";

const Header = () => {
  return (
    <div className="fixed z-20 md:left-[300px] left-0 top-0 right-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b">
      <div className="flex items-center gap-2 ml-auto">
        <UserButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
