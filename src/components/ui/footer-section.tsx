"use client"

import * as React from "react"
import { Button } from "./button"
import { Input } from "./Input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { Github, Linkedin, Send, Twitter, Moon, Sun } from "lucide-react"

function FooterSection() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t border-indigo-500/20 bg-bg-secondary text-text-primary transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">DevLabs</h2>
            </div>
            <p className="mb-6 text-text-secondary">
              Showcase your hackathon journey and build stunning portfolios that stand out to recruiters.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 bg-bg-tertiary border-indigo-500/20 text-text-primary placeholder:text-text-tertiary focus:border-indigo-500"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white transition-transform hover:scale-105 p-0"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Home
              </a>
              <a href="/portfolio/demo" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Demo Portfolio
              </a>
              <a href="/signup" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Get Started
              </a>
              <a href="/login" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Sign In
              </a>
              <a href="#features" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Features
              </a>
            </nav>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Resources</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Documentation
              </a>
              <a href="#" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Templates
              </a>
              <a href="#" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Help Center
              </a>
              <a href="#" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Community
              </a>
              <a href="#" className="block transition-colors hover:text-indigo-400 text-text-secondary">
                Blog
              </a>
            </nav>
          </div>
          
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Connect</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="h-10 w-10 rounded-full border-indigo-500/20 bg-bg-tertiary hover:bg-indigo-500/10 hover:border-indigo-500/40 p-0">
                      <Github className="h-4 w-4 text-text-secondary" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="h-10 w-10 rounded-full border-indigo-500/20 bg-bg-tertiary hover:bg-indigo-500/10 hover:border-indigo-500/40 p-0">
                      <Twitter className="h-4 w-4 text-text-secondary" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="h-10 w-10 rounded-full border-indigo-500/20 bg-bg-tertiary hover:bg-indigo-500/10 hover:border-indigo-500/40 p-0">
                      <Linkedin className="h-4 w-4 text-text-secondary" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="secondary" 
                      className="h-10 w-10 rounded-full border-indigo-500/20 bg-bg-tertiary hover:bg-indigo-500/10 hover:border-indigo-500/40 p-0"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                      {isDarkMode ? (
                        <Sun className="h-4 w-4 text-text-secondary" />
                      ) : (
                        <Moon className="h-4 w-4 text-text-secondary" />
                      )}
                      <span className="sr-only">Toggle dark mode</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-indigo-500/20 pt-8 text-center md:flex-row">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <p className="text-sm text-text-tertiary">
              © 2024 DevLabs. Built for developers, by developers.
            </p>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-indigo-400 text-text-secondary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-indigo-400 text-text-secondary">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-indigo-400 text-text-secondary">
              Support
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
export { FooterSection }