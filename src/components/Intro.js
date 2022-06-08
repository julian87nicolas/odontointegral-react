import { useState } from "react";

import Lista from "./Lista";

import "./styles/intro.css"

// import "./script.js"


function Intro () {

    const OS = (["Avalian", "America Servicios", "Caja forense", "Conferencia episcopal argentina",
             "DASUTEN", "DAMSU", "Docthos", "Federada Salud", "Galeno", "Gerdanna Salud", "HOPE",
             "Jerarquicos Salud", "Luis Pasteur", "Medicus", "OPDEA", "OSDIPP", "OSJERA", "OSPIL",
             "OSPJN", "OSSACRA", "OSTV", "OSAPM", "OSSEG", "Policia Federal", "Prevencion Salud",
             "Swiss Medical", "Sancor Salud", "SCIS", "SADAIC", "Unimed", "OSEP"]).sort();
    
    const tratamientos = ["Extracciones", "Tratamiento de conducto", "Blanqueamiento", "Limpieza dental",
                "Urgencias", "Caries", "Placas de relajación", "Protesis", "Implantes", "Perno-coronas"].sort();
                

    const [showOS, setShowOS] = useState(false)
    const [showTr, setShowTr] = useState(false)

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
                    <input type="text" id="search" placeholder="buscá tu obra social..." autocomplete="off"/>
                    <div className="list-button" onClick={() => setShowOS(!showOS)}>
                        Obras sociales
                        <div className="lista">
                        { showOS && <Lista lista={OS} /> }
                        </div>
                    </div>
                    <div className="treatments list-button" onClick={() => setShowTr(!showTr)}>
                        Tratamientos
                        <div className="treatments lista">
                            { showTr && <Lista lista={tratamientos} /> }
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Intro