import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Calendar,
  Download,
  ExternalLink,
  Tag,
  User,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { getArticleById } from "../../services/ArticlesService";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { imageSourceFromUnknown } from "../../lib/utils";

const ArticlesFullText = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop() || "";
  const { data, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-4/5" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
            <Separator />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load article. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Alert>
            <AlertDescription>Article not found.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const article = data.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-muted/30 to-background border-b">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              {article.authors && article.authors.length > 0 && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {article.authors.join(", ")}
                  </span>
                </div>
              )}

              {article.publishedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(article.publishedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Categories and Keywords */}
            {(article.categories?.length > 0 ||
              article.keywords?.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {article.categories?.map((category, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {category}
                  </Badge>
                ))}
                {article.keywords?.slice(0, 5).map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            {article.pdfUrl && (
              <div className="flex gap-3">
                <Button variant="default" size="sm" asChild>
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Original
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="space-y-8">
          {/* Abstract */}
          {article.summary && (
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-primary">
                Abstract
              </h2>
              <p className="text-base leading-relaxed text-pretty text-muted-foreground">
                {article.summary}
              </p>
            </div>
          )}

          <Separator />

          {/* Article Images */}
          {article.images && article.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Figures</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {article.images.map((image, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <img
                      src={imageSourceFromUnknown(image) || "/placeholder.svg"}
                      alt={`Figure ${index + 1}`}
                      className="w-full h-auto"
                      crossOrigin="anonymous"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Text Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div
              className="text-base leading-relaxed text-pretty space-y-6"
              style={{
                lineHeight: "1.7",
                fontSize: "16px",
                fontFamily: "var(--font-sans)",
              }}
            >
              {article.text.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 text-foreground">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlesFullText;
