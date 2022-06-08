import { useState } from "react";

import "./styles/nav.css"

function Nav () {

    const [navBar, setNavBar] = useState(true);
    
    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 0){
            setNavBar(false)
        }
        else{
            setNavBar(true)
        }
    })

    return (
        <>
        <div className={navBar ? "nav" : "nav white"}>
        <div className="nav-row">
            <h2>
                <a href="/">
                Odo<span className="underline">ntoInteg</span>ral
                </a>
                <div className="und"></div>
            </h2>
            <ul id="contact">
                <li> <a href="/"> <i className="fa-solid fa-house"> <p className="sr-only">Página principal</p> </i> </a> </li>
                <li><a href="https://api.whatsapp.com/send?phone=542615738683" target="blank"><i className="fa-brands fa-whatsapp"></i> <p className="sr-only">Whatsapp</p> </a></li>
                <li><a href="https://www.instagram.com/odonto.integral.sf/" target="blank"><i className="fa-brands fa-instagram"></i> <p className="sr-only">Instagram</p> </a></li>
                <li><a href="mailto:florsconfienza@gmail.com" target="blank"><i className="fa-solid fa-envelope"></i></a></li>
                <li><a href="https://www.facebook.com/Odontolog%C3%ADa-Integral-107837708498792/" target="blank"><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href="https://www.linkedin.com/in/florenciasconfienza/" target="blank"><i className="fa-brands fa-linkedin-in"></i></a></li>
                <li><a href="about"><i className="fa-solid fa-circle-question"></i></a></li>
            </ul>
        </div>
    </div>
    </>  
    )
}

export default Nav