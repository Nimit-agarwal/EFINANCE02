"use client"

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveLine } from "@nivo/line"
import { Package2Icon, HomeIcon, DollarSignIcon, CircleMinusIcon, TrendingUpIcon, FileTextIcon, LockIcon, BellIcon, SearchIcon, SendIcon } from 'lucide-react'
import { UserButton } from "@clerk/nextjs"

export function Investments() {
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', message: 'Hello! I\'m your investment advisor. How can I help you today?' }
  ])

  const investmentData = [
    { name: 'Stocks', value: 50000, performance: 12 },
    { name: 'Bonds', value: 30000, performance: 5 },
    { name: 'Real Estate', value: 100000, performance: 8 },
    { name: 'Cryptocurrencies', value: 10000, performance: -15 },
  ]

  const totalInvestment = investmentData.reduce((sum, item) => sum + item.value, 0)

  const performanceData = [
    {
      id: "Investment Performance",
      data: [
        { x: 'Jan', y: 0 },
        { x: 'Feb', y: 2 },
        { x: 'Mar', y: 5 },
        { x: 'Apr', y: 7 },
        { x: 'May', y: 3 },
        { x: 'Jun', y: 8 },
      ]
    }
  ]

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { role: 'user', message: chatMessage }])
      // Here you would typically send the message to a backend API
      // and get a response. For this example, we'll just echo back.
      setTimeout(() => {
        setChatHistory(prev => [...prev, { role: 'bot', message: `You asked: "${chatMessage}". This is where the AI would provide investment advice.` }])
      }, 1000)
      setChatMessage('')
    }
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
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
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <TrendingUpIcon className="h-4 w-4" />
                Investments
              </Link>
              <Link
                href="/reports"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
            <h1 className="font-semibold text-lg md:text-2xl">Investments</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
              </CardContent>
            </Card>
            {investmentData.map((item, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                  <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${item.value.toLocaleString()}</div>
                  <p className={`text-xs ${item.performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.performance >= 0 ? '+' : ''}{item.performance}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Investment Allocation</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsivePie
                  data={investmentData.map(item => ({
                    id: item.name,
                    label: item.name,
                    value: item.value
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
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveLine
                  data={performanceData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 36,
                    legendPosition: 'middle'
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Performance (%)',
                    legendOffset: -40,
                    legendPosition: 'middle'
                  }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Investment Advisor Chatbot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] overflow-y-auto mb-4 p-4 border rounded">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {msg.message}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask for investment advice..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">
                  <SendIcon className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}