import { useEffect, useMemo, useState } from "react";
import { useClinic } from "../context/ClinicContext";
import "./styles/testimonials.css";

function Testimonials() {
  const { testimonials, googlePlaceQuery, mapsUrl } = useClinic();
  const [googleTestimonials, setGoogleTestimonials] = useState([]);
  const [source, setSource] = useState("local");

  useEffect(() => {
    let isMounted = true;

    async function loadGoogleReviews() {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        return;
      }

      try {
        const searchResponse = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.id",
          },
          body: JSON.stringify({
            textQuery: googlePlaceQuery,
            languageCode: "es",
          }),
        });

        if (!searchResponse.ok) {
          return;
        }

        const searchData = await searchResponse.json();
        const placeId = searchData?.places?.[0]?.id;

        if (!placeId) {
          return;
        }

        const detailsResponse = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "reviews",
          },
        });

        if (!detailsResponse.ok) {
          return;
        }

        const detailsData = await detailsResponse.json();
        const reviews = Array.isArray(detailsData?.reviews) ? detailsData.reviews : [];

        const normalized = reviews
          .map((review, index) => ({
            id: review.name || `google-${index}`,
            author: review.authorAttribution?.displayName || "Paciente",
            rating: Number(review.rating) || 5,
            text: review.text?.text || review.originalText?.text || "",
            publishedAt: review.publishTime ? new Date(review.publishTime).getTime() : 0,
          }))
          .filter((review) => review.text && review.rating === 5)
          .sort((a, b) => b.publishedAt - a.publishedAt)
          .slice(0, 5);

        if (isMounted && normalized.length > 0) {
          setGoogleTestimonials(normalized);
          setSource("google");
        }
      } catch (error) {
        // Fallback a testimonios locales si la API no esta configurada o falla.
      }
    }

    loadGoogleReviews();

    return () => {
      isMounted = false;
    };
  }, [googlePlaceQuery]);

  const visibleTestimonials = useMemo(() => {
    if (source === "google" && googleTestimonials.length > 0) {
      return googleTestimonials;
    }
    return testimonials
      .filter((review) => Number(review.rating) === 5)
      .slice(0, 5);
  }, [googleTestimonials, source, testimonials]);

  return (
    <section className="testimonials reveal" aria-label="Testimonios de pacientes">
      <h2>Testimonios</h2>
      <p className="testimonials-source">
        {source === "google" ? "Ultimas 5 opiniones de 5 estrellas en Google Maps" : "Testimonios recientes"}
        {" "}
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          Ver en Google Maps
        </a>
      </p>
      <div className="testimonials-grid">
        {visibleTestimonials.map((item) => (
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
