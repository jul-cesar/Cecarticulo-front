"use client"

import { Button } from "../components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = totalPages > 1 ? getVisiblePages() : [1]

  return (
    <nav className="flex items-center justify-center" aria-label="Paginación">
      <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-2">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 disabled:opacity-50 px-4 py-2 rounded-xl"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Anterior</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-4 py-2 text-muted-foreground font-medium">...</span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={`min-w-[44px] h-10 rounded-xl font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                      : "hover:bg-primary/10 hover:text-primary hover:scale-105"
                  }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 disabled:opacity-50 px-4 py-2 rounded-xl"
        >
          <span className="hidden sm:inline font-medium">Siguiente</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}
