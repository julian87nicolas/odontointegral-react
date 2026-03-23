// libraries
import { useEffect } from "react";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom"

// components
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { ClinicProvider } from "./context/ClinicContext";
// styles

function App() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) {
      return;
    }

    revealElements.forEach((element) => {
      element.classList.add("reveal-pending");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    const fallbackTimer = window.setTimeout(() => {
      revealElements.forEach((element) => {
        element.classList.remove("reveal-pending");
        element.classList.add("is-visible");
      });
    }, 1200);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <ClinicProvider>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ClinicProvider>
  );
}

export default App;
