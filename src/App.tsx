import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/AdminLayout";
import { AuthLayout } from "./components/auth/AuthLayout";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users";
import FloodAlertsPage from "./pages/admin/FloodAlerts";
import DroughtAlertsPage from "./pages/admin/DroughtAlerts";
import AlertDetail from "./pages/admin/AlertDetail";
import ReportDetail from "./pages/admin/ReportDetail";
import CommunityReportsPage from "./pages/admin/CommunityReports";
import EcoRestorationPage from "./pages/admin/EcoRestoration";
import ConnectivityPage from "./pages/admin/Connectivity";
import SettingsPage from "./pages/admin/Settings";
import { LoadingCard } from "./components/ui/loading-spinner";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingCard title="Loading..." />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthLayout />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="alerts" element={<FloodAlertsPage />} />
              <Route path="alerts/drought" element={<DroughtAlertsPage />} />
              <Route path="alerts/:id" element={<AlertDetail />} />
              <Route path="reports" element={<CommunityReportsPage />} />
              <Route path="reports/:id" element={<ReportDetail />} />
              <Route path="projects" element={<EcoRestorationPage />} />
              <Route path="disbursements" element={<ConnectivityPage />} />
              <Route path="connectivity" element={<ConnectivityPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
