import { useClinic } from "../context/ClinicContext";
import "./styles/testimonials.css";

function Testimonials() {
  const { testimonials } = useClinic();

  return (
    <section className="testimonials reveal" aria-label="Testimonios de pacientes">
      <h2>Testimonios</h2>
      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.id}>
            <p className="testimonial-text">"{item.text}"</p>
            <p className="testimonial-author">- {item.author}</p>
            <p className="testimonial-rating" aria-label={`${item.rating} de 5 estrellas`}>
              {"★".repeat(item.rating)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
