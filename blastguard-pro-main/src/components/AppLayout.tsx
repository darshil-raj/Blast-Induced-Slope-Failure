import { Navigate, Outlet } from "react-router-dom";
import { useAuth, ROLE_LABELS } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const AppLayout = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card/80 backdrop-blur-lg px-4 shrink-0 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-5" />
              <span className="text-sm font-semibold text-foreground hidden sm:inline">BISF Prediction System</span>
            </div>
            {user && (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs font-medium border-primary/20 text-primary bg-primary/5 hidden sm:inline-flex">
                  {ROLE_LABELS[user.role]}
                </Badge>
                <Separator orientation="vertical" className="h-5 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline">{user.name}</span>
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 gradient-mesh min-h-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
