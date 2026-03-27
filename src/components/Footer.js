import { useClinic } from "../context/ClinicContext";
import "./styles/footer.css"

function Footer () {
    const { address, phone } = useClinic();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        <footer>
            <div className="footer-inner">
                <nav className="footer-nav" aria-label="Navegación del pie de página">
                    <ul>
                        <li><a href="#main-content" onClick={(event) => { event.preventDefault(); scrollToTop(); }}>Inicio</a></li>
                        <li><a href="#servicios">Servicios</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </nav>
                <address className="footer-contact">
                    <a href={`tel:${phone}`}>{phone}</a>
                    <span>{address}</span>
                </address>
                <a href="https://julian-camargo.onrender.com/" target="_blank" rel="noreferrer" className="footer-creator">Page creator</a>
            </div>
        </footer>
    )
}

export default Footer   