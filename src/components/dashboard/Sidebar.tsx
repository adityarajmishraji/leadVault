"use client";

import Link from "next/link";
import { Home, Users, FileText, LogOut } from "lucide-react";
import { nhost } from "@/lib/nhost";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Sidebar() {
  const { isAdmin } = useAuth();

  const handleLogout = async () => {
    await nhost.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold">LeadVault</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>

        <Link
          href="/dashboard/leads"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
        >
          <Users className="h-5 w-5" />
          Leads
        </Link>
        <Link
          href="/admin/test"
          className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded"
        >
          🧪 Test Data
        </Link>

        <Link
          href="/dashboard/audit-logs"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
        >
          <FileText className="h-5 w-5" />
          Audit Logs
        </Link>

        {isAdmin && (
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
          >
            <Users className="h-5 w-5" />
            Users
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive w-full"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
