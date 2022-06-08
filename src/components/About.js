import "./styles/about.css";

function About () {
    return (
        <>
            <section className="content first about">
                <article>
                <h2>Florencia Sconfienza</h2>
                <h3>Odontóloga</h3>
                    Tengo 24 años, con buena
                    capacidad para relacionarme ya sea
                    con pacientes o con un equipo de
                    trabajo. Pretendo seguir formándome
                    para ser una mejor profesional y
                    poder brindar un buen servicio.
                    <h3>Educación</h3>
                    <ul>
                        <li><b>Universidad de Mendoza</b></li>
                        <li>Facultad de ciencias de la salud</li>
                        <li>Odontología
                            2016 – 2021</li>
                    </ul>

                    <h3>Experiencia laboral</h3>
                    <ul>
                        <li>
                            <b>OdontoSalud</b>, clínica odontológica privada (Gutenberg 123, ciudad)
                            Trabajando actualmente
                        </li> <hr />
                        <li>
                            <b>Casa de la Salud</b>, centro médico (Carril Ponce 248, Rodeo de la cruz)
                            Trabajando actualmente
                        </li> <hr />
                        <li><b>Hospital Doctor Domingo Sicoli</b>, Prácticas Profesionales Supervisadas
                            Año 2021
                            Atención general de niños y adultos
                        </li> <hr />
                    </ul>
                    
                    <h3>Cursos y especializaciones</h3>
                    <ul>
                        <li>
                            <b>Diplomatura en cirugía dentoalveolar – Universidad de Mendoza</b> <br /> Cursando actualmente
                        </li> <hr />
                        <li>
                            <b>Curso de Ortodoncia Preventiva e interceptiva – Dra Rayane Pinto
                            (Brasil)</b> <br /> Año 2022
                        </li> <hr />
                        <li>
                            <b>Lactancia materna – Edulacta</b> <br /> Año 2021
                        </li> <hr />
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