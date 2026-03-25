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
            <section className="content rev reveal" id="servicios">
                <article>
                    <h2>Servicios y tratamientos</h2>
                    <hr />
                    <p className="content-lead">Nuestros odontólogos en Godoy Cruz, Mendoza ofrecen una amplia variedad de tratamientos dentales:</p>
                    <div className="services-list">
                        <details className="service-item">
                            <summary>Tratamiento de conducto</summary>
                            <p>Endodoncia profesional para salvar dientes afectados por infección o daño en la pulpa dental.</p>
                        </details>
                        <details className="service-item">
                            <summary>Extracciones</summary>
                            <p>Extracción de dientes y muelas con técnicas modernas y mínimo dolor.</p>
                        </details>
                        <details className="service-item">
                            <summary>Muelas de juicio</summary>
                            <p>Extracción segura de terceros molares con seguimiento post-operatorio.</p>
                        </details>
                        <details className="service-item">
                            <summary>Implantes dentales</summary>
                            <p>Reemplazo de piezas dentales perdidas con implantes de alta calidad.</p>
                        </details>
                        <details className="service-item">
                            <summary>Ortodoncia</summary>
                            <p>Corrección de la alineación de dientes y mordida para niños y adultos.</p>
                        </details>
                        <details className="service-item">
                            <summary>Odontopediatría</summary>
                            <p>Atención dental especializada para niños y bebés con un enfoque cálido.</p>
                        </details>
                        <details className="service-item">
                            <summary>Caries</summary>
                            <p>Diagnóstico, tratamiento y prevención de caries dentales.</p>
                        </details>
                        <details className="service-item">
                            <summary>Gingivitis y encías</summary>
                            <p>Tratamiento de gingivitis y enfermedades de las encías para mantener una boca saludable.</p>
                        </details>
                        <details className="service-item">
                            <summary>Limpieza dental</summary>
                            <p>Higiene profesional para dientes y encías.</p>
                        </details>
                        <details className="service-item">
                            <summary>Blanqueamiento dental</summary>
                            <p>Tratamiento estético para una sonrisa más blanca.</p>
                        </details>
                        <details className="service-item">
                            <summary>Prótesis dentales</summary>
                            <p>Prótesis fijas y removibles para restaurar la función dental.</p>
                        </details>
                    </div>
                </article>
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