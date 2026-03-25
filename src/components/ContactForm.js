import { useState } from "react";
import { useClinic } from "../context/ClinicContext";
import "./styles/contact.css";

const initialForm = {
  name: "",
  phone: "",
  message: "",
};

function ContactForm() {
  const { whatsapp, email } = useClinic();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Ingresa tu nombre.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Ingresa tu telefono.";
    } else if (!/^\+?[0-9\s-]{7,20}$/.test(formData.phone.trim())) {
      nextErrors.phone = "El telefono no tiene un formato valido.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Escribe un mensaje.";
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = "El mensaje debe tener al menos 10 caracteres.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setSent(false);
    setEmailSent(false);
    setErrors((prev) => ({ ...prev, form: undefined }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const text = encodeURIComponent(
      `Hola, soy ${formData.name}. Mi telefono es ${formData.phone}.\n\n${formData.message}`
    );

    window.open(`https://api.whatsapp.com/send?phone=${whatsapp}&text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setEmailSent(false);
    setFormData(initialForm);
    setErrors({});
  };

  const onEmailSubmit = async () => {
    if (!validate()) {
      return;
    }

    setEmailSending(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          _subject: "Consulta desde la web - Aura Odontologia",
          _template: "table",
          _captcha: "false",
        }),
      });

      const raw = await response.text();
      let data = {};

      try {
        data = JSON.parse(raw);
      } catch (error) {
        data = { message: raw };
      }

      if (!response.ok || data.success === "false") {
        throw new Error(data.message || "No se pudo enviar el email.");
      }

      setEmailSent(true);
      setSent(false);
      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      const message = String(error?.message || "").toLowerCase();
      const activationMessage =
        "FormSubmit todavía no tiene activado este correo. Revisa la bandeja de auradentalmza@gmail.com y confirma el email de activación del servicio.";

      setErrors((prev) => ({
        ...prev,
        form:
          message.includes("activate") ||
          message.includes("activation") ||
          message.includes("confirm") ||
          message.includes("unable to submit form")
            ? activationMessage
            : "No se pudo enviar el email ahora. Intenta nuevamente en unos minutos.",
      }));
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <section className="contact-section reveal" aria-label="Formulario de contacto">
      <h2>Solicita tu turno</h2>
      <p className="contact-lead">Completa el formulario y te contactamos por WhatsApp.</p>

      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" type="text" value={formData.name} onChange={onChange} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
        {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}

        <label htmlFor="phone">Telefono</label>
        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={onChange} inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
        {errors.phone && <span id="phone-error" className="field-error">{errors.phone}</span>}

        <label htmlFor="message">Mensaje</label>
        <textarea id="message" name="message" rows="5" value={formData.message} onChange={onChange} minLength={10} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}

        <div className="contact-actions">
          <button type="submit">Enviar por WhatsApp</button>
          <button type="button" className="contact-mail-link" onClick={onEmailSubmit} disabled={emailSending}>
            {emailSending ? "Enviando..." : "Enviar email"}
          </button>
        </div>
      </form>

      {sent && <p className="contact-success" role="status" aria-live="polite">Mensaje enviado. Te responderemos a la brevedad.</p>}
      {emailSent && <p className="contact-success" role="status" aria-live="polite">Email enviado correctamente. Te responderemos a la brevedad.</p>}
      {errors.form && <p className="field-error" role="alert" aria-live="assertive">{errors.form}</p>}
    </section>
  );
}

export default ContactForm;
