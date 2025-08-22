import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
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
import SubscriptionManagement from "./pages/admin/SubscriptionManagement";
import VolunteerManagement from "./pages/admin/VolunteerManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Programs";
import NGOAdminSignup from "./pages/admin/auth/authscreen";
import AdminLogin from "./pages/admin/auth/Login";
import CreateProject from "./pages/admin/CreateProject";
import ProjectEdit from "./pages/admin/ProjectEdit";
import AdminHome from "./pages/admin/AdminHome";
import AdminRegister from "./pages/admin/auth/Register";
import ThankYou from "./pages/ThankYou";
import VolunteerThankYou from "./pages/VolunteerThankYou";
import Volunteer from "./pages/Volunteer";
import ProjectProofPage from "./pages/proofs";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from './components/Shared/ScrollToTop'


const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen flex flex-col">
          <ScrollToTop /> {/* 👈 This is important */}


      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProgramDetails />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfService/>}/>
          <Route path="/privacy" element={<PrivacyPolicy/>}/>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/donations" element={<DonationManagement />} />
          <Route path="/admin/projects" element={<ProjectManagement />} />
          <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
          <Route path="/admin/volunteers" element={<VolunteerManagement />} />
          <Route path="/admin/projects/create" element={<CreateProject />} />
          <Route path="/admin/projects/:id/edit" element={<ProjectEdit />} />
          <Route path="/admin/auth" element={<NGOAdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister/>} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/volunteer" element={<Volunteer/>}/>
          <Route path="/volunteer/thank-you" element={<VolunteerThankYou />} />
          <Route path="/projects/proof/:projectId" element={<ProjectProofPage/>} />
           
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;