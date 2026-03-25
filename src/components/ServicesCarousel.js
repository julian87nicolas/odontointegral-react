import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

/* Speed in pixels per frame (~0.5 px/frame ≈ 30 px/s at 60 fps) */
const SCROLL_SPEED = 0.5;
const GAP = 16;

function ServicesCarousel() {
    const trackRef = useRef(null);
    const animRef = useRef(null);
    const scrollPosRef = useRef(0);
    const isPausedRef = useRef(false);
    const totalWidthRef = useRef(0);
    const [cardWidth, setCardWidth] = useState(0);

    /* ---- Measure card width & total track width ---- */
    const measure = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const viewport = track.parentElement;
        if (!viewport) return;
        const vw = viewport.offsetWidth;
        let cols = 3;
        if (vw < 640) cols = 1;
        else if (vw < 960) cols = 2;
        const cw = (vw - GAP * (cols - 1)) / cols;
        setCardWidth(cw);
        totalWidthRef.current = services.length * (cw + GAP);
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [measure]);

    /* ---- Continuous smooth scroll via requestAnimationFrame ---- */
    useEffect(() => {
        /* Respect reduced-motion preference */
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        const prefersReducedMotion = () => mql.matches;

        const tick = () => {
            if (!isPausedRef.current && !prefersReducedMotion() && totalWidthRef.current > 0) {
                scrollPosRef.current += SCROLL_SPEED;
                if (scrollPosRef.current >= totalWidthRef.current) {
                    scrollPosRef.current -= totalWidthRef.current;
                }
                if (trackRef.current) {
                    trackRef.current.style.transform = `translateX(-${scrollPosRef.current}px)`;
                }
            }
            animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    /* ---- Arrow navigation ---- */
    const next = useCallback(() => {
        const step = cardWidth + GAP;
        if (step <= 0 || totalWidthRef.current <= 0) return;
        scrollPosRef.current = Math.round(scrollPosRef.current / step) * step + step;
        if (scrollPosRef.current >= totalWidthRef.current) {
            scrollPosRef.current -= totalWidthRef.current;
        }
    }, [cardWidth]);

    const prev = useCallback(() => {
        const step = cardWidth + GAP;
        if (step <= 0 || totalWidthRef.current <= 0) return;
        scrollPosRef.current = Math.round(scrollPosRef.current / step) * step - step;
        if (scrollPosRef.current < 0) {
            scrollPosRef.current += totalWidthRef.current;
        }
    }, [cardWidth]);

    /* ---- Pause / resume ---- */
    const pause = useCallback(() => { isPausedRef.current = true; }, []);
    const resume = useCallback(() => { isPausedRef.current = false; }, []);

    /* Duplicate cards for seamless infinite loop (memoized) */
    const allCards = useMemo(() => services.map((s, i) => ({ ...s, key: `${s.id}-0`, idx: i }))
        .concat(services.map((s, i) => ({ ...s, key: `${s.id}-1`, idx: i }))), []);

    return (
        <div
            className="carousel-wrapper"
            onMouseEnter={pause}
            onMouseLeave={resume}
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
                    style={{ gap: `${GAP}px` }}
                >
                    {allCards.map((s) => (
                        <article
                            key={s.key}
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
        </div>
    );
}

export default ServicesCarousel;
