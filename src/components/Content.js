import "./styles/content.css"
import { useClinic } from "../context/ClinicContext";

function Content () {
    const { address, phone } = useClinic();
    const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <>
            <section className="content first reveal">
                <article>
                    <h2>Atención odontológica en Mendoza</h2>
                    <hr/ >
                    <p className="content-lead">Tratamiento odontológico general para:</p>
                    <ul>
                        <li>Niños (odontopediatría)</li>
                        <li>Adolescentes</li>
                        <li>Adultos</li>
                        <li>Embarazadas</li>
                    </ul>  
                </article>    
            </section>

            <div className="sep rev"></div>
            <section className="services-section reveal" id="servicios">
                <h2>Servicios y tratamientos</h2>
                <hr />
                <p className="content-lead">Nuestros odontólogos en Godoy Cruz, Mendoza ofrecen una amplia variedad de tratamientos dentales:</p>
                <div className="services-grid">
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-tooth" aria-hidden="true"></i></div>
                        <h3>Tratamiento de conducto</h3>
                        <p>Endodoncia profesional para salvar dientes afectados por infección o daño en la pulpa dental.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-hand-holding-medical" aria-hidden="true"></i></div>
                        <h3>Extracciones</h3>
                        <p>Extracción de dientes y muelas con técnicas modernas y mínimo dolor.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-teeth" aria-hidden="true"></i></div>
                        <h3>Muelas de juicio</h3>
                        <p>Extracción segura de terceros molares con seguimiento post-operatorio.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div>
                        <h3>Implantes dentales</h3>
                        <p>Reemplazo de piezas dentales perdidas con implantes de alta calidad.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-teeth-open" aria-hidden="true"></i></div>
                        <h3>Ortodoncia</h3>
                        <p>Corrección de la alineación de dientes y mordida para niños y adultos.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-child" aria-hidden="true"></i></div>
                        <h3>Odontopediatría</h3>
                        <p>Atención dental especializada para niños y bebés con un enfoque cálido.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i></div>
                        <h3>Caries</h3>
                        <p>Diagnóstico, tratamiento y prevención de caries dentales.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-droplet" aria-hidden="true"></i></div>
                        <h3>Gingivitis y encías</h3>
                        <p>Tratamiento de gingivitis y enfermedades de las encías para mantener una boca saludable.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-broom" aria-hidden="true"></i></div>
                        <h3>Limpieza dental</h3>
                        <p>Higiene profesional para dientes y encías.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-sun" aria-hidden="true"></i></div>
                        <h3>Blanqueamiento dental</h3>
                        <p>Tratamiento estético para una sonrisa más blanca.</p>
                    </article>
                    <article className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-puzzle-piece" aria-hidden="true"></i></div>
                        <h3>Prótesis dentales</h3>
                        <p>Prótesis fijas y removibles para restaurar la función dental.</p>
                    </article>
                </div>
            </section>

            <div className="sep"></div>
            <section className="content has-image reveal">
                <article>
                    <h2>Ubicación</h2>
                    <hr />
                    <ul>
                        <li>{address} <a className="maps" href="https://maps.app.goo.gl/yNnJ3mpCqJ4SXjDF9" target="_blank" rel="noreferrer">Ver mapa</a></li>
                    </ul>
                    
                </article>
                <div className="map-embed" aria-hidden="true">
                    <iframe
                        title="Mapa de ubicación de Aura Odontología en Godoy Cruz, Mendoza"
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
                        <li>Lunes a Viernes de 9:00 a 20:00</li>
                        <li>Turnos: {phone}</li>
                    </ul>
                </article>
            </section>
            <div className="sep"></div>
        </>
    )
}

export default Content