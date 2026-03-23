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
    setFormData(initialForm);
    setErrors({});
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
          <a href={`mailto:${email}`} className="contact-mail-link">Enviar email</a>
        </div>
      </form>

      {sent && <p className="contact-success">Mensaje enviado. Te responderemos a la brevedad.</p>}
    </section>
  );
}

export default ContactForm;
