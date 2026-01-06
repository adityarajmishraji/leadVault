"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-4xl font-bold">LeadVault</h1>
          <CardTitle>Signup Disabled</CardTitle>
          <CardDescription>
            Accounts are created by admin only.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 text-center">
            🚫 Email / password signup is disabled.
            <br />
            You will receive access via Telegram login.
          </div>

          <Button className="w-full" asChild>
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
