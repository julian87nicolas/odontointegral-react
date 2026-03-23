import "./styles/footer.css"
import { Link } from "react-router-dom";

function Footer () {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        <footer>
            <ul>
                <li><a href="#top" className="init" onClick={(event) => { event.preventDefault(); scrollToTop(); }}>Inicio</a></li>
                <li><Link to="/about">Sobre</Link></li>
                <li>Created by: <a href="https://julian87nicolas.github.io/" target="_blank" rel="noreferrer">Julián Camargo</a></li>
            </ul>       
        </footer>
    )
}

export default Footer   