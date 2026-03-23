import { createContext, useContext } from "react";

const clinicData = {
  name: "Aura Odontologia",
  phone: "02617528107",
  whatsapp: "542617528107",
  email: "auradentalmza@gmail.com",
  instagram: "https://www.instagram.com/odontologia_aura/",
  address: "Balcarce 36, Godoy Cruz, Mendoza",
  testimonials: [
    {
      id: 1,
      author: "Carla M.",
      text: "Excelente atencion y mucha calidez. Me explicaron todo con paciencia y quede feliz con el resultado.",
      rating: 5,
    },
    {
      id: 2,
      author: "Nicolas R.",
      text: "Puntuales, profesionales y con muy buena tecnologia. Super recomendable.",
      rating: 5,
    },
    {
      id: 3,
      author: "Lucia A.",
      text: "Mi experiencia fue muy buena. El seguimiento posterior tambien fue impecable.",
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
