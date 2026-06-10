import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { WorkDetail } from "./pages/WorkDetail";
import { ResearchDetail } from "./pages/ResearchDetail";
import { ScrollToHash } from "./components/ScrollToHash";
import { ScrollProgress } from "./components/ScrollProgress";
import { TopoBackground } from "./components/TopoBackground";
import { CustomCursor } from "./components/CustomCursor";
import { useLenis } from "./hooks/useLenis";

function AppShell() {
  useLenis();
  return (
    <>
      <ScrollToHash />
      <ScrollProgress />
      <TopoBackground />
      <CustomCursor />
      <div className="relative min-h-svh text-chalk-200 overflow-x-clip">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
            <Route path="/research/:slug" element={<ResearchDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
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
