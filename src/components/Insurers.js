import { useState } from "react";
import { useClinic } from "../context/ClinicContext";
import "./styles/insurers.css";

function Insurers() {
    const { insurers } = useClinic();
    const [search, setSearch] = useState("");

    const isSearching = search.trim().length > 0;
    const filteredInsurers = insurers.filter((i) => i.toLowerCase().includes(search.toLowerCase()));
    const visibleInsurers = isSearching ? filteredInsurers : insurers;

    return (
        <section className="insurers reveal" aria-label="Obras sociales">
            <h2>Obras sociales</h2>
            <p className="content-lead">Buscá tu cobertura entre las que aceptamos.</p>

            <label className="insurers-search-wrap" htmlFor="search">
                <input
                    type="text"
                    id="search"
                    placeholder="Buscar obra social..."
                    autoComplete="off"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Buscar obra social"
                />
                {isSearching && <button type="button" className="insurers-clear" onClick={() => setSearch("")} aria-label="Limpiar búsqueda">Limpiar</button>}
            </label>

            <p className="insurers-count" key={filteredInsurers.length}>{filteredInsurers.length} / {insurers.length}</p>

            <ul className="insurers-grid" aria-label="Obras sociales">
                {visibleInsurers.map((item, index) => (
                    <li
                        key={item}
                        className="insurers-item"
                        style={{ "--pop-delay": `${Math.min(index, 12) * 0.02}s` }}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {isSearching && filteredInsurers.length === 0 && <p className="insurers-empty">Sin coincidencias</p>}
        </section>
    );
}

export default Insurers;
