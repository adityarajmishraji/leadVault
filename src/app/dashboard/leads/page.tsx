"use client";

import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useAuth } from "@/lib/hooks/useAuth";
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
} from "@/components/ui/dialog";
import { toast } from "sonner";

/* =======================
   TYPES
======================= */

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  created_at: string;
};

type GetLeadsResponse = {
  leads: Lead[];
};

/* =======================
   GRAPHQL
======================= */

const GET_LEADS = gql`
  query GetLeads {
    leads(order_by: { created_at: desc }) {
      id
      name
      email
      phone
      source
      status
      created_at
    }
  }
`;

const UPDATE_LEAD = gql`
  mutation UpdateLead($id: uuid!, $set: leads_set_input!) {
    update_leads_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
    }
  }
`;

const DELETE_LEAD = gql`
  mutation DeleteLead($id: uuid!) {
    delete_leads_by_pk(id: $id) {
      id
    }
  }
`;

/* =======================
   PAGE
======================= */

export default function LeadsPage() {
  const { isAdmin } = useAuth();

  const { data, loading, error, refetch } = useQuery<GetLeadsResponse>(
    GET_LEADS,
    { client: apolloClient }
  );

  const [updateLead] = useMutation(UPDATE_LEAD, {
    client: apolloClient,
  });

  const [deleteLead] = useMutation(DELETE_LEAD, {
    client: apolloClient,
  });

  const [open, setOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "",
  });

  const leads = data?.leads ?? [];

  /* =======================
     HANDLERS
  ======================= */

  const handleEdit = (lead: Lead) => {
    setCurrentLead(lead);
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      status: lead.status,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!currentLead) return;

    try {
      await updateLead({
        variables: {
          id: currentLead.id,
          set: form,
        },
      });
      toast.success("Lead updated");
      refetch();
      setOpen(false);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm("Delete this lead?")) return;

    await deleteLead({ variables: { id } });
    toast.success("Lead deleted");
    refetch();
  };

  /* =======================
     STATES
  ======================= */

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error loading leads</p>;

  /* =======================
     UI
  ======================= */

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leads</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                {new Date(lead.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(lead)}
                >
                  Edit
                </Button>

                {isAdmin && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(lead.id)}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* EDIT MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <Input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            <Input
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            />
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
