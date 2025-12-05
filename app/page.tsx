"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <div>
      {isLoaded && isSignedIn ? (
        <SignOutButton>
          <Button>Custom sign out button</Button>
        </SignOutButton>
      ) : (
        "User is not signed in"
      )}
    </div>
  );
};

export default Page;
