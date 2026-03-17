import { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about Sandesh Dhakal, a software engineer building scalable backend systems and full-stack applications.",
    openGraph: {
        title: "About | Sandesh Dhakal",
        description: "Software Engineer from Nepal focusing on backend systems and full-stack applications.",
        url: "https://sandeshdhakal1.com.np/about",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Sandesh Dhakal",
        description: "Software Engineer from Nepal focusing on backend systems and full-stack applications.",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}