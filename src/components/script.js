const nav = document.querySelector('nav');
const firstSep = document.querySelector('.sep.fixed');

// event scroll down
window.addEventListener('scroll', () => {
    if(window.pageYOffset > 0){
        nav.style.backgroundColor = 'white';
        nav.style.position = 'fixed';
        nav.style.top = '0';
        // if size windows < 768px
        if(window.innerWidth > 768){
            firstSep.style.display = 'flex';
        }
    }
    else{
        //nav.style.position = 'relative';
        nav.style.backgroundColor = 'transparent';
        firstSep.style.display = 'none';
    }
    // console.log(window.pageYOffset);
});

const OS = (["Avalian", "America Servicios", "Caja forense", "Conferencia episcopal argentina",
             "DASUTEN", "DAMSU", "Docthos", "Federada Salud", "Galeno", "Gerdanna Salud", "HOPE",
             "Jerarquicos Salud", "Luis Pasteur", "Medicus", "OPDEA", "OSDIPP", "OSJERA", "OSPIL",
             "OSPJN", "OSSACRA", "OSTV", "OSAPM", "OSSEG", "Policia Federal", "Prevencion Salud",
             "Swiss Medical", "Sancor Salud", "SCIS", "SADAIC", "Unimed", "OSEP"]).sort();
let OSlist = "<ul>";

for(let i=0;i<OS.length;i++){
    OSlist += `<li>${OS[i]}</li>`;
}
OSlist += "</ul>";

const OSlistButton = document.querySelector('.list-button');

const OSlistHTML = document.querySelector('.lista');

OSlistButton.addEventListener('click', (e) => {
        if(OSlistHTML.innerHTML === ""){
            OSlistHTML.innerHTML = OSlist;
            OSlistHTML.style.overflowY = "scroll";
            OSlistHTML.style.border = "2px var(--light-hover) solid";
            if(window.innerWidth > 800){
                OSlistHTML.style.height = "20rem";
            }
            else{
                OSlistHTML.style.height = "10rem";
            }            

            console.log(OSlistButton.offsetWidth);
            OSlistButton.style.borderRadius = "2.5rem";
        }
        else{
            OSlistHTML.innerHTML = "";
            OSlistHTML.style.overflow = "hidden";
            OSlistHTML.style.height = "0";
            OSlistHTML.style.border = "none";
            OSlistButton.style.borderRadius = "5rem";
        }
});

const search = document.querySelector('#search');

search.addEventListener("keyup", (e) => {
    let results = "<ul>";
    for(let i=0;i<OS.length;i++){
        if(OS[i].toLowerCase().includes(search.value.toLowerCase())){
            results += `<li>${OS[i]}</li>`;
        }
    }
    results += "</ul>";
    OSlistHTML.innerHTML = results;
    OSlistHTML.style.overflowY = "scroll";
    OSlistHTML.style.height  = "fit-content";

    console.log(OSlistButton.offsetWidth);

    OSlistButton.style.borderRadius = "2.5rem";
} );

const listTreatments = document.querySelector('.treatments.lista');
const buttonTreatments = document.querySelector('.treatments.list-button');
const treatments = ["Extracciones", "Tratamiento de conducto", "Blanqueamiento", "Limpieza dental",
                    "Urgencias", "Caries", "Placas de relajación", "Protesis", "Implantes", "Perno-coronas"].sort(); 

let treatHTML = "<ul>";

for(let i=0; i<treatments.length; i++){
    treatHTML += `<li>${treatments[i]}</li>`;
}

buttonTreatments.addEventListener('click', (e) => {
    if(listTreatments.innerHTML === ""){
        listTreatments.innerHTML = treatHTML;
        listTreatments.style.overflowY = "scroll";
        listTreatments.style.display = "relative";
        listTreatments.style.border = "2px var(--light-hover) solid";
        if(window.innerWidth > 800){
            listTreatments.style.height = "15rem";
        }
        else{
            listTreatments.style.height = "10rem";
        }            

        buttonTreatments.style.borderRadius = "2.5rem";
    }
    else{
        listTreatments.innerHTML = "";
        listTreatments.style.border = "none";
        listTreatments.style.overflow = "hidden";
        listTreatments.style.height = "0";
        listTreatments.style.border = "none";
        buttonTreatments.style.borderRadius = "5rem";
    }
});


const initButton = document.querySelector('.init');

initButton.addEventListener("click", (e) =>{
    // window.pageYOffset = 0;
    window.scrollTo(0,0);
})