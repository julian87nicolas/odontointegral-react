import "./styles/about.css";

function About () {
    return (
        <>
            <section className="content first about">
                <article>
                <h2>Florencia Sconfienza - Odontóloga</h2>
                    <h3>Educación</h3>
                    
                        <b>Universidad de Mendoza</b> - Facultad de ciencias de la salud
                        <br />
                        Odontología
                            2016 – 2021
                    <h3>Experiencia laboral</h3>
                    <ul className="about-list">
                        <li>
                            <b>OdontoSalud</b>, clínica odontológica privada (Gutenberg 123, ciudad)
                            <div className="job-state">Trabajando actualmente</div>
                        </li>
                        <li>
                            <b>Casa de la Salud</b>, centro médico (Carril Ponce 248, Rodeo de la cruz)
                            <div className="job-state">Trabajando actualmente</div>
                        </li>
                        <li>
                            <b>Odontomás</b>
                            , clínica odontológica integral (Paseo de compras Hipermercado Libertad - Godoy Cruz)
                            <div className="job-state">Trabajando actualmente</div> 
                        </li>
                        <li><b>Hospital Doctor Domingo Sicoli</b>
                        , Prácticas Profesionales Supervisadas
                            <div className="job-state">Año 2021</div>
                        </li>
                    </ul>
                    
                    <h3>Cursos y especializaciones</h3>
                    <ul className="about-list">
                        <li>
                            <b>Diplomatura en cirugía dentoalveolar – Universidad de Mendoza</b>
                            <div className="job-state">Cursando actualmente</div>
                        </li>
                        <li>
                            <b>Curso de Ortodoncia Preventiva e interceptiva – Dra Rayane Pinto
                            (Brasil)</b>
                            <div className="job-state">Año 2022</div>
                        </li>
                        <li>
                            <b>Lactancia materna – Edulacta</b>
                            <div className="job-state">Año 2021</div>
                        </li>
                    </ul>
                </article>
                <img src="images/profile.webp" alt="foto de perfil" width="400px" />
            </section>

            <div className="resume-download">
                <a href="res/CV.pdf" target="__blank">Descargar CV</a>
            </div>
        </>
    )
}

export default About