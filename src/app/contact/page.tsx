import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Sandesh Dhakal for collaborations, opportunities, or just to say hello.",
    openGraph: {
        title: "Contact | Sandesh Dhakal",
        description: "Get in touch with Sandesh Dhakal for collaborations, opportunities, or just to say hello.",
        url: "https://sandeshdhakal1.com.np/contact",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | Sandesh Dhakal",
        description: "Get in touch with Sandesh Dhakal for collaborations, opportunities, or just to say hello.",
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
