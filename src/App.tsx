import { useEffect } from "react";
import { LangProvider } from "./context/LangContext";
import { ModalProvider, useModal } from "./context/ModalContext";
import Cursor from "./components/ui/Cursor";
import Grain from "./components/ui/Grain";
import FloatingCTA from "./components/ui/FloatingCTA";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import SectionTabs from "./components/sections/SectionTabs";
import CTA from "./components/sections/CTA";
import ContactModal from "./components/modals/ContactModal";
import QuoteModal from "./components/modals/QuoteModal";
import ServicesModal from "./components/modals/ServicesModal";
import ProcessModal from "./components/modals/ProcessModal";
import ProjectsCarousel from "./components/modals/ProjectsCarousel";

function HashHandler() {
  const { openModal } = useModal();
  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => openModal("quote"), 700);
      window.history.replaceState(null, "", "/");
    }
  }, [openModal]);
  return null;
}

export default function App() {
  return (
    <LangProvider>
      <ModalProvider>
        <div className="bg-bg min-h-screen text-ink font-inter selection:bg-mint/20 selection:text-mint">
          <div className="grid-bg" />
          <Grain />
          <Cursor />
          <HashHandler />
          <Header />
          <main>
            <Hero />
            <SectionTabs />
            <CTA />
          </main>
          <Footer />
          <FloatingCTA />
          {/* contact = simplu, quote = detaliat cu oferta */}
          <ContactModal />
          <QuoteModal />
          <ServicesModal />
          <ProcessModal />
          <ProjectsCarousel />
        </div>
      </ModalProvider>
    </LangProvider>
  );
}
