"use client";

import { useState } from "react";

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

/* =======================
   TEMP TYPES
======================= */

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
};

/* =======================
   PAGE
======================= */

export default function LeadsPage() {
  // TEMP static data
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "Demo Lead",
      email: "demo@company.com",
      phone: "9999999999",
      status: "new",
      created_at: new Date().toISOString(),
    },
  ]);

  const [open, setOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  /* =======================
     HANDLERS (TEMP)
  ======================= */

  const handleEdit = (lead: Lead) => {
    setCurrentLead(lead);
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
    });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!currentLead) return;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === currentLead.id ? { ...l, ...form } : l
      )
    );

    setOpen(false);
  };

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
              <TableCell>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(lead)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* EDIT MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead (Temporary)</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Name"
            />
            <Input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email"
            />
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Phone"
            />
            <Input
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              placeholder="Status"
            />

            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <p className="text-xs text-muted-foreground">
        ⚠️ Leads are mocked.  
        Supabase integration will replace this.
      </p>
    </div>
  );
}
