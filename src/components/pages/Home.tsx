"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getArticles,
  getProgress,
  searchArticles,
} from "../../services/ArticlesService";
import { ArticleCard } from "../article-card";
import { LoadingSpinner } from "../loading-spinner";
import { Pagination } from "../pagination";
import { SearchBar } from "../search-bar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const params = new URLSearchParams();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    params.set("page", page.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  };
  const progress = useQuery({
    queryKey: ["progress"], 
    queryFn: () => getProgress(), 
    refetchInterval: 1000, // Refetch every second
    enabled: !!searchQuery, 
  });

  const tiempoSegundos = progress.data?.data.tiempoSegundos || 0;

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["articles", currentPage],
    queryFn: () => getArticles(currentPage, 20), // <--- aquí el 20 es la cantidad de artículos por página
    enabled: currentPage > 0,
  });
  const mutation = useMutation({
    mutationFn: () => searchArticles(searchQuery, 20), // <--- aquí el 20 es la cantidad máxima de resultados
    onSuccess: (data) => {
      setCurrentPage(1);
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    mutation.mutate();
  };
  const articles = data?.data.content || [];
  const pagination = data?.data.page || {
    size: 0,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  };

  useEffect(() => {
    refetch();
  }, [tiempoSegundos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <header className="border-b border-border/50 bg-gradient-to-r from-card/80 to-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Cecarticulo
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Encuentra los mejores artículos sobre cualquier tema. Explora.
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
                {/* Results Info */}

                {mutation.isPending ? (
                  <div className="flex justify-center items-center py-10">
                    <Loader2 className="animate-spin h-4 w-4 text-primary" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-10">
                    <p>{mutation.data?.data}</p>
                  </div>
                )}

                {searchQuery &&
                  progress.data &&
                  progress.data.data.total &&
                  progress.data.data.total > 0 && (
                    <div>
                      <div className="mb-6 text-center">
                        <p className="text-muted-foreground text-lg">
                          Progreso:{" "}
                          <span className="font-semibold text-primary">
                            {progress.data.data.procesados} /{" "}
                            {progress.data.data.total}
                          </span>{" "}
                        </p>
                      </div>
                      <div className="flex justify-center mb-6 items-center gap-4">
                        Tiempo:
                        {progress.data.data.tiempoSegundos <= 0 ? (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-accent rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        ) : (
                          <span className="font-semibold text-secondary">
                            {progress.data.data.tiempoSegundos} segundos
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <p className="text-muted-foreground text-lg">
                    {searchQuery ? (
                      <>
                        Mostrando{" "}
                        <span className="font-semibold text-primary">
                          {articles?.length}
                        </span>{" "}
                        resultado{articles.length !== 1 ? "s" : ""} para{" "}
                        <span className="font-semibold text-secondary">
                          "{searchQuery}"
                        </span>
                      </>
                    ) : (
                      <>
                        Mostrando{" "}
                        <span className="font-semibold text-primary">
                          {articles.length}
                        </span>{" "}
                        artículo
                        {articles.length !== 1 ? "s" : ""}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Articles Grid */}
              {articles.length > 0 ? (
                <div className="grid gap-8 mb-12">
                  {articles.map((article, index) => (
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
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      No se encontraron artículos
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Intenta con otros términos de búsqueda
                    </p>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    currentPage={pagination.number}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-border/50 bg-gradient-to-r from-card/80 to-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg">© 2024 Cecarticulo.</p>
        </div>
      </footer>
    </div>
  );
}
