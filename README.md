# Sitio Web en React

Aplicación web institucional desarrollada con React. Este repositorio documenta únicamente aspectos técnicos de implementación, estructura y ejecución del proyecto.

## Características técnicas

- Single Page Application (SPA) con enrutamiento en cliente.
- Componentes reutilizables organizados por dominio visual.
- Estilos modulares por componente y variables globales CSS.
- Modo responsive para móvil, tablet y escritorio.
- Integración de assets estáticos (imágenes, favicons y manifest).
- Build optimizada para producción con Create React App.

## Stack tecnológico

- React 18
- React DOM 18
- React Router DOM 6
- React Scripts 5 (Create React App)
- Testing Library (Jest DOM, React, User Event)
- CSS3

## Requisitos

- Node.js 16 o superior (recomendado LTS actual)
- npm 8 o superior

## Scripts disponibles

En [package.json](package.json) se encuentran definidos los siguientes scripts:

- npm start: inicia el servidor de desarrollo en modo local.
- npm run build: genera una compilación optimizada para producción en [build/](build/).
- npm test: ejecuta pruebas en modo interactivo.
- npm run eject: expone la configuración interna de CRA (acción irreversible).

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en desarrollo:

```bash
npm start
```

3. Generar build de producción:

```bash
npm run build
```

## Arquitectura frontend

- [src/App.js](src/App.js): composición principal de layout y secciones.
- [src/components/Main.js](src/components/Main.js): contenedor de la página principal.
- [src/components/ServicesCarousel.js](src/components/ServicesCarousel.js): carrusel horizontal con animación continua y controles.
- [src/components/ContactForm.js](src/components/ContactForm.js): formulario con validación de campos y flujos de envío.
- [src/context/ClinicContext.js](src/context/ClinicContext.js): datos compartidos consumidos por componentes.
- [src/index.css](src/index.css): tokens globales de diseño (variables, tipografía, base responsive).

## Estilos y diseño

- Variables CSS centralizadas en [src/index.css](src/index.css).
- Estilos por componente en [src/components/styles/](src/components/styles/).
- Soporte de tema mediante atributos de datos en el documento.
- Transiciones y animaciones suaves con respeto por prefers-reduced-motion.

## Activos web y PWA

- Favicon SVG y PNG en [public/images/icon/](public/images/icon/).
- Manifest principal en [public/manifest.json](public/manifest.json).
- Manifest de íconos en [public/images/icon/site.webmanifest](public/images/icon/site.webmanifest).

## Pruebas

- Configuración base en [src/setupTests.js](src/setupTests.js).
- Prueba de ejemplo en [src/App.test.js](src/App.test.js).

## Licencia

Proyecto privado.