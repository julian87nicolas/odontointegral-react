import "./styles/footer.css"

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
                <li><a href="https://julian-camargo.onrender.com/" target="_blank" rel="noreferrer">Page creator</a></li>
            </ul>       
        </footer>
    )
}

export default Footer   