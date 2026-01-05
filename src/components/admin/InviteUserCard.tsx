"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export function InviteUserCard() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 hydration mismatch guard
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleInvite = async () => {
    if (!email) return;

    setLoading(true);

    // 🔒 backend baad me connect hoga
    setTimeout(() => {
      toast.success("Invite sent 📧", {
        description: `Verification link sent to ${email}`,
      });
      setEmail("");
      setLoading(false);
    }, 800);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite New User</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Input
          type="email"
          placeholder="user@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleInvite}
          disabled={loading}
        >
          {loading ? "Sending invite..." : "Send Invite"}
        </Button>
      </CardContent>
    </Card>
  );
}
