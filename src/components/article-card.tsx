import { ArrowRight, Calendar, KeyIcon, Tag, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { imageSourceFromUnknown } from "../lib/utils";
import type { Article } from "../models/Article";
import { Button } from "./ui/button";

import { useNavigate } from "react-router-dom";

export function ArticleCard({ article }: { article: Article }) {
  const navigate = useNavigate();
  return (
    <article className="group relative overflow-hidden bg-gradient-card border border-border/50 rounded-2xl p-8 hover-lift hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative flex flex-col space-y-6">
        {/* Category Badge */}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Tag className="h-4 w-4 mr-2" />
            {article.categories.join(", ")}
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <KeyIcon className="h-4 w-4 mr-2" />
            {article.keywords.join(", ")}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2 text-balance">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-lg text-pretty">
          {article.summary}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">{article.authors.join(", ")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-full bg-secondary/10">
              <Calendar className="h-4 w-4 text-secondary" />
            </div>
            <span>
              {new Date(article.publishedDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>

        {Array.isArray(article.images) && article.images.length > 0 && (
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full max-w-sm self-center"
          >
            <CarouselContent>
              {article.images
                .map((img) => imageSourceFromUnknown(img))
                .filter((src): src is string => !!src)
                .map((src, index) => (
                  <CarouselItem
                    key={index}
                    className="w-full h-48 rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Imagen ${index + 1} del artículo`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        <div className="pt-4">
          <Button
            onClick={() => {
              navigate(`/articles/${article.id}`);
            }}
            className="group/btn bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 font-semibold px-6 py-3 rounded-xl"
          >
            Leer artículo
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </article>
  );
}
