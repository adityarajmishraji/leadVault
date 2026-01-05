"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { apolloClient } from "@/lib/apollo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* =======================
   TYPES
======================= */

type AuditUser = {
  email: string | null;
};

type AuditLog = {
  id: string;
  action: string;
  old_data: any;
  new_data: any;
  created_at: string;
  user: AuditUser | null;
};

type GetAuditLogsResponse = {
  audit_logs: AuditLog[];
};

/* =======================
   GRAPHQL
======================= */

const GET_AUDIT_LOGS = gql`
  query GetAuditLogs {
    audit_logs(order_by: { created_at: desc }, limit: 50) {
      id
      action
      old_data
      new_data
      created_at
      user {
        email
      }
    }
  }
`;

/* =======================
   PAGE
======================= */

export default function AuditLogsPage() {
  const { data, loading, error } = useQuery<GetAuditLogsResponse>(
    GET_AUDIT_LOGS,
    { client: apolloClient }
  );

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p>Error loading audit logs</p>;

  const logs = data?.audit_logs ?? [];

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
                <TableCell>{log.user?.email ?? "Unknown"}</TableCell>
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
    </div>
  );
}
