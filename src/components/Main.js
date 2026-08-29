import { lazy, Suspense } from "react";
import Intro from "./Intro"

const Insurers = lazy(() => import("./Insurers"));
const Content = lazy(() => import("./Content"));
const Specialties = lazy(() => import("./Specialties"));
const Testimonials = lazy(() => import("./Testimonials"));
const ContactForm = lazy(() => import("./ContactForm"));

function Main () {
    return (
        <>
            <Intro />
            <Suspense fallback={null}>
                <Insurers />
                <Content />
                <Specialties />
                <Testimonials />
                <ContactForm />
            </Suspense>
        </>
    )
}

export default Main
