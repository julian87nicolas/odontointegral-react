import "./styles/content.css"
import { useClinic } from "../context/ClinicContext";

function Content () {
    const { address, phone } = useClinic();
    const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <>
            <section className="content first reveal">
                <article>
                    <h2>Atención</h2>
                    <hr/ >
                    <p className="content-lead">Tratamiento odontologico general para:</p>
                    <ul>
                        <li>Niños</li>
                        <li>Adolescentes</li>
                        <li>Adultos</li>
                        <li>Embarazadas</li>
                    </ul>  
                </article>    
            </section>

            <div className="sep rev"></div>
            <section className="content rev has-image reveal">
                <article>
                    <h2>Ubicación</h2>
                    <hr />
                    <ul>
                        <li>{address} <a className="maps" href="https://maps.app.goo.gl/yNnJ3mpCqJ4SXjDF9" target="_blank" rel="noreferrer">Ver mapa</a></li>
                    </ul>
                    
                </article>
                <div className="map-embed" aria-hidden="true">
                    <iframe
                        title="Mapa de ubicación de Aura Odontología"
                        src={mapEmbedSrc}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
            <div className="sep"></div>
            <section className="content reveal">
                <article>
                    <h2>Días y horarios</h2>
                    <hr />
                    <ul>
                        <li>Lunes a Viernes de 9:00 a 18:00</li>
                        <li>Turnos: {phone}</li>
                    </ul>
                </article>
            </section>
            <div className="sep"></div>
        </>
    )
}

export default Content