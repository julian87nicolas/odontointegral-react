import "./styles/lista.css"

function Lista (props) {

    return (
        <ul className={props.className}>
            {props.lista.map((element, idx) => <li>{element}</li>)}
        </ul>
    )
}

export default Lista