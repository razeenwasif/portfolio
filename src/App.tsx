import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ScrollToHash } from "./components/ScrollToHash";
import { ScrollProgress } from "./components/ScrollProgress";
import { TopoBackground } from "./components/TopoBackground";
import { CustomCursor } from "./components/CustomCursor";
import { ResumeModalProvider } from "./components/ResumeModal";
import { useLenis } from "./hooks/useLenis";

const WorkDetail = lazy(() =>
  import("./pages/WorkDetail").then((module) => ({
    default: module.WorkDetail,
  })),
);
const ResearchDetail = lazy(() =>
  import("./pages/ResearchDetail").then((module) => ({
    default: module.ResearchDetail,
  })),
);

function AppShell() {
  useLenis();
  return (
    <ResumeModalProvider>
      <ScrollToHash />
      <ScrollProgress />
      <TopoBackground />
      <CustomCursor />
      <div className="relative min-h-svh text-chalk-200 overflow-x-clip">
        <Nav />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work/:slug" element={<WorkDetail />} />
              <Route path="/research/:slug" element={<ResearchDetail />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ResumeModalProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
