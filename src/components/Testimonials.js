import { useEffect, useMemo, useState } from "react";
import { useClinic } from "../context/ClinicContext";
import "./styles/testimonials.css";

function Testimonials() {
  const { testimonials, googlePlaceQuery, googlePlaceId, mapsUrl } = useClinic();
  const [googleTestimonials, setGoogleTestimonials] = useState([]);
  const [source, setSource] = useState("local");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGoogleReviews() {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        return;
      }

      setLoading(true);

      try {
        let resolvedPlaceId = googlePlaceId;

        if (!resolvedPlaceId) {
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
            signal: controller.signal,
          });

          if (!searchResponse.ok) {
            return;
          }

          const searchData = await searchResponse.json();
          resolvedPlaceId = searchData?.places?.[0]?.id;
        }

        if (!resolvedPlaceId) {
          return;
        }

        const detailsResponse = await fetch(`https://places.googleapis.com/v1/${resolvedPlaceId}`, {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "reviews.rating,reviews.text,reviews.originalText,reviews.publishTime,reviews.authorAttribution.displayName,reviews.name",
          },
          signal: controller.signal,
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

        if (normalized.length > 0) {
          setGoogleTestimonials(normalized);
          setSource("google");
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        // Fallback a testimonios locales si la API no esta configurada o falla.
      } finally {
        setLoading(false);
      }
    }

    loadGoogleReviews();

    return () => {
      controller.abort();
    };
  }, [googlePlaceId, googlePlaceQuery]);

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
      <div className="testimonials-grid" aria-live="polite" aria-busy={loading}>
        {loading ? (
          <>
            {[1, 2, 3].map((n) => (
              <div key={n} className="testimonial-card testimonial-skeleton" aria-hidden="true">
                <div className="skeleton-line skeleton-line--long" />
                <div className="skeleton-line skeleton-line--medium" />
                <div className="skeleton-line skeleton-line--short" />
              </div>
            ))}
          </>
        ) : (
          visibleTestimonials.map((item) => (
            <article className="testimonial-card" key={item.id}>
              <p className="testimonial-text">"{item.text}"</p>
              <p className="testimonial-author">- {item.author}</p>
              <p className="testimonial-rating" aria-label={`${item.rating} de 5 estrellas`}>
                {"★".repeat(item.rating)}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Testimonials;
