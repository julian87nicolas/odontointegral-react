import { useState } from "react";

import Lista from "./Lista";

import "./styles/intro.css"

// import "./script.js"


function Intro () {

    const OS = (["Avalian", "America Servicios", "Caja forense", "Conferencia episcopal argentina",
             "DASUTEN", "DAMSU", "Docthos", "Federada Salud", "Galeno", "Gerdanna Salud", "HOPE",
             "Jerarquicos Salud", "Luis Pasteur", "Medicus", "OPDEA", "OSDIPP", "OSPIL",
             "OSPJN", "OSSACRA", "OSTV", "OSAPM", "OSSEG", "Policia Federal", "Prevencion Salud",
             "Swiss Medical", "Sancor Salud", "SCIS", "SADAIC", "Unimed", "OSEP", "OSADEF"]).sort();
    
    const tratamientos = ["Extracciones", "Tratamiento de conducto", "Blanqueamiento", "Limpieza dental",
                "Urgencias", "Caries", "Placas de relajación", "Protesis", "Implantes", "Perno-coronas"].sort();
                

    const [showOS, setShowOS] = useState(false)
    const [showTr, setShowTr] = useState(false)
    const [search, setSearch] = useState("");

    const busqueda = (event) => {
        setSearch(event.target.value)
    }

    return (
        <>
            <section className="intro">
                <p>
                    Nos comprometemos con el cuidado de tu salud bucal brindando apoyo y seguimiento
                    profesional.
                    <br />
                    Junto con el apoyo de profesionales de diferentes especialidades
                    y equipamiento acorde, nos caracterizamos por una atención distinguida.
                </p>
                <div className="list-section">
                    <input type="text" id="search" placeholder="buscá tu obra social..." autoComplete="off" value={search} onInput={ busqueda } />
                    <div className="list-button" onClick={() => setShowOS(!showOS)}>
                        <span className="button-name">Obras sociales</span>
                        <div className="lista">
                        { showOS && <Lista lista={OS.filter(item => item.toLowerCase().includes(search.toLowerCase()))} className="OS"/>}
                        </div>
                    </div>
                    <div className="treatments list-button" onClick={() => setShowTr(!showTr)}>
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