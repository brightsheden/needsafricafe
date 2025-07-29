import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Impact from "./pages/Impact";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import DonationManagement from "./pages/admin/DonationManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Programs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProgramDetails />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              {/* Admin Routes */}
              <Route path="/admin/donations" element={<DonationManagement />} />
              <Route path="/admin/projects" element={<ProjectManagement />} />
              <Route path="/admin/team" element={<TeamManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
