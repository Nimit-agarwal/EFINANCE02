"use client"

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Package2Icon, HomeIcon, DollarSignIcon, CircleMinusIcon, TrendingUpIcon, FileTextIcon, LockIcon, BellIcon, SearchIcon, EyeIcon, EyeOffIcon, CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { UserButton } from "@clerk/nextjs"

export function PasswordVault() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)

  const accounts = [
    { id: 1, name: 'Google', username: 'user@example.com', password: 'password123', url: 'https://google.com' },
    { id: 2, name: 'Facebook', username: 'user@example.com', password: 'fbpassword456', url: 'https://facebook.com' },
    { id: 3, name: 'Twitter', username: 'user@example.com', password: 'twitterpwd789', url: 'https://twitter.com' },
    { id: 4, name: 'LinkedIn', username: 'user@example.com', password: 'linkedIn321', url: 'https://linkedin.com' },
    { id: 5, name: 'Amazon', username: 'user@example.com', password: 'amazonshop987', url: 'https://amazon.com' },
  ]

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
    }, (err) => {
      console.error('Could not copy text: ', err)
    })
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
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
                  placeholder="Search accounts..."
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
          <UserButton />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg md:text-2xl">Password Vault</h1>
            <Button onClick={() => setShowPasswords(!showPasswords)}>
              {showPasswords ? <EyeOffIcon className="mr-2 h-4 w-4" /> : <EyeIcon className="mr-2 h-4 w-4" />}
              {showPasswords ? 'Hide Passwords' : 'Show Passwords'}
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Saved Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.username}</TableCell>
                      <TableCell>
                        {showPasswords ? account.password : '••••••••'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(account.password)}
                          >
                            <CopyIcon className="h-4 w-4" />
                            <span className="sr-only">Copy password</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(account.url, '_blank')}
                          >
                            <ExternalLinkIcon className="h-4 w-4" />
                            <span className="sr-only">Open website</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}