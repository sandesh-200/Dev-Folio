"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { siteConfig } from "@/config/site";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: siteConfig.links.github,
    handle: "@sandesh",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    handle: "linkedin.com/in/sandesh",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    handle: siteConfig.links.email,
  },
];

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const router = useRouter();
  const iconsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function initGSAP() {
      const { gsap } = await import("gsap");

      ctx = gsap.context(() => {
        const icons = iconsRef.current?.querySelectorAll(".social-item");

        if (icons && icons.length > 0) {
          gsap.fromTo(
            Array.from(icons),
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.3,
            },
          );
        }

        gsap.fromTo(
          formRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.55,
          },
        );
      });
    }

    initGSAP();
    return () => ctx?.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("subject", "New Portfolio Message");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Message sent successfully");
        reset();

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try later.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-lg mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-[hsl(var(--muted-foreground))] mb-3">
            Contact
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))] mb-4">
            Get in touch
          </h1>

          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
            I'm open to interesting conversations, collaborations, and
            opportunities.
          </p>
        </div>

        {/* Social Links */}
        <div ref={iconsRef} className="grid grid-cols-2 gap-3 mb-12">
          {socialLinks.map(({ icon: Icon, label, href, handle }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="social-item flex items-center gap-3 p-4 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--muted-foreground)/0.4)] hover:bg-[hsl(var(--muted)/0.5)] transition-all group"
              style={{ opacity: 0 }}
            >
              <Icon
                size={16}
                className="text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors"
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-[hsl(var(--foreground))]">
                  {label}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                  {handle}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[hsl(var(--border))]" />
          <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
            or send a message
          </span>
          <div className="flex-1 h-px bg-[hsl(var(--border))]" />
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
          style={{ opacity: 0 }}
        >
          {/* Honeypot spam protection */}
          <input type="checkbox" name="botcheck" className="hidden" />

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5"
              >
                Name
              </label>

              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
                className="w-full px-3 py-2.5 text-sm rounded-md border border-[hsl(var(--border))]
                bg-[hsl(var(--muted)/0.5)] text-[hsl(var(--foreground))]
                placeholder:text-[hsl(var(--muted-foreground)/0.5)]
                focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition"
              />

              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 text-sm rounded-md border border-[hsl(var(--border))]
                bg-[hsl(var(--muted)/0.5)] text-[hsl(var(--foreground))]
                placeholder:text-[hsl(var(--muted-foreground)/0.5)]
                focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition"
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={5}
              {...register("message", {
                required: "Message cannot be empty",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2.5 text-sm rounded-md border border-[hsl(var(--border))]
              bg-[hsl(var(--muted)/0.5)] text-[hsl(var(--foreground))]
              placeholder:text-[hsl(var(--muted-foreground)/0.5)]
              focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] transition resize-none"
            />

            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-md bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:opacity-80 transition-opacity"
          >
            {isSubmitting ? "Sending..." : "Send message"}
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
