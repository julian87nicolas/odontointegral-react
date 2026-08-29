import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import { ClinicProvider } from "../context/ClinicContext";

function renderNav() {
  render(
    <ClinicProvider>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </ClinicProvider>
  );
}

describe("Nav theme toggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  test("defaults to light theme and persists the toggle to dark", () => {
    renderNav();
    const toggle = screen.getByRole("button", { name: /alternar tema/i });

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    fireEvent.click(toggle);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  test("reads a previously persisted theme on mount", () => {
    window.localStorage.setItem("theme", "dark");
    renderNav();

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
