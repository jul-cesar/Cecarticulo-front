import { Button } from "./ui/button"
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react"

interface Article {
  id: number
  title: string
  description: string
  author: string
  date: string
  readTime: string
  category: string
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group relative overflow-hidden bg-gradient-card border border-border/50 rounded-2xl p-8 hover-lift hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative flex flex-col space-y-6">
        {/* Category Badge */}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Tag className="h-4 w-4 mr-2" />
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2 text-balance">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-lg text-pretty">{article.description}</p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">{article.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-full bg-secondary/10">
              <Calendar className="h-4 w-4 text-secondary" />
            </div>
            <span>
              {new Date(article.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-full bg-accent/10">
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <span>{article.readTime} de lectura</span>
          </div>
        </div>

        <div className="pt-4">
          <Button className="group/btn bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 font-semibold px-6 py-3 rounded-xl">
            Leer artículo
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </article>
  )
}
