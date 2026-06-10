import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { WorkDetail } from "./pages/WorkDetail";
import { ResearchDetail } from "./pages/ResearchDetail";
import { ScrollToHash } from "./components/ScrollToHash";

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="relative min-h-svh bg-ink-900 text-chalk-200 overflow-x-clip">
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
    </BrowserRouter>
  );
}

export default App;
