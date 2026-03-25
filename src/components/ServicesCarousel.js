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
    const viewportRef = useRef(null);
    const animRef = useRef(null);
    const resetAutoSourceRef = useRef(null);
    const lastInteractionAtRef = useRef(0);
    const isPointerDownRef = useRef(false);
    const isAutoScrollSourceRef = useRef(false);
    const singleSetWidthRef = useRef(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [activeServiceIdx, setActiveServiceIdx] = useState(0);
    const [activeCardKey, setActiveCardKey] = useState(() => `${services[0].id}-1`);

    const registerInteraction = useCallback(() => {
        lastInteractionAtRef.current = Date.now();
    }, []);

    const updateActiveServiceFromScroll = useCallback((scrollLeft) => {
        const viewport = viewportRef.current;
        if (!viewport || cardWidth <= 0 || singleSetWidthRef.current <= 0) return;
        const step = cardWidth + GAP;
        const totalCards = services.length * 3;
        const centeredOffset = scrollLeft + viewport.offsetWidth / 2 - cardWidth / 2;
        const rawIndex = Math.round(centeredOffset / step);
        const normalizedIndex = ((rawIndex % totalCards) + totalCards) % totalCards;
        const idx = normalizedIndex % services.length;
        const copy = Math.floor(normalizedIndex / services.length);
        setActiveServiceIdx(idx);
        setActiveCardKey(`${services[idx].id}-${copy}`);
    }, [cardWidth]);

    const normalizeCircularScroll = useCallback((viewport) => {
        if (!viewport || singleSetWidthRef.current <= 0) return;
        const single = singleSetWidthRef.current;
        if (viewport.scrollLeft >= single * 1.5) {
            viewport.scrollLeft -= single;
        } else if (viewport.scrollLeft <= single * 0.5) {
            viewport.scrollLeft += single;
        }
    }, []);

    /* ---- Measure card width & total track width ---- */
    const measure = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const vw = viewport.offsetWidth;
        let cols = 3;
        if (vw < 640) cols = 1;
        else if (vw < 960) cols = 2;
        const cw = (vw - GAP * (cols - 1)) / cols;
        setCardWidth(cw);
        singleSetWidthRef.current = services.length * (cw + GAP);
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [measure]);

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport || singleSetWidthRef.current <= 0) return;
        viewport.scrollLeft = singleSetWidthRef.current;
        updateActiveServiceFromScroll(viewport.scrollLeft);
    }, [cardWidth, updateActiveServiceFromScroll]);

    /* ---- Continuous smooth scroll via requestAnimationFrame ---- */
    useEffect(() => {
        /* Respect reduced-motion preference */
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        const prefersReducedMotion = () => mql.matches;
        const AUTO_RESUME_DELAY = 800;

        const tick = () => {
            const viewport = viewportRef.current;
            const isIdle = Date.now() - lastInteractionAtRef.current > AUTO_RESUME_DELAY;
            if (viewport && !isPointerDownRef.current && isIdle && !prefersReducedMotion() && singleSetWidthRef.current > 0) {
                isAutoScrollSourceRef.current = true;
                viewport.scrollLeft += SCROLL_SPEED;
                normalizeCircularScroll(viewport);

                if (resetAutoSourceRef.current) {
                    cancelAnimationFrame(resetAutoSourceRef.current);
                }
                resetAutoSourceRef.current = requestAnimationFrame(() => {
                    isAutoScrollSourceRef.current = false;
                });
            }
            animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            if (resetAutoSourceRef.current) cancelAnimationFrame(resetAutoSourceRef.current);
        };
    }, [normalizeCircularScroll]);

    /* ---- Arrow navigation ---- */
    const next = useCallback(() => {
        const step = cardWidth + GAP;
        const viewport = viewportRef.current;
        if (!viewport || step <= 0 || singleSetWidthRef.current <= 0) return;
        registerInteraction();
        const target = Math.round(viewport.scrollLeft / step) * step + step;
        viewport.scrollTo({ left: target, behavior: "smooth" });
        window.setTimeout(() => {
            if (viewportRef.current) normalizeCircularScroll(viewportRef.current);
        }, 250);
    }, [cardWidth, normalizeCircularScroll, registerInteraction]);

    const prev = useCallback(() => {
        const step = cardWidth + GAP;
        const viewport = viewportRef.current;
        if (!viewport || step <= 0 || singleSetWidthRef.current <= 0) return;
        registerInteraction();
        const target = Math.round(viewport.scrollLeft / step) * step - step;
        viewport.scrollTo({ left: target, behavior: "smooth" });
        window.setTimeout(() => {
            if (viewportRef.current) normalizeCircularScroll(viewportRef.current);
        }, 250);
    }, [cardWidth, normalizeCircularScroll, registerInteraction]);

    const goToService = useCallback((idx) => {
        const viewport = viewportRef.current;
        const step = cardWidth + GAP;
        if (!viewport || step <= 0 || singleSetWidthRef.current <= 0) return;
        registerInteraction();
        const target = singleSetWidthRef.current + idx * step;
        viewport.scrollTo({ left: target, behavior: "smooth" });
        window.setTimeout(() => {
            if (viewportRef.current) normalizeCircularScroll(viewportRef.current);
        }, 250);
    }, [cardWidth, normalizeCircularScroll, registerInteraction]);

    const onScroll = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport || singleSetWidthRef.current <= 0) return;
        normalizeCircularScroll(viewport);
        updateActiveServiceFromScroll(viewport.scrollLeft);
        if (!isAutoScrollSourceRef.current) {
            registerInteraction();
        }
    }, [normalizeCircularScroll, registerInteraction, updateActiveServiceFromScroll]);

    const onPointerDown = useCallback(() => {
        isPointerDownRef.current = true;
        registerInteraction();
    }, [registerInteraction]);

    const onPointerUp = useCallback(() => {
        isPointerDownRef.current = false;
        registerInteraction();
    }, [registerInteraction]);

    const onPointerMove = useCallback(() => {
        if (isPointerDownRef.current) {
            registerInteraction();
        }
    }, [registerInteraction]);

    const onWheel = useCallback(() => {
        registerInteraction();
    }, [registerInteraction]);

    /* Duplicate cards for seamless infinite loop (memoized) */
    const allCards = useMemo(() => services
        .map((s, i) => ({ ...s, key: `${s.id}-0`, idx: i }))
        .concat(services.map((s, i) => ({ ...s, key: `${s.id}-1`, idx: i })))
        .concat(services.map((s, i) => ({ ...s, key: `${s.id}-2`, idx: i }))), []);

    return (
        <div className="carousel-wrapper">
            <button
                className="carousel-arrow carousel-arrow--left"
                onClick={prev}
                aria-label="Servicio anterior"
            >
                <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>

            <div
                className="carousel-viewport"
                ref={viewportRef}
                onScroll={onScroll}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
            >
                <div
                    className="carousel-track"
                    style={{ gap: `${GAP}px` }}
                >
                    {allCards.map((s) => (
                        <article
                            key={s.key}
                            className={`carousel-card${s.urgent ? " carousel-card--urgent" : ""}${s.key === activeCardKey ? " carousel-card--focus" : ""}`}
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

            <div className="carousel-progress" aria-label="Navegación de servicios">
                {services.map((service, idx) => (
                    <button
                        key={service.id}
                        type="button"
                        className={`carousel-progress__item${idx === activeServiceIdx ? " is-active" : ""}`}
                        onClick={() => goToService(idx)}
                        aria-label={`Ir a ${service.title}`}
                        aria-current={idx === activeServiceIdx ? "true" : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

export default ServicesCarousel;
