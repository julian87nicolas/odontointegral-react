import "./styles/content.css"

function Content () {
    return (
        <>
            <section className="content first reveal">
                <article>
                    <h2>Atención</h2>
                    <hr/ >
                    Tratamiento odontológico general para:
                    <ul>
                        <li>Niños</li>
                        <li>Adolescentes</li>
                        <li>Adultos</li>
                        <li>Embarazadas</li>
                    </ul>  
                </article>    
                <img src="./images/pacientes.webp" alt="Siluetas de pacientes - atención odontológica para niños, adolescentes, adultos y embarazadas" width="400" loading="lazy" decoding="async" />
            </section>

            <div className="sep rev"></div>
            <section className="content rev reveal">
                <article>
                    <h2>Ubicación</h2>
                    <hr />
                    <ul>
                        <li>Balcarce 36, M5501 Godoy Cruz, Mendoza<a className="maps" href="https://maps.app.goo.gl/yNnJ3mpCqJ4SXjDF9" target="_blank" rel="noreferrer">Maps</a></li>
                    </ul>
                    
                </article>    
                <img src="./images/ubication.webp" alt="Mapa de ubicaciones - clínicas asociadas en Mendoza" width="400" loading="lazy" decoding="async" />
            </section>
            <div className="sep"></div>
            <section className="content reveal">
                <article>
                    <h2>Días y horarios de atención</h2>
                    <hr />
                    <ul>
                        <li>Lunes a Viernes de 9:00 a 18:00</li>
                        <li>Turnos: 02617528107</li>
                    </ul>
                </article>    
                <img src="./images/calendar.webp" alt="Calendario - días y horarios de atención odontológica" width="400" loading="lazy" decoding="async" />
            </section>
            <div className="sep"></div>
        </>
    )
}

export default Content