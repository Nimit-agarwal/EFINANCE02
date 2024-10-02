"use client"

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ResponsivePie } from "@nivo/pie"
import { FileTextIcon, DownloadIcon, Package2Icon, HomeIcon, DollarSignIcon, CircleMinusIcon, TrendingUpIcon, LockIcon, BellIcon, SearchIcon } from 'lucide-react'
import { UserButton } from "@clerk/nextjs"

export function Reports() {
  const [selectedYear, setSelectedYear] = useState('2023')

  const incomeData = [
    { category: 'Salary', amount: 50000 },
    { category: 'Investments', amount: 10000 },
    { category: 'Freelance', amount: 5000 },
  ]

  const expenseData = [
    { category: 'Housing', amount: 15000 },
    { category: 'Transportation', amount: 5000 },
    { category: 'Food', amount: 6000 },
    { category: 'Utilities', amount: 3000 },
    { category: 'Entertainment', amount: 2000 },
  ]

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0)

  const generatePDF = () => {
    // Implement PDF generation logic here
    console.log('Generating PDF...')
  }

  const generateExcel = () => {
    // Implement Excel generation logic here
    console.log('Generating Excel...')
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span className="">E Finance</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/income"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <DollarSignIcon className="h-4 w-4" />
                Income
              </Link>
              <Link
                href="/expenses"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CircleMinusIcon className="h-4 w-4" />
                Expenses
              </Link>
              <Link
                href="/investments"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <TrendingUpIcon className="h-4 w-4" />
                Investments
              </Link>
              <Link
                href="/reports"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <FileTextIcon className="h-4 w-4" />
                Reports
              </Link>
              <Link
                href="/password-vault"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LockIcon className="h-4 w-4" />
                Password Vault
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserButton />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Financial Reports</h1>
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Annual Income Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <Input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-32"
                  />
                  <div>
                    <Button onClick={generatePDF} className="mr-2">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Generate PDF
                    </Button>
                    <Button onClick={generateExcel}>
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Generate Excel
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold">Total Income</TableCell>
                      <TableCell className="text-right font-bold">${totalIncome.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsivePie
                    data={expenseData.map(item => ({
                      id: item.category,
                      label: item.category,
                      value: item.amount
                    }))}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    legends={[
                      {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemTextColor: '#000'
                            }
                          }
                        ]
                      }
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}