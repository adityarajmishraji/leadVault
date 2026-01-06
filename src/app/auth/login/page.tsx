"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-4xl font-bold">LeadVault</h1>
          <CardTitle>Login via Telegram</CardTitle>
          <CardDescription>
            Secure access using Telegram OTP
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 text-center">
            🔐 Email / password login is disabled.
            <br />
            You will receive a login OTP on Telegram.
          </div>

          <Button className="w-full" disabled>
            Continue with Telegram (coming soon)
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            Please contact admin if you don’t have access.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
