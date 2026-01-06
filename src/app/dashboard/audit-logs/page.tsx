"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* =======================
   TEMP TYPES
======================= */

type AuditLog = {
  id: string;
  action: string;
  created_at: string;
  user: string;
  old_data: any;
  new_data: any;
};

/* =======================
   PAGE
======================= */

export default function AuditLogsPage() {
  // TEMP static data (until Supabase is wired)
  const logs: AuditLog[] = [
    {
      id: "1",
      action: "LOGIN",
      created_at: new Date().toISOString(),
      user: "demo@leadvault.local",
      old_data: null,
      new_data: { method: "telegram" },
    },
  ];

  if (logs.length === 0) {
    return (
      <p className="text-muted-foreground mt-10 text-center">
        No audit logs yet.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Audit Logs</h1>

      <div className="bg-card rounded-xl shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Old Data</TableHead>
              <TableHead>New Data</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {new Date(log.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell className="font-medium">
                  {log.action}
                </TableCell>
                <TableCell className="font-mono text-xs max-w-xs truncate">
                  {JSON.stringify(log.old_data)}
                </TableCell>
                <TableCell className="font-mono text-xs max-w-xs truncate">
                  {JSON.stringify(log.new_data)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        ⚠️ Audit logs are temporarily mocked.  
        This page will be connected to Supabase later.
      </p>
    </div>
  );
}
