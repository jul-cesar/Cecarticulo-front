"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Search, X, Sparkles } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur opacity-30"></div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center search-glow rounded-xl bg-gradient-card border border-border/50 backdrop-blur-sm">
          <div className="absolute left-6 text-primary/70">
            <Search className="h-6 w-6" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos por título, descripción o categoría..."
            className="w-full pl-16 pr-32 py-6 text-lg bg-transparent border-0 rounded-xl focus:outline-none focus:ring-0 placeholder:text-muted-foreground/70 text-foreground font-medium"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 text-muted-foreground/70 hover:text-foreground transition-all duration-200 hover:scale-110"
              title="Limpiar búsqueda"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          <Button
            type="submit"
            className="absolute right-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            Buscar
          </Button>
        </div>
      </form>
    </div>
  )
}
