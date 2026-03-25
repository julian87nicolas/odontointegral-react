import { useState } from "react";
import "./styles/content.css"
import { useClinic } from "../context/ClinicContext";
import ServicesCarousel from "./ServicesCarousel";

function Content () {
    const { address, phone } = useClinic();
    const [phoneCopied, setPhoneCopied] = useState(false);
    const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    const onCopyPhone = async () => {
        try {
            await navigator.clipboard.writeText(phone);
            setPhoneCopied(true);
            window.setTimeout(() => setPhoneCopied(false), 1800);
        } catch (error) {
            setPhoneCopied(false);
        }
    };

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
                <p className="content-lead">Amplia variedad de tratamientos dentales:</p>
                <ServicesCarousel />
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
                        <li>Lunes a Viernes de 9:00 a 20:00hs</li>
                        <li>
                            Turnos:
                            <button type="button" className="copy-phone-btn" onClick={onCopyPhone}>
                                {phone}
                            </button>
                            {phoneCopied && <span className="copy-phone-status" role="status" aria-live="polite">Copiado</span>}
                        </li>
                    </ul>
                </article>
            </section>
            <div className="sep"></div>
        </>
    )
}

export default Content