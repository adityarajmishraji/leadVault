'use client'

import { useEffect, useState } from 'react'
import { nhost } from '@/lib/nhost'
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      
      const result = await nhost.graphql.request(`
        query GetTestData {
          test_test1 {
            name
            email
            phone
          }
        }
      `)

      if (result.error) {
        setError(result.error.message)
      } else {
        setData(result.data?.test_test1 || [])
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Loading test data...</span>
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="p-6 border-red-500">
          <h2 className="text-red-600 font-bold mb-2">❌ Error</h2>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm">
            <p className="font-semibold mb-2">Common Fixes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Check Hasura permissions for 'admin' role</li>
              <li>Verify table name is 'test.test1'</li>
              <li>Make sure you're logged in as admin</li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Test Data from Nhost</h1>
        
        {/* Success Message */}
        {/* {data.length > 0 && (
          <div className="bg-green-50 border border-green-500 text-green-700 p-4 rounded mb-6">
            ✅ Successfully fetched {data.length} records from Nhost!
          </div>
        )} */}

        {/* Data Table */}
        {data.length > 0 ? (
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">No data found in test.test1 table</p>
            <p className="text-sm">Go to Hasura Console and insert some test records</p>
          </div>
        )}

        {/* Debug Info */}
        <details className="mt-6">
          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
            🔍 Debug: Raw Response
          </summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-64">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </Card>
    </div>
  )
}