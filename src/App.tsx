import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { AppProvider } from "./context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProjectGrid } from "./components/ProjectGrid";
import { ServicesSection } from "./components/ServicesSection";
import { TeamSection } from "./components/TeamSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { TechCircuitBackground } from "./components/TechCircuitBackground";
import { Footer } from "./components/Footer";
import { ProjectDetailModal } from "./components/ProjectDetailModal";
import { InquiryModal } from "./components/InquiryModal";
import { TeamAuthModal } from "./components/TeamAuthModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { NotificationToastContainer } from "./components/NotificationToastContainer";

export function AppContent() {
  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden relative">
      {/* Animated Glowing Tech Circuit & CPU Motherboard Background */}
      <TechCircuitBackground />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <ProjectGrid />
        <ServicesSection />
        <TeamSection />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays & Interactive Modals */}
      <ProjectDetailModal />
      <InquiryModal />
      <TeamAuthModal />
      <AdminDashboard />
      <NotificationToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

