import { supabase } from "@/lib/supabase";

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  status: string | null;
  telegram_user_id: number;
  is_active: boolean;
  created_at: string;
};

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function inviteUser(payload: {
  name: string;
  email?: string;
  telegram_user_id: number;
}) {
  const { error } = await supabase.from("users").insert({
    name: payload.name,
    email: payload.email,
    telegram_user_id: payload.telegram_user_id,
    role: "employee",
    status: "active",
    is_active: true,
  });

  if (error) {
    throw new Error(error.message);
  }
}
