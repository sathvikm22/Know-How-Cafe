import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import Activities from "./pages/Activities";
import Login from "./pages/Login";
import Buy from "./pages/Buy";
import ForgotPassword from "./pages/ForgotPassword";
import AdminBookings from './pages/AdminBookings';
import AdminUsers from './pages/AdminUsers';

const queryClient = new QueryClient();

function AdminRoute({ children }: { children: JSX.Element }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Index />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/dashboard/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="/admin/dashboard/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
