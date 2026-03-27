import { useState, useRef, useEffect } from "react";
import "./styles/content.css"
import { useClinic } from "../context/ClinicContext";
import ServicesCarousel from "./ServicesCarousel";

function Content () {
    const { address, phone } = useClinic();
    const [phoneCopied, setPhoneCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const phoneCopiedTimerRef = useRef(null);
    const copyErrorTimerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    useEffect(() => {
        return () => {
            if (phoneCopiedTimerRef.current !== null) {
                window.clearTimeout(phoneCopiedTimerRef.current);
            }
            if (copyErrorTimerRef.current !== null) {
                window.clearTimeout(copyErrorTimerRef.current);
            }
        };
    }, []);

    /* Load the Google Maps iframe only when its container enters the viewport */
    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setMapVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const onCopyPhone = async () => {
        const showSuccess = () => {
            setPhoneCopied(true);
            setCopyError(false);
            if (phoneCopiedTimerRef.current !== null) {
                window.clearTimeout(phoneCopiedTimerRef.current);
            }
            phoneCopiedTimerRef.current = window.setTimeout(() => {
                setPhoneCopied(false);
                phoneCopiedTimerRef.current = null;
            }, 1800);
        };
        const showError = () => {
            setPhoneCopied(false);
            setCopyError(true);
            if (copyErrorTimerRef.current !== null) {
                window.clearTimeout(copyErrorTimerRef.current);
            }
            copyErrorTimerRef.current = window.setTimeout(() => {
                setCopyError(false);
                copyErrorTimerRef.current = null;
            }, 1800);
        };

        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(phone);
                showSuccess();
            } catch {
                showError();
            }
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = phone;
            textArea.style.position = 'absolute';
            textArea.style.left = '-9999px';
            textArea.setAttribute('aria-hidden', 'true');
            document.body.appendChild(textArea);
            try {
                textArea.focus();
                textArea.select();
                const success = document.execCommand('copy');
                if (success) {
                    showSuccess();
                } else {
                    showError();
                }
            } catch {
                showError();
            } finally {
                document.body.removeChild(textArea);
            }
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
            <section className="content has-image reveal" id="ubicacion">
                <article>
                    <h2>Ubicación</h2>
                    <hr />
                    <ul>
                        <li>
                            <address>{address}</address>
                            <a className="maps" href="https://maps.app.goo.gl/yNnJ3mpCqJ4SXjDF9" target="_blank" rel="noreferrer">Ver mapa</a>
                        </li>
                    </ul>
                    
                </article>
                <div className="map-embed" aria-hidden="true" ref={mapContainerRef}>
                    {mapVisible && (
                        <iframe
                            title="Mapa de ubicación de Aura Odontología en Godoy Cruz, Mendoza"
                            src={mapEmbedSrc}
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    )}
                </div>
            </section>
            <div className="sep"></div>
            <section className="content reveal" id="horarios">
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
                            {copyError && <span className="copy-phone-status copy-phone-error" role="alert" aria-live="assertive">No se pudo copiar</span>}
                        </li>
                    </ul>
                </article>
            </section>
            <div className="sep"></div>
        </>
    )
}

export default Content