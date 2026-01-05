"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ShieldCheck, Menu } from "lucide-react";
import { nhost } from "@/lib/nhost";

type HeaderProps = {
  onToggleSidebar?: () => void; // ✅ OPTIONAL
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await nhost.auth.signOut();
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div>
          <h2 className="text-xl font-semibold">
            Welcome, {user.displayName || user.email?.split("@")[0]}
          </h2>

          {isAdmin && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3" />
              Admin
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={user.avatarUrl ?? undefined} />
                <AvatarFallback>
                  {user.displayName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
