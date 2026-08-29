import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";
import { ClinicProvider } from "../context/ClinicContext";

function renderForm() {
  render(
    <ClinicProvider>
      <ContactForm />
    </ClinicProvider>
  );
}

describe("ContactForm", () => {
  test("shows validation errors when submitted empty", () => {
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));

    expect(screen.getByText(/ingresa tu nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/ingresa tu telefono/i)).toBeInTheDocument();
    expect(screen.getByText(/escribe un mensaje/i)).toBeInTheDocument();
  });

  test("shows an error for an invalid phone format", () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: "abc" } });
    fireEvent.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));

    expect(screen.getByText(/el telefono no tiene un formato valido/i)).toBeInTheDocument();
  });

  test("opens WhatsApp with the message and shows success when the form is valid", () => {
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => {});
    renderForm();

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: "+5492611234567" } });
    fireEvent.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining("https://api.whatsapp.com/send?phone="),
      "_blank",
      "noopener,noreferrer"
    );
    expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();

    openSpy.mockRestore();
  });
});
