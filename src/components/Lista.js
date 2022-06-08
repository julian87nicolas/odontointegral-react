import "./styles/lista.css"

function Lista (props) {

    return (
        <ul>
            {props.lista.map(element => <li>{element}</li>)}
        </ul>
    )
}

export default Lista