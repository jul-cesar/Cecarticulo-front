"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "./components/search-bar"
import { ArticleCard } from "./components/article-card"
import { Pagination } from "./components/pagination"
import { LoadingSpinner } from "./components/loading-spinner"

// Mock data for demonstration
const mockArticles = [
  {
    id: 1,
    title: "Introducción a React y TypeScript",
    description: "Aprende los fundamentos de React con TypeScript para crear aplicaciones web modernas y escalables.",
    author: "María García",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Desarrollo Web",
  },
  {
    id: 2,
    title: "Mejores prácticas en diseño UX/UI",
    description: "Descubre las técnicas más efectivas para crear interfaces de usuario intuitivas y atractivas.",
    author: "Carlos López",
    date: "2024-01-12",
    readTime: "8 min",
    category: "Diseño",
  },
  {
    id: 3,
    title: "Optimización de rendimiento en aplicaciones web",
    description: "Técnicas avanzadas para mejorar la velocidad y eficiencia de tus aplicaciones web.",
    author: "Ana Martínez",
    date: "2024-01-10",
    readTime: "12 min",
    category: "Performance",
  },
  {
    id: 4,
    title: "Guía completa de CSS Grid y Flexbox",
    description: "Domina los sistemas de layout más poderosos de CSS para crear diseños responsivos.",
    author: "Pedro Rodríguez",
    date: "2024-01-08",
    readTime: "10 min",
    category: "CSS",
  },
  {
    id: 5,
    title: "Introducción a la programación funcional",
    description: "Explora los conceptos fundamentales de la programación funcional y sus beneficios.",
    author: "Laura Sánchez",
    date: "2024-01-05",
    readTime: "15 min",
    category: "Programación",
  },
  {
    id: 6,
    title: "Seguridad en aplicaciones web modernas",
    description: "Aprende a proteger tus aplicaciones web contra las amenazas más comunes.",
    author: "Miguel Torres",
    date: "2024-01-03",
    readTime: "7 min",
    category: "Seguridad",
  },
]

const ARTICLES_PER_PAGE = 3

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArticles, setFilteredArticles] = useState(mockArticles)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate search with loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredArticles(mockArticles)
      } else {
        const filtered = mockArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setFilteredArticles(filtered)
      }
      setCurrentPage(1)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <header className="border-b border-border/50 bg-gradient-to-r from-card/80 to-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Buscador de Artículos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Encuentra los mejores artículos sobre desarrollo web, diseño y tecnología
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results Section */}
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <p className="text-muted-foreground text-lg">
                    {searchQuery ? (
                      <>
                        Mostrando <span className="font-semibold text-primary">{filteredArticles.length}</span>{" "}
                        resultado{filteredArticles.length !== 1 ? "s" : ""} para{" "}
                        <span className="font-semibold text-secondary">"{searchQuery}"</span>
                      </>
                    ) : (
                      <>
                        Mostrando <span className="font-semibold text-primary">{filteredArticles.length}</span> artículo
                        {filteredArticles.length !== 1 ? "s" : ""}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Articles Grid */}
              {currentArticles.length > 0 ? (
                <div className="grid gap-8 mb-12">
                  {currentArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-12 border border-border/50 max-w-md mx-auto">
                    <div className="text-8xl mb-6 opacity-50">📝</div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">No se encontraron artículos</h3>
                    <p className="text-muted-foreground text-lg">Intenta con otros términos de búsqueda</p>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-border/50 bg-gradient-to-r from-card/80 to-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg">© 2024 Buscador de Artículos. Creado con React y TypeScript.</p>
        </div>
      </footer>
    </div>
  )
}
