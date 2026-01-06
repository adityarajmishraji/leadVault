'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'

interface TestData {
  name: string
  email: string
  phone: string
}

export default function TestPage() {
  const [data, setData] = useState<TestData[]>([])
  const [loading, setLoading] = useState(true)

  // TEMP: fake data to keep page working
  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          name: 'Demo User',
          email: 'demo@example.com',
          phone: '9999999999',
        },
      ])
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Loading test page...</span>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Test Page (Temporary – Nhost Disabled)
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="font-mono">{item.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 text-sm text-gray-500">
          ⚠️ Nhost + GraphQL temporarily removed.  
          This page will be rewired to Supabase later.
        </div>
      </Card>
    </div>
  )
}
