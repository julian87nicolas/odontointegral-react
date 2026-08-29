import "./styles/specialties.css";

const services = [
    { id: "conducto", title: "Tratamiento de conducto", description: "Endodoncia profesional para salvar dientes afectados por infección o daño en la pulpa dental." },
    { id: "extracciones", title: "Extracciones", description: "Extracción de dientes y muelas con técnicas modernas y mínimo dolor." },
    { id: "muelas", title: "Muelas de juicio", description: "Extracción segura de terceros molares con seguimiento post-operatorio." },
    { id: "implantes", title: "Implantes dentales", description: "Reemplazo de piezas dentales perdidas con implantes de alta calidad." },
    { id: "ortodoncia", title: "Ortodoncia", description: "Corrección de la alineación de dientes y mordida para niños y adultos." },
    { id: "odontopediatria", title: "Odontopediatría", description: "Atención dental especializada para niños y bebés con un enfoque cálido." },
    { id: "caries", title: "Caries", description: "Diagnóstico, tratamiento y prevención de caries dentales." },
    { id: "limpieza", title: "Limpieza dental", description: "Higiene profesional para dientes y encías." },
    { id: "blanqueamiento", title: "Blanqueamiento dental", description: "Tratamiento estético para una sonrisa más blanca." },
    { id: "protesis", title: "Prótesis dentales", description: "Prótesis fijas y removibles para restaurar la función dental." },
    { id: "urgencias", title: "Urgencias", description: "Atención de urgencias dentales: dolor agudo, traumatismos, infecciones y emergencias bucodentales." },
];

function Specialties() {
    return (
        <section className="specialties reveal" id="servicios" aria-label="Especialidades">
            <h2>Especialidades</h2>
            <div className="specialties-grid">
                {services.map((service, index) => (
                    <div
                        className="specialty reveal"
                        style={{ "--reveal-delay": `${Math.floor(index / 4) * 0.12}s` }}
                        key={service.id}
                    >
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Specialties;
