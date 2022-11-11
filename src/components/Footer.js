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
                <li><a href =" " class="init" onClick={() => { scrollToTop() }}>Inicio</a></li>
                <li><a href="/about">Sobre</a></li>
                <li>Created by: <a href="https://julian87nicolas.github.io/" target="blank">Julián Camargo</a></li>
            </ul>       
        </footer>
    )
}

export default Footer   