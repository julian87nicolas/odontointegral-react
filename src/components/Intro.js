import { useState, useEffect } from "react";

import { useClinic } from "../context/ClinicContext";

import "./styles/intro.css"

const HERO_GRADIENT = "linear-gradient(140deg, rgba(5, 77, 132, 0.78), rgba(10, 177, 191, 0.68))";
const HERO_IMG_DESKTOP = "/images/tools.webp";
const HERO_IMG_MOBILE = "/images/tools-960.webp";

function Intro () {
    const { whatsapp, mapsUrl, insurers } = useClinic();

    const [search, setSearch] = useState("");

    /* Choose the appropriately-sized hero image based on viewport width.
       This avoids downloading the 1920px image on narrow mobile screens. */
    const [heroBg, setHeroBg] = useState(
        () => {
            const isMobile = typeof window !== "undefined" && window.innerWidth <= 960;
            const img = isMobile ? HERO_IMG_MOBILE : HERO_IMG_DESKTOP;
            return `${HERO_GRADIENT}, url(${img}) center/cover no-repeat`;
        }
    );

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 960px)");
        const update = (e) => {
            const img = e.matches ? HERO_IMG_MOBILE : HERO_IMG_DESKTOP;
            setHeroBg(`${HERO_GRADIENT}, url(${img}) center/cover no-repeat`);
        };
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    const busqueda = (event) => {
        setSearch(event.target.value);
    };

    const isSearching = search.trim().length > 0;
    const filteredInsurers = insurers.filter(i => i.toLowerCase().includes(search.toLowerCase()));
    const matchCount = filteredInsurers.length;
    const visibleInsurers = isSearching ? filteredInsurers : insurers;

    return (
        <>
            <section className="intro" style={{ background: heroBg }}>
                <div className="intro-copy">
                    <p className="eyebrow">Aura Odontología</p>
                    <h1>Odontólogos en Mendoza</h1>
                    
         <p className="lead">
                        Tratamiento de conducto, extracciones, implantes, ortodoncia y odontopediatría con un enfoque cercano y profesional.
                    </p>
                    <p className="support-copy">
                        Especialistas en muelas de juicio, caries, gingivitis y cuidado de dientes y encías. Atención personalizada con seguimiento y calidez.
                    </p>
                    <div className="intro-actions">
                        <a className="intro-action primary" href={`https://api.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noreferrer">Reservar turno</a>
                        <a className="intro-action secondary" href={mapsUrl} target="_blank" rel="noreferrer">Ver ubicacion</a>
                    </div>
                </div>
                <div className="list-section">
                    <div className="os-header">
                        <span className="os-title">Obras sociales</span>
                        <span className="os-badge show">
                            {matchCount} / {insurers.length}
                        </span>
                    </div>

                    <label className="os-search-wrap" htmlFor="search">
                        <input
                            type="text"
                            id="search"
                            placeholder="Buscar obra social..."
                            autoComplete="off"
                            value={search}
                            onChange={busqueda}
                            aria-label="Buscar obra social"
                        />
                        {isSearching && <button type="button" className="os-clear" onClick={() => setSearch("")} aria-label="Limpiar búsqueda">Limpiar</button>}
                    </label>

                    <ul className="os-grid" aria-label="Obras sociales">
                        {visibleInsurers.map((item) => (
                            <li key={item} className="os-item">{item}</li>
                        ))}
                    </ul>

                    {isSearching && matchCount === 0 && <p className="os-empty">Sin coincidencias</p>}
                </div>
            </section>
        </>
    )
}

export default Intro