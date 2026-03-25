import { useState } from "react";

import Lista from "./Lista";
import { useClinic } from "../context/ClinicContext";

import "./styles/intro.css"


function Intro () {
    const { whatsapp, mapsUrl, insurers } = useClinic();

    const [showOS, setShowOS] = useState(false)
    const [search, setSearch] = useState("");

    const busqueda = (event) => {
        setSearch(event.target.value)
    };

    const handleToggleWithKeyboard = (event, setter, currentState) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setter(!currentState);
        }
    };

    return (
        <>
            <section className="intro">
                <div className="intro-copy">
                    <p className="eyebrow">Clínica odontológica en Mendoza</p>
                    <h1>Aura Odontología</h1>
                    
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
                    <input type="text" id="search" placeholder="Busca tu obra social..." autoComplete="off" value={search} onChange={busqueda} aria-label="Buscar obra social" />
                <div className="list-button" onClick={() => setShowOS(!showOS)} role="button" tabIndex={0} aria-label="Mostrar lista de obras sociales" aria-expanded={showOS} onKeyDown={(event) => handleToggleWithKeyboard(event, setShowOS, showOS)}>
                        <span className="button-name">Obras sociales</span>
                        <div className="lista">
                        { showOS && <Lista lista={insurers.filter(item => item.toLowerCase().includes(search.toLowerCase()))} className="OS"/>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Intro