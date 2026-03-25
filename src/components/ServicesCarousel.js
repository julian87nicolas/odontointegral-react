import { useState, useEffect, useRef, useCallback } from "react";
import "./styles/carousel.css";

const services = [
    {
        id: "conducto",
        icon: "fa-solid fa-tooth",
        title: "Tratamiento de conducto",
        description: "Endodoncia profesional para salvar dientes afectados por infección o daño en la pulpa dental.",
    },
    {
        id: "extracciones",
        icon: "fa-solid fa-hand-holding-medical",
        title: "Extracciones",
        description: "Extracción de dientes y muelas con técnicas modernas y mínimo dolor.",
    },
    {
        id: "muelas",
        icon: "fa-solid fa-teeth",
        title: "Muelas de juicio",
        description: "Extracción segura de terceros molares con seguimiento post-operatorio.",
    },
    {
        id: "implantes",
        icon: "fa-solid fa-screwdriver-wrench",
        title: "Implantes dentales",
        description: "Reemplazo de piezas dentales perdidas con implantes de alta calidad.",
    },
    {
        id: "ortodoncia",
        icon: "fa-solid fa-teeth-open",
        title: "Ortodoncia",
        description: "Corrección de la alineación de dientes y mordida para niños y adultos.",
    },
    {
        id: "odontopediatria",
        icon: "fa-solid fa-child",
        title: "Odontopediatría",
        description: "Atención dental especializada para niños y bebés con un enfoque cálido.",
    },
    {
        id: "caries",
        icon: "fa-solid fa-shield-halved",
        title: "Caries",
        description: "Diagnóstico, tratamiento y prevención de caries dentales.",
    },
    {
        id: "gingivitis",
        icon: "fa-solid fa-droplet",
        title: "Gingivitis y encías",
        description: "Tratamiento de gingivitis y enfermedades de las encías para mantener una boca saludable.",
    },
    {
        id: "limpieza",
        icon: "fa-solid fa-broom",
        title: "Limpieza dental",
        description: "Higiene profesional para dientes y encías.",
    },
    {
        id: "blanqueamiento",
        icon: "fa-solid fa-sun",
        title: "Blanqueamiento dental",
        description: "Tratamiento estético para una sonrisa más blanca.",
    },
    {
        id: "protesis",
        icon: "fa-solid fa-puzzle-piece",
        title: "Prótesis dentales",
        description: "Prótesis fijas y removibles para restaurar la función dental.",
    },
    {
        id: "urgencias",
        icon: "fa-solid fa-kit-medical",
        title: "Urgencias",
        description: "Atención de urgencias dentales: dolor agudo, traumatismos, infecciones y emergencias bucodentales.",
        urgent: true,
    },
];

const AUTO_SCROLL_MS = 4000;

function ServicesCarousel() {
    const trackRef = useRef(null);
    const intervalRef = useRef(null);
    const [offset, setOffset] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);

    const maxOffset = Math.max(0, services.length - visibleCount);

    const measure = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const viewport = track.parentElement;
        if (!viewport) return;
        const vw = viewport.offsetWidth;
        const gap = 16;
        let cols = 3;
        if (vw < 640) cols = 1;
        else if (vw < 960) cols = 2;
        const cw = (vw - gap * (cols - 1)) / cols;
        setCardWidth(cw);
        setVisibleCount(cols);
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [measure]);

    const goTo = useCallback(
        (idx) => {
            const clamped = Math.max(0, Math.min(idx, maxOffset));
            setOffset(clamped);
        },
        [maxOffset]
    );

    const next = useCallback(() => {
        if (maxOffset <= 0) return;
        setOffset((prev) => (prev >= maxOffset ? 0 : prev + 1));
    }, [maxOffset]);

    const prev = useCallback(() => {
        if (maxOffset <= 0) return;
        setOffset((prev) => (prev <= 0 ? maxOffset : prev - 1));
    }, [maxOffset]);

    /* Auto-scroll */
    const stopAutoScroll = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startAutoScroll = useCallback(() => {
        stopAutoScroll();
        intervalRef.current = setInterval(next, AUTO_SCROLL_MS);
    }, [next, stopAutoScroll]);

    useEffect(() => {
        startAutoScroll();
        return stopAutoScroll;
    }, [startAutoScroll, stopAutoScroll]);

    /* Clamp offset when visibleCount changes */
    useEffect(() => {
        if (offset > maxOffset) goTo(maxOffset);
    }, [visibleCount, maxOffset, offset, goTo]);

    const gap = 16;
    const translateX = offset * (cardWidth + gap);

    return (
        <div
            className="carousel-wrapper"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
        >
            <button
                className="carousel-arrow carousel-arrow--left"
                onClick={prev}
                aria-label="Servicio anterior"
            >
                <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>

            <div className="carousel-viewport">
                <div
                    className="carousel-track"
                    ref={trackRef}
                    style={{
                        transform: `translateX(-${translateX}px)`,
                        gap: `${gap}px`,
                    }}
                >
                    {services.map((s) => (
                        <article
                            key={s.id}
                            className={`carousel-card${s.urgent ? " carousel-card--urgent" : ""}`}
                            style={{ width: cardWidth > 0 ? `${cardWidth}px` : undefined }}
                        >
                            <div className={`carousel-card__image carousel-card__image--${s.id}`}>
                                <i className={s.icon} aria-hidden="true"></i>
                            </div>
                            <div className="carousel-card__body">
                                <h3>{s.title}</h3>
                                <p>{s.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <button
                className="carousel-arrow carousel-arrow--right"
                onClick={next}
                aria-label="Siguiente servicio"
            >
                <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>

            <div className="carousel-dots" role="group" aria-label="Navegación de servicios">
                {services.map((s, i) => (
                    <button
                        key={s.id}
                        className={`carousel-dot${i === offset ? " active" : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Ir a ${s.title}`}
                        aria-current={i === offset ? "true" : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

export default ServicesCarousel;
