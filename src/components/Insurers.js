import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useClinic } from "../context/ClinicContext";
import "./styles/insurers.css";

const ROW_BREAK = Symbol("row-break");

function Insurers() {
    const { insurers } = useClinic();
    const [search, setSearch] = useState("");
    /* The input's own value updates instantly (below), but the match/dim
       classification is applied one animation frame later. Without that gap,
       React can commit the new classes before the browser has painted the
       previous ones, so there is nothing for the CSS transition to animate
       from and the colors snap instead of fading. */
    const [highlightSearch, setHighlightSearch] = useState("");
    const itemRefs = useRef(new Map());
    const prevRectsRef = useRef(new Map());
    const prevMatchedRef = useRef(new Map());
    const prevStyleRef = useRef(new Map());

    useEffect(() => {
        const id = requestAnimationFrame(() => setHighlightSearch(search));
        return () => cancelAnimationFrame(id);
    }, [search]);

    const isSearching = highlightSearch.trim().length > 0;
    const term = highlightSearch.trim().toLowerCase();

    const { matches, rest } = useMemo(() => {
        if (!isSearching) {
            return { matches: insurers, rest: [] };
        }
        const m = [];
        const r = [];
        insurers.forEach((name) => {
            (name.toLowerCase().includes(term) ? m : r).push(name);
        });
        return { matches: m, rest: r };
    }, [insurers, isSearching, term]);

    const matchSet = useMemo(() => new Set(matches), [matches]);

    /* Render matches and non-matches from ONE combined array/map so React
       reconciles them as a single list: an item can then MOVE across the
       matches/rest boundary (key stays put) instead of being unmounted from
       one .map() and remounted in another, which would restart its mount
       animation and make the match/dim color transition snap instead of
       fade (there's no "previous" opacity to transition from on a fresh node). */
    const orderedInsurers = useMemo(() => {
        if (isSearching && matches.length > 0 && rest.length > 0) {
            return [...matches, ROW_BREAK, ...rest];
        }
        return [...matches, ...rest];
    }, [matches, rest, isSearching]);

    /* Slide + fade a pill only when its match status actually flips between
       searches/renders — pills that stay a match or stay filtered out never
       animate, even if a sibling's change reflows or recolors them.

       Both the slide and the color/opacity fade run through the Web
       Animations API with explicit from/to keyframes, rather than a CSS
       `transition`: for reasons that didn't reproduce with a plain manual
       class toggle, letting React apply the is-match/is-dim class directly
       and relying on a declared CSS transition to animate opacity/colors
       consistently snapped instantly instead of fading in this component.
       Driving it explicitly here sidesteps that regardless of the exact
       cause, since WAAPI keyframes don't depend on the browser detecting a
       "before vs after style" change across a render. */
    useLayoutEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const newRects = new Map();
        const newStyles = new Map();

        itemRefs.current.forEach((node, name) => {
            if (!node) return;
            newRects.set(name, node.getBoundingClientRect());
            const cs = getComputedStyle(node);
            newStyles.set(name, {
                opacity: cs.opacity,
                borderColor: cs.borderColor,
                backgroundColor: cs.backgroundColor,
                color: cs.color,
            });
        });

        newRects.forEach((rect, name) => {
            const isMatched = !isSearching || matchSet.has(name);
            const prevRect = prevRectsRef.current.get(name);
            const prevStyle = prevStyleRef.current.get(name);
            const hadPrevStatus = prevMatchedRef.current.has(name);
            const statusChanged = hadPrevStatus && prevMatchedRef.current.get(name) !== isMatched;
            const node = itemRefs.current.get(name);

            if (statusChanged && node && !reducedMotion) {
                if (prevRect) {
                    const dx = prevRect.left - rect.left;
                    const dy = prevRect.top - rect.top;
                    if (Math.abs(dx) >= 0.5 || Math.abs(dy) >= 0.5) {
                        node.animate(
                            [
                                { transform: `translate(${dx}px, ${dy}px)` },
                                { transform: "translate(0px, 0px)" },
                            ],
                            { duration: 450, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
                        );
                    }
                }

                if (prevStyle) {
                    const afterStyle = newStyles.get(name);
                    node.animate(
                        [
                            { ...prevStyle },
                            { ...afterStyle },
                        ],
                        { duration: 350, easing: "ease" }
                    );
                }
            }

            prevMatchedRef.current.set(name, isMatched);
        });

        prevRectsRef.current = newRects;
        prevStyleRef.current = newStyles;
    }, [matchSet, isSearching]);

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

            <p className="insurers-count" key={matches.length}>{isSearching ? matches.length : insurers.length} / {insurers.length}</p>

            <ul className="insurers-grid" aria-label="Obras sociales">
                {orderedInsurers.map((item) => {
                    if (item === ROW_BREAK) {
                        return <li key="row-break" className="insurers-row-break" aria-hidden="true"></li>;
                    }
                    const isMatch = !isSearching || matchSet.has(item);
                    return (
                        <li
                            key={item}
                            ref={(node) => {
                                if (node) itemRefs.current.set(item, node);
                                else itemRefs.current.delete(item);
                            }}
                            className={`insurers-item${isSearching ? (isMatch ? " is-match" : " is-dim") : ""}`}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>

            {isSearching && matches.length === 0 && <p className="insurers-empty">Sin coincidencias</p>}
        </section>
    );
}

export default Insurers;
