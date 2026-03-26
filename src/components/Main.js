import { lazy, Suspense } from "react";
import Intro from "./Intro"

const Content = lazy(() => import("./Content"));
const Testimonials = lazy(() => import("./Testimonials"));
const ContactForm = lazy(() => import("./ContactForm"));

function Main () {
    return (
        <>
            <Intro />
            <Suspense fallback={null}>
                <Content />
                <Testimonials />
                <ContactForm />
            </Suspense>
        </>
    )
}

export default Main