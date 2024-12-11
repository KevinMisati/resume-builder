'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { DropdownMenu } from './ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
    const {setTheme} = useTheme()
  return (
    <div
      style={{
        zIndex: "10000",
        background: "green !important",
      }}
      className="relative"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{
            
          }}
          align="end"
          className="z-50 dropdownContainer"
        >
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ThemeToggle