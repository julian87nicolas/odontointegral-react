import { useState, useEffect, useRef } from "react";

import { useClinic } from "../context/ClinicContext";

import "./styles/intro.css"

const HERO_IMG_DESKTOP = "/images/tools.webp";
const HERO_IMG_MOBILE = "/images/tools-960.webp";
const PARALLAX_RANGE = 30;

function Intro () {
    const { whatsapp, mapsUrl } = useClinic();
    const photoRef = useRef(null);

    const [heroImg, setHeroImg] = useState(
        () => (typeof window !== "undefined" && window.innerWidth <= 960 ? HERO_IMG_MOBILE : HERO_IMG_DESKTOP)
    );

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 960px)");
        const update = (e) => setHeroImg(e.matches ? HERO_IMG_MOBILE : HERO_IMG_DESKTOP);
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    /* Subtle vertical parallax on the hero photo as the page scrolls past it */
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const node = photoRef.current;
                if (node) {
                    const progress = Math.min(Math.max(window.scrollY / 600, 0), 1);
                    const offset = -PARALLAX_RANGE + progress * (PARALLAX_RANGE * 2);
                    node.style.transform = `translateY(${offset}px)`;
                }
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section className="intro">
            <h1 className="intro-title reveal">Aura Odontología<span className="intro-h1-sub">Clínica odontológica</span></h1>
            <p className="lead reveal" style={{ "--reveal-delay": "0.12s" }}>
                Tratamiento de conducto, extracciones, implantes, ortodoncia y odontopediatría con un enfoque cercano y profesional.
            </p>
            <div className="intro-actions reveal" style={{ "--reveal-delay": "0.22s" }}>
                <a className="intro-action primary" href={`https://api.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noreferrer">Reservar turno &gt;</a>
                <a className="intro-action secondary" href={mapsUrl} target="_blank" rel="noreferrer">Ver ubicación &gt;</a>
            </div>
            <div className="intro-photo-wrap reveal reveal-scale" style={{ "--reveal-delay": "0.3s" }}>
                <img
                    ref={photoRef}
                    className="intro-photo"
                    src={heroImg}
                    alt="Instrumental odontológico en el consultorio de Aura Odontología"
                    fetchpriority="high"
                    width="1920"
                    height="460"
                />
            </div>
        </section>
    )
}

export default Intro
