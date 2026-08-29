import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClinic } from "../context/ClinicContext";
import { WhatsappIcon, InstagramIcon, MailIcon, SunIcon, MoonIcon, CheckIcon } from "./Icons";

import "./styles/nav.css"


function Nav () {
    const { name, email, whatsapp, instagram } = useClinic();

    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
    const [emailCopied, setEmailCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            setScrolled(window.pageYOffset > 4);

            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                setScrollProgress(docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0);
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => (current === "light" ? "dark" : "light"));
    };

    const copyEmail = async () => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const input = document.createElement("input");
                input.value = email;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
            }

            setEmailCopied(true);
            window.setTimeout(() => setEmailCopied(false), 1800);
        } catch (error) {
            window.prompt("Copia este email:", email);
        }
    };

    const brandLogoWebp = theme === "dark" ? "/images/aura-dark.webp" : "/images/aura-light.webp";
    const brandLogoPng = theme === "dark" ? "/images/aura-dark.png" : "/images/aura-light.png";

    return (
        <>
        <a href="#main-content" className="skip-to-content">Saltar al contenido principal</a>
        <div className={scrolled ? "nav nav-scrolled" : "nav"}>
            <div className="nav-content">
                <Link to="/" className="brand" aria-label={`Ir a la página principal de ${name}`}>
                    <picture>
                        <source srcSet={brandLogoWebp} type="image/webp" />
                        <img src={brandLogoPng} alt={`Logo de ${name}`} className="logo" fetchpriority="high" width="256" height="144" />
                    </picture>
                    <span className="brand-text">{name}</span>
                </Link>
                <nav className="nav-links" aria-label="Navegación principal">
                    <a href="#servicios" className="nav-link">Servicios</a>
                    <a href="#ubicacion" className="nav-link">Ubicación</a>
                    <a href="#contacto" className="nav-link">Contacto</a>

                    <span className="nav-divider" aria-hidden="true"></span>

                    <a href={`https://api.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noreferrer" className="nav-icon" title="Contactar por WhatsApp" aria-label="Contactar por WhatsApp">
                        <WhatsappIcon />
                    </a>
                    <a href={instagram} target="_blank" rel="noreferrer" className="nav-icon" title="Seguir en Instagram" aria-label="Seguir en Instagram">
                        <InstagramIcon />
                    </a>
                    <button
                        type="button"
                        className="nav-icon"
                        title={emailCopied ? "Email copiado" : "Copiar email"}
                        aria-label={emailCopied ? "Email copiado" : "Copiar email"}
                        onClick={copyEmail}
                    >
                        <span className="icon-swap">
                            <MailIcon className={`icon-swap-item${emailCopied ? "" : " is-active"}`} />
                            <CheckIcon className={`icon-swap-item${emailCopied ? " is-active" : ""}`} />
                        </span>
                    </button>
                    <button type="button" className="nav-icon" title="Alternar tema" aria-label="Alternar tema claro u oscuro" onClick={toggleTheme}>
                        <span className="icon-swap">
                            <SunIcon className={`icon-swap-item${theme === "light" ? " is-active" : ""}`} />
                            <MoonIcon className={`icon-swap-item${theme === "dark" ? " is-active" : ""}`} />
                        </span>
                    </button>

                    <a href={`https://api.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noreferrer" className="nav-cta">Reservar turno</a>
                </nav>
            </div>
            <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true"></div>
        </div>
        </>
    )
}

export default Nav
