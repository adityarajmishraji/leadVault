"use client";

import { ModeToggle } from "@/components/ui/ModeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu } from "lucide-react";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  // TEMP user (until Supabase + Telegram auth is wired)
  const user = {
    name: "Demo User",
    email: "demo@leadvault.local",
  };

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
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-muted-foreground">
            Temporary session
          </p>
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
                <AvatarFallback>
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              Profile (coming soon)
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="text-destructive">
              Logout (disabled)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
