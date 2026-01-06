import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and monitor activity
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* INVITE USER – TEMP DISABLED */}
        <Card>
          <CardContent className="p-6">
            <p className="font-medium">Invite User</p>
            <p className="text-sm text-muted-foreground">
              Admin invites will be enabled after Telegram auth.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="font-medium">View Leads</p>
            <p className="text-sm text-muted-foreground">
              Browse all captured leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="font-medium">Audit Logs</p>
            <p className="text-sm text-muted-foreground">
              Track system activity
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
