import { Loader2, Sparkles } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></div>
        <div className="relative bg-gradient-card rounded-full p-6 border border-border/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-foreground">Buscando artículos...</p>
        <p className="text-sm text-muted-foreground">Esto solo tomará un momento</p>
      </div>

      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}
