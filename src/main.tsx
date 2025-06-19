import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/queryClient"
import { Switch, Route } from "wouter"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Home from "@/pages/home"
import NotFound from "@/pages/not-found"
import "./index.css"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
