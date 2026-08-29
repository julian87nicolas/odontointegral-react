import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./styles/content.css"
import { useClinic } from "../context/ClinicContext";
import { CheckIcon } from "./Icons";

const STATEMENT_PREFIX = "Cuidamos tu sonrisa";
const STATEMENT_SUFFIXES = [", desde el primer día.", ", en cada etapa.", ", en cada visita."];
const STATEMENT_LONGEST = STATEMENT_PREFIX + STATEMENT_SUFFIXES.reduce((a, b) => (b.length > a.length ? b : a));
const TYPE_SPEED = 45;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 300;
const PAUSE_BEFORE_START = 600;

function useTypewriterSuffix(words) {
    const [text, setText] = useState("");
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setReducedMotion(true);
            setText(words[0]);
            return;
        }

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        const tick = () => {
            const currentWord = words[wordIndex];

            if (!isDeleting) {
                charIndex += 1;
                setText(currentWord.slice(0, charIndex));
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    timeoutId = window.setTimeout(tick, PAUSE_AFTER_TYPE);
                    return;
                }
                timeoutId = window.setTimeout(tick, TYPE_SPEED);
            } else {
                charIndex -= 1;
                setText(currentWord.slice(0, charIndex));
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    timeoutId = window.setTimeout(tick, PAUSE_AFTER_DELETE);
                    return;
                }
                timeoutId = window.setTimeout(tick, DELETE_SPEED);
            }
        };

        timeoutId = window.setTimeout(tick, PAUSE_BEFORE_START);
        return () => window.clearTimeout(timeoutId);
    }, [words]);

    return { text, reducedMotion };
}

function Content () {
    const { address, phone } = useClinic();
    const [phoneCopied, setPhoneCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const phoneCopiedTimerRef = useRef(null);
    const copyErrorTimerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const { text: statementSuffix, reducedMotion } = useTypewriterSuffix(STATEMENT_SUFFIXES);
    const statementHeadlineRef = useRef(null);
    const statementProbeRef = useRef(null);

    /* Keep the statement headline on a single line and at a constant size:
       measure the longest possible phrase once (not the text being typed)
       so the scale never fluctuates while typing/deleting, only on resize. */
    useLayoutEffect(() => {
        const fit = () => {
            const heading = statementHeadlineRef.current;
            const probe = statementProbeRef.current;
            if (!heading || !probe) return;
            const containerWidth = heading.parentElement.clientWidth;
            const naturalWidth = probe.scrollWidth;
            const scale = naturalWidth > containerWidth ? containerWidth / naturalWidth : 1;
            heading.style.transform = `scale(${scale})`;
        };

        fit();
        window.addEventListener("resize", fit);
        return () => window.removeEventListener("resize", fit);
    }, []);

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
            <section className="statement reveal">
                <h2>
                    <span className="sr-only">{STATEMENT_PREFIX}{STATEMENT_SUFFIXES[0]}</span>
                    <span className="statement-headline" ref={statementHeadlineRef} aria-hidden="true">
                        {STATEMENT_PREFIX}
                        <span className={`typewriter-suffix${reducedMotion ? "" : " typewriter-suffix--typing"}`}>{statementSuffix}</span>
                    </span>
                    <span className="statement-headline statement-headline-probe" ref={statementProbeRef} aria-hidden="true">{STATEMENT_LONGEST}</span>
                </h2>
                <p className="statement-lead">Tratamiento odontológico general para niños, adolescentes, adultos y embarazadas, con seguimiento cercano en cada etapa.</p>
                <ul className="statement-list">
                    <li>Niños (odontopediatría)</li>
                    <li>Adolescentes</li>
                    <li>Adultos</li>
                    <li>Embarazadas</li>
                </ul>
            </section>

            <section className="content-block reveal" id="ubicacion">
                <div className="content-block-inner content-block-inner-three">
                    <div>
                        <h2>Ubicación</h2>
                        <address>{address}</address>
                        <a className="text-link" href="https://maps.app.goo.gl/yNnJ3mpCqJ4SXjDF9" target="_blank" rel="noreferrer">Ver mapa &gt;</a>
                    </div>
                    <img
                        className="location-photo"
                        src="/images/fachada-telefono.webp"
                        alt="Fachada del consultorio de Aura Odontología"
                        loading="lazy"
                        width="1200"
                        height="727"
                    />
                    <div className="map-embed" aria-hidden="true" ref={mapContainerRef}>
                        {mapVisible && (
                            <iframe
                                title="Mapa de ubicación de Aura Odontología en Godoy Cruz, Mendoza"
                                src={mapEmbedSrc}
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        )}
                    </div>
                </div>
            </section>

            <section className="content-block reveal" id="horarios">
                <h2>Días y horarios</h2>
                <dl className="hours-list">
                    <div className="hours-row">
                        <dt>Atención</dt>
                        <dd>Lunes a Viernes de 9:00 a 20:00hs</dd>
                    </div>
                    <div className="hours-row">
                        <dt>Turnos</dt>
                        <dd className="content-phone-row">
                            <button type="button" className="copy-phone-btn" onClick={onCopyPhone}>
                                {phone}
                            </button>
                            {phoneCopied && (
                                <span className="copy-phone-status" role="status" aria-live="polite">
                                    <CheckIcon className="copy-phone-check" size={14} />
                                    Copiado
                                </span>
                            )}
                            {copyError && <span className="copy-phone-status copy-phone-error" role="alert" aria-live="assertive">No se pudo copiar</span>}
                        </dd>
                    </div>
                </dl>
            </section>
        </>
    )
}

export default Content
