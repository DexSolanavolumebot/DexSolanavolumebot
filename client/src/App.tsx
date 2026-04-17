import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TelegramMiniApp from "./pages/TelegramMiniApp";

function Router() {
  // Check if running in Telegram Mini App
  const isTMA = typeof window !== 'undefined' && window.Telegram?.WebApp;
  
  return (
    <Switch>
      <Route path={"/"} component={isTMA ? TelegramMiniApp : Home} />
      <Route path={"/tma"} component={TelegramMiniApp} />
      <Route path={"/home"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={isTMA ? TelegramMiniApp : Home} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
