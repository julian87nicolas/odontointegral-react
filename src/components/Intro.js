import { useState } from "react";

import Lista from "./Lista";
import { useClinic } from "../context/ClinicContext";

import "./styles/intro.css"

// import "./script.js"


function Intro () {
    const { whatsapp, mapsUrl } = useClinic();

    const OS = (["Avalian", "America Servicios", "Caja forense", "Conferencia episcopal argentina",
             "DASUTEN", "Docthos", "Federada Salud", "Galeno", "Gerdanna Salud", "HOPE",
             "Jerarquicos Salud", "Luis Pasteur", "Medicus", "OPDEA", "OSDIPP", "OSPIL",
             "OSPJN", "OSSACRA", "OSTV", "OSAPM", "OSSEG", "Prevencion Salud",
             "Swiss Medical", "Sancor Salud", "SCIS", "SADAIC", "Unimed", "Nobis", "OSADEF"]).sort();
    
    const tratamientos = ["Extracciones", "Tratamiento de conducto", "Blanqueamiento", "Limpieza dental",
                "Urgencias", "Caries", "Placas de relajación", "Protesis", "Implantes", "Perno-coronas", "Ortodoncia"].sort();
                

    const [showOS, setShowOS] = useState(false)
    const [showTr, setShowTr] = useState(false)
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
                    <p className="eyebrow">Clinica dental en Mendoza</p>
                    <h1>Aura Odontologia</h1>
                    <p className="lead">
                        Odontologia general para ninos y adultos.
                        Ortodoncia, implantes y protesis con un enfoque cercano y profesional.
                    </p>
                    <p className="support-copy">
                        Cuidamos sonrisas con calidez, seguimiento y atencion personalizada.
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
                        { showOS && <Lista lista={OS.filter(item => item.toLowerCase().includes(search.toLowerCase()))} className="OS"/>}
                        </div>
                    </div>
                    <div className="treatments list-button" onClick={() => setShowTr(!showTr)} role="button" tabIndex={0} aria-label="Mostrar lista de tratamientos" aria-expanded={showTr} onKeyDown={(event) => handleToggleWithKeyboard(event, setShowTr, showTr)}>
                    <span className="button-name">Tratamientos</span>
                        <div className="treatments lista">
                            { showTr && <Lista lista={tratamientos} className="treatments"/> }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Intro