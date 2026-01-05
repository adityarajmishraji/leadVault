"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { apolloClient } from "@/lib/apollo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Mail, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* =======================
   TYPES
======================= */

type User = {
  id: string;
  email: string;
  display_name: string | null;
  email_verified: boolean;
  created_at: string;
};

type GetUsersResponse = {
  users: User[];
};

/* =======================
   GRAPHQL
======================= */

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      display_name
      email_verified
      created_at
    }
  }
`;

/* =======================
   PAGE
======================= */

export default function AdminUsersPage() {
  const { data, loading, error, refetch } = useQuery<GetUsersResponse>(
    GET_USERS,
    { client: apolloClient }
  );

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [creating, setCreating] = useState(false);

  /* =======================
     ACTIONS
  ======================= */

  const handleInviteUser = async () => {
    if (!email) return;

    try {
      setCreating(true);

      const res = await fetch("/api/admin/invite-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();

      toast.success("Invite link sent 📧", {
        description: email,
      });

      setEmail("");
      setOpen(false);
      refetch();
    } catch {
      toast.error("Failed to send invite");
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-red-500">Error loading users</p>;

  const users = data?.users ?? [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Manage Users</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                onClick={handleInviteUser}
                className="w-full"
                disabled={creating}
              >
                {creating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send Invite"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.email}
                </TableCell>
                <TableCell>{user.display_name || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.email_verified ? "default" : "secondary"}
                  >
                    {user.email_verified ? "Verified" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {!user.email_verified && (
                    <Button variant="ghost" size="sm" disabled>
                      <Mail className="mr-2 h-4 w-4" />
                      Waiting
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
