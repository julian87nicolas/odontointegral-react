import { useRef } from "react";
import "./styles/gallery.css";

const photos = [
    {
        id: "equipo",
        src: "/images/equipo.webp",
        alt: "Equipo de Aura Odontología en el consultorio",
        caption: "Nuestro equipo",
    },
    {
        id: "atencion",
        src: "/images/atencion-real.webp",
        alt: "Profesional de Aura Odontología explicando un tratamiento a una paciente",
        caption: "Atención profesional",
    },
    {
        id: "modelo",
        src: "/images/modelo-dental.webp",
        alt: "Profesional de Aura Odontología mostrando un modelo dental",
        caption: "Diagnóstico y planificación",
    },
];

function Gallery() {
    const trackRef = useRef(null);

    const scrollByAmount = (direction) => {
        const track = trackRef.current;
        if (!track) return;
        track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
    };

    return (
        <section className="gallery reveal" aria-label="Galería de fotos">
            <div className="gallery-heading">
                <h2>Conocé Aura Odontología</h2>
                <div className="gallery-nav">
                    <button type="button" className="gallery-nav-btn" onClick={() => scrollByAmount(-1)} aria-label="Foto anterior">&lt;</button>
                    <button type="button" className="gallery-nav-btn" onClick={() => scrollByAmount(1)} aria-label="Foto siguiente">&gt;</button>
                </div>
            </div>
            <div className="gallery-track" ref={trackRef}>
                {photos.map((photo) => (
                    <figure className="gallery-item" key={photo.id}>
                        <img src={photo.src} alt={photo.alt} loading="lazy" />
                        <figcaption>{photo.caption}</figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}

export default Gallery;
