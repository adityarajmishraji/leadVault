"use client";

import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";

import { getAllUsers, inviteUser, User } from "@/modules/users/user.service";


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


export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegramId, setTelegramId] = useState("");

  async function fetchUsers() {
  try {
    const data = await getAllUsers();
    setUsers(data);
  } catch (err: any) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    fetchUsers();
  }, []);

async function handleInvite() {
  if (!name || !telegramId) {
    alert("Name and Telegram ID are required");
    return;
  }

  try {
    await inviteUser({
      name,
      email,
      telegram_user_id: Number(telegramId),
    });

    setName("");
    setEmail("");
    setTelegramId("");

    fetchUsers();
  } catch (err: any) {
    alert(err.message);
  }
}


  if (loading) return <p>Loading…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Users</h1>

      {/* INVITE FORM */}
      <div className="flex gap-4 items-end">
        <Input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Telegram User ID"
          value={telegramId}
          onChange={(e) => setTelegramId(e.target.value)}
        />
        <Button onClick={handleInvite}>Invite</Button>
      </div>

      {/* USERS TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Telegram ID</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email ?? "-"}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>{u.telegram_user_id}</TableCell>
              <TableCell>
                {u.is_active ? "✅ Active" : "❌ Disabled"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
