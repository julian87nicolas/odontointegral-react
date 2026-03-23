import { useEffect, useState } from "react";

import "./styles/nav.css"


function Nav () {

    const [navBar, setNavBar] = useState(true);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
        const onScroll = () => {
            setNavBar(window.pageYOffset === 0);
        };

        window.addEventListener("scroll", onScroll);
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

    return (
        <>
        <div className={navBar ? "nav" : "nav white"}>
            <div className="nav-content">
                <a href="/" className="brand" aria-label="Ir a la página principal de Aura Odontología">
                    <img src="/images/aura.jpg" alt="Logo de Aura Odontología" className="logo" />
                    <span className="brand-text">Aura Odontología</span>
                </a>
                <nav className="nav-links" aria-label="Navegación principal">
                    <a href="/" className="nav-item home" title="Ir a la página principal" aria-label="Página principal">
                        <i className="fa-solid fa-house" aria-hidden="true"></i>
                    </a>
                    <a href="about" className="nav-item about" title="Conocer sobre la dentista" aria-label="Sobre nosotros">
                        <i className="fa-solid fa-circle-question" aria-hidden="true"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=542617528107" target="_blank" rel="noreferrer" className="nav-item whatsapp" title="Contactar por WhatsApp" aria-label="Contactar por WhatsApp">
                        <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.instagram.com/odontologia_aura/" target="_blank" rel="noreferrer" className="nav-item instagram" title="Seguir en Instagram" aria-label="Seguir en Instagram">
                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="mailto:auradentalmza@gmail.com" target="_blank" rel="noreferrer" className="nav-item email" title="Enviar email" aria-label="Enviar email">
                        <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                    </a>
                    <button type="button" className="nav-item theme-toggle" title="Alternar tema" aria-label="Alternar tema claro u oscuro" onClick={toggleTheme}>
                        <i className={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"}`} aria-hidden="true"></i>
                    </button>
                </nav>
            </div>
        </div>
        </>  
    )
}

export default Nav