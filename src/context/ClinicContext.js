import { createContext, useContext } from "react";

const clinicData = {
  name: "Aura Odontologia",
  phone: "+542617528107",
  whatsapp: "+542617528107",
  email: "auradentalmza@gmail.com",
  instagram: "https://www.instagram.com/odontologia_aura/",
  address: "Balcarce 36, Godoy Cruz, Mendoza",
  mapsUrl:
    "https://www.google.com/maps/place/AURA+Odontolog%C3%ADa/@-32.9244217,-68.845515,17z/data=!4m8!3m7!1s0x967e093713e41fe7:0x25ca5b3efba3fe3a!8m2!3d-32.9244262!4d-68.8429401!9m1!1b1!16s%2Fg%2F11xytbnl11",
  googlePlaceId: "places/ChIJ5x_kEzcJfpYRov6j-z5byiU",
  googlePlaceQuery: "AURA Odontologia Balcarce 36 Godoy Cruz Mendoza",
  insurers: [
    "Avalian", "America Servicios", "Caja forense", "Conferencia episcopal argentina",
    "DASUTEN", "Docthos", "Federada Salud", "Galeno", "Gerdanna Salud", "HOPE",
    "Jerarquicos Salud", "Luis Pasteur", "Medicus", "OPDEA", "OSDIPP", "OSPIL",
    "OSPJN", "OSSACRA", "OSTV", "OSAPM", "OSSEG", "Prevencion Salud",
    "Swiss Medical", "Sancor Salud", "SCIS", "SADAIC", "Unimed", "Nobis", "OSADEF",
  ].sort(),
  treatments: [
    "Extracciones", "Tratamiento de conducto", "Blanqueamiento", "Limpieza dental",
    "Urgencias", "Caries", "Placas de relajación", "Protesis", "Implantes", "Perno-coronas", "Ortodoncia",
    "Odontopediatría", "Muelas de juicio", "Gingivitis",
  ].sort(),
  testimonials: [
    {
      id: 1,
      author: "Celeste",
      text: "Mejor imposible la atención de Florencia. Muy muy amable y se ve que está re contra capacitada,me brindo atención incluso estando fuera de su horario laboral.",
      rating: 5,
    },
    {
      id: 2,
      author: "Antonella",
      text: "Hace 2 años que Julieta me mantiene la boca sana y sin caries! Una genia y súper amorosa.  Hermoso lugar",
      rating: 5,
    },
    {
      id: 3,
      author: "Rodrigo Rubio",
      text: "Excelente atención, muy buena ubicación y el consultorio impecable. 100% recomendable",
      rating: 5,
    },
  ],
};

const ClinicContext = createContext(clinicData);

export function ClinicProvider({ children }) {
  return <ClinicContext.Provider value={clinicData}>{children}</ClinicContext.Provider>;
}

export function useClinic() {
  return useContext(ClinicContext);
}
