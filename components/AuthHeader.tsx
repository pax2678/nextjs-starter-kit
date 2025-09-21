"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";

export function AuthHeader() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <header className="relative z-[100] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Your App</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <AuthLoading>
            <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
          </AuthLoading>
          
          <Authenticated>
          <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}!
              </span>
              <div className="relative z-[9999]">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </Authenticated>
          
          <Unauthenticated>
            <div className="flex items-center space-x-2">
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </div>
          </Unauthenticated>
        </div>
      </div>
    </header>
  );
}