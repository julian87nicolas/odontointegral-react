import "./styles/content.css"

function Content () {
    return (
        <>
            <section className="content first">
                <article>
                    <h2>Atención</h2>
                    <hr/ >
                    Tratamiento odontológico general para:
                    <li>Niños</li>
                    <li>Adolescentes</li>
                    <li>Adultos</li>
                    <li>Embarazadas</li>  
                </article>    
                <img src="./images/pacientes.webp" alt="imagen de siluetas humanas" width="400px" />
            </section>

            <div className="sep rev"></div>
            <section className="content rev">
                <article>
                    <h2>Ubicación</h2>
                    <hr />
                    <ul>
                        <li>OdontoSalud - Calle Gutenberg 123 Mendoza, Ciudad. <a className="maps" href="https://g.page/OdontoSalud-Mendoza?share" target="__blank">Maps</a></li>
                        <li>La casa de la salud - Carril Ponce 248 Mendoza, Rodeo de la Cruz <a className="maps" href="https://goo.gl/maps/X43oZSE6MMAN7J7cA" target="__blank">Maps</a> </li>
                    </ul>
                    
                </article>    
                <img src="./images/ubication.webp" alt="imagen de mapa" width="400px" />
            </section>
            <div className="sep"></div>
            <section className="content">
                <article>
                    <h2>Días y horarios de atención</h2>
                    <hr />
                    <ul>
                        <li>OdontoSalud - 9 a 14 hs</li>
                        <li>La Casa de la Salud - 14 a 19 hs</li>
                    </ul>
                </article>    
                <img src="./images/calendar.webp" alt="imagen de calendario" width="400px" />
            </section>
            <div className="sep"></div>
        </>
    )
}

export default Content