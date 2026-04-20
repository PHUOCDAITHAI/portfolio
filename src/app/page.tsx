"use client";

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const sectionFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

type Theme = "dark" | "light";

const stats = [
  { value: "4+ Years", label: "Frontend Experience" },
  { value: "40-50%", label: "Code Duplication Reduced" },
  { value: "20-25%", label: "Engagement Improved" }
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "SASS/SCSS",
  "JavaScript",
  "Vue.js",
  "Angular",
  "NestJS",
  "Jest",
  "React Testing Library",
  "Git",
];

const experiences = [
  {
    title: "Fullstack Developer (Frontend Focus)",
    company: "TPS Software Company",
    period: "Oct 2023 - Present",
    bullets: [
      "Built reusable multi-tenant component library with configurable branding, reducing code duplication by 40-50%.",
      "Converted Figma designs to responsive, pixel-perfect React interfaces across major browsers.",
      "Integrated Gemini AI image generation flows with smooth loading/error states and micro-interactions.",
      "Optimized performance using code splitting, lazy loading, and stylesheet minification to improve Core Web Vitals.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "TPS Software Company",
    period: "Oct 2022 - Aug 2023",
    bullets: [
      "Led migration from legacy Angular app to React while preserving existing UI and business continuity.",
      "Built responsive layouts with Flexbox/Grid for desktop, tablet, and mobile.",
      "Improved post-migration performance through lazy loading, component optimization, and BEM-based stylesheet refactoring.",
    ],
  },
];

const projects = [
  {
    title: "Barbershop Management Platform",
    description:
      "A modern barbershop booking and management system with customer scheduling, service management, and admin dashboard.",
    tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://phuocdaibarbershop.vercel.app",
    githubUrl: "https://github.com/PHUOCDAITHAI/barbershop-fe",
  },
  {
    title: "Movie App",
    description:
      "A modern movie web application featuring movie listings, detailed movie information, advanced filtering, search functionality, trailer viewing, and a personalized My List feature.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://phuocdai-flix.vercel.app",
    githubUrl: "https://github.com/PHUOCDAITHAI/movie-app-frontend",
  },
];

const strengths = [
  {
    title: "Product Mindset",
    detail:
      "Prioritize user flow, clarity, and measurable impact instead of only implementing UI.",
  },
  {
    title: "Performance First",
    detail:
      "Apply lazy loading, code splitting, and rendering optimizations to improve Core Web Vitals.",
  },
  {
    title: "Design-to-Code Accuracy",
    detail:
      "Convert Figma designs to semantic, responsive, and cross-browser interfaces with pixel-level consistency.",
  },
  {
    title: "Team Collaboration",
    detail:
      "Work effectively with designers, backend engineers, and QA in Agile environments.",
  },
];

const copy = {
  role: "Frontend Developer",
  contactMe: "Contact Me",
  hireMe: "Hire Me",
  technicalSkills: "Technical Skills",
  experience: "Experience",
  education: "Education",
  projects: "Featured Projects",
  value: "Why Hire Me",
  contact: "Contact",
  send: "Send Message",
  name: "Your name",
  email: "Your email",
  message: "Tell me about your project...",
  sent: "Message sent successfully!",
  sendError: "Cannot send now. Please set NEXT_PUBLIC_EMAILJS_* variables first.",
  footerLeft: "Designed with",
  footerBy: "by Thai Phuoc Dai",
  footerRight: "© 2026 All Rights Reserved",
  about:
    "Frontend Developer with 4+ years of experience building high-performance, responsive, and pixel-perfect web interfaces with strong focus on UX, animation, and design systems.",
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Value", href: "#value" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sending, setSending] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const ui = copy;
  const isDark = theme === "dark";

  const tags = useMemo(
    () => ["All", ...new Set(projects.flatMap((project) => project.tags))],
    []
  );
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  useEffect(() => {
    if (!resultMessage) return;
    const timer = setTimeout(() => setResultMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [resultMessage]);

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setResultMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setToastType("error");
      setResultMessage(ui.sendError);
      setSending(false);
      return;
    }
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: String(formData.get("from_name") ?? ""),
          from_email: String(formData.get("from_email") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
        publicKey
      );
      form.reset();
      setToastType("success");
      setResultMessage(ui.sent);
    } catch {
      setToastType("error");
      setResultMessage(ui.sendError);
    } finally {
      setSending(false);
    }
  };

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-40 h-1 w-full origin-left bg-cyan-300"
      />
      <div
        className={`pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full blur-3xl ${
          isDark ? "bg-cyan-500/20" : "bg-cyan-300/40"
        }`}
      />
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-xl ${
          isDark
            ? "border-white/10 bg-slate-950/80"
            : "border-slate-300 bg-slate-100/80"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#" className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
            THAI PHUOC DAI
          </a>
          <div className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={isDark ? "text-slate-300 transition hover:text-cyan-200" : "text-slate-700 transition hover:text-cyan-500"}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-500 px-3 py-1 text-xs transition duration-300 cursor-pointer hover:scale-110 hover:border-cyan-300 hover:bg-cyan-300/10"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3c0 .13-.01.26-.01.39a7 7 0 0 0 9.8 6.4Z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {resultMessage && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`fixed right-5 top-16 z-50 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur ${
              toastType === "success"
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                : "border-rose-400/40 bg-rose-500/15 text-rose-200"
            }`}
          >
            {resultMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:px-10">
        <motion.section
          variants={sectionFadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          style={{ y: heroY }}
          className={`relative overflow-hidden rounded-3xl border p-8 md:p-12 ${
            isDark
              ? "border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950"
              : "border-slate-300 bg-gradient-to-br from-white via-slate-100 to-slate-200"
          }`}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{ui.role}</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">Thai Phuoc Dai</h1>
              <p id="about" className={`mt-5 max-w-3xl ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {ui.about}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                <a className="rounded-full bg-cyan-300 px-5 py-2.5 font-medium text-slate-950 transition hover:bg-cyan-200" href="#contact">
                  {ui.contactMe}
                </a>
                <a className="rounded-full border border-cyan-300/40 px-5 py-2.5 transition hover:border-cyan-200 hover:bg-cyan-300/10" href="mailto:daithai050900@gmail.com">
                  {ui.hireMe}
                </a>
              </div>
            </div>
            <motion.div
              whileHover={{ rotate: -2, scale: 1.02 }}
              className={`mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl border ${
                isDark ? "border-white/20 bg-slate-800/70 text-cyan-200" : "border-slate-300 bg-white/70 text-cyan-700"
              }`}
            >
              <Image
                src="/avatar.jpg"
                alt="Thai Phuoc Dai avatar"
                width={224}
                height={224}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.article
                key={stat.label}
                variants={itemFadeIn}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`animated-border rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-slate-300 bg-white/70"}`}
              >
                <p className="text-xl font-semibold text-cyan-500">{stat.value}</p>
                <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{stat.label}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className={`rounded-3xl border p-7 md:p-8 ${isDark ? "border-white/10 bg-slate-900/70" : "border-slate-300 bg-white/80"}`}
        >
          <h2 className="text-2xl font-semibold">{ui.projects}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveFilter(tag)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  activeFilter === tag
                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                    : isDark
                    ? "border-slate-700 text-slate-200 hover:border-slate-500"
                    : "border-slate-400 text-slate-700 hover:border-slate-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            {filteredProjects.map((project) => (
              <motion.article
                key={project.title}
                variants={itemFadeIn}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`animated-border rounded-2xl border p-5 ${isDark ? "border-slate-700 bg-slate-800/70" : "border-slate-300 bg-slate-50"}`}
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-lg bg-cyan-300/20 px-2.5 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-cyan-300 px-3 py-1.5 text-xs font-medium text-slate-950"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-500 px-3 py-1.5 text-xs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="skills"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className={`rounded-3xl border p-7 md:p-8 ${isDark ? "border-white/10 bg-slate-900/70" : "border-slate-300 bg-white/80"}`}
        >
          <h2 className="text-2xl font-semibold">{ui.technicalSkills}</h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-5 flex flex-wrap gap-2.5"
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={itemFadeIn}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`animated-border rounded-xl border px-3.5 py-1.5 text-sm ${isDark ? "border-slate-700 bg-slate-800/80 text-slate-200" : "border-slate-300 bg-slate-100 text-slate-800"}`}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="experience"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className={`rounded-3xl border p-7 md:p-8 ${isDark ? "border-white/10 bg-slate-900/70" : "border-slate-300 bg-white/80"}`}
        >
          <h2 className="text-2xl font-semibold">{ui.experience}</h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={`mt-6 space-y-8 border-l pl-6 ${isDark ? "border-slate-700/70" : "border-slate-300"}`}
          >
            {experiences.map((experience) => (
              <motion.article
                key={experience.title}
                variants={itemFadeIn}
                className="relative space-y-3"
              >
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-cyan-300" />
                <div>
                  <h3 className="text-xl font-semibold">{experience.title}</h3>
                  <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                    {experience.company} | {experience.period}
                  </p>
                </div>
                <ul className={`list-disc space-y-2 pl-5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="education"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className={`rounded-3xl border p-7 md:p-8 ${isDark ? "border-white/10 bg-slate-900/70" : "border-slate-300 bg-white/80"}`}
        >
          <h2 className="text-2xl font-semibold">{ui.education}</h2>
          <p className={`mt-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Bachelor of Information Technology - Can Tho University
          </p>
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>2018 - 2022 | GPA: 3.50 / 4.0</p>
        </motion.section>

        <motion.section
          id="value"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className={`rounded-3xl border p-7 md:p-8 ${isDark ? "border-white/10 bg-slate-900/70" : "border-slate-300 bg-white/80"}`}
        >
          <h2 className="text-2xl font-semibold">{ui.value}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {strengths.map((item) => (
              <article
                key={item.title}
                className={`animated-border rounded-2xl border p-4 ${
                  isDark ? "border-slate-700 bg-slate-800/70" : "border-slate-300 bg-slate-50"
                }`}
              >
                <p className="text-base font-semibold">{item.title}</p>
                <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className={`rounded-3xl border p-7 md:p-8 ${isDark ? "border-white/10 bg-slate-900/70" : "border-slate-300 bg-white/80"}`}
        >
          <h2 className="text-2xl font-semibold">{ui.contact}</h2>
          <form className="mt-5 grid gap-3 md:max-w-xl" onSubmit={sendEmail}>
            <label className="sr-only" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="from_name"
              required
              placeholder={ui.name}
              autoComplete="name"
              className={`rounded-xl border px-4 py-2.5 outline-none ${isDark ? "border-slate-700 bg-slate-800 text-slate-100" : "border-slate-300 bg-white text-slate-900"}`}
            />
            <label className="sr-only" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              name="from_email"
              type="email"
              required
              placeholder={ui.email}
              autoComplete="email"
              className={`rounded-xl border px-4 py-2.5 outline-none ${isDark ? "border-slate-700 bg-slate-800 text-slate-100" : "border-slate-300 bg-white text-slate-900"}`}
            />
            <label className="sr-only" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              placeholder={ui.message}
              className={`rounded-xl border px-4 py-2.5 outline-none ${isDark ? "border-slate-700 bg-slate-800 text-slate-100" : "border-slate-300 bg-white text-slate-900"}`}
            />
            <button
              type="submit"
              disabled={sending}
              className="w-fit rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 disabled:opacity-70"
            >
              {sending ? "Sending..." : ui.send}
            </button>
          </form>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <motion.a
              className="rounded-full border border-slate-500 px-4 py-2 transition hover:border-cyan-300"
              href="mailto:daithai050900@gmail.com"
              whileHover={{ y: -2 }}
            >
              daithai050900@gmail.com
            </motion.a>
            <motion.a
              className="rounded-full border border-slate-500 px-4 py-2 transition hover:border-cyan-300"
              href="tel:0834379775"
              whileHover={{ y: -2 }}
            >
              0834379775
            </motion.a>
            <motion.a
              className="rounded-full border border-slate-500 px-4 py-2 transition hover:border-cyan-300"
              href="https://github.com/PHUOCDAITHAI"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
            >
              GitHub
            </motion.a>
            <motion.a
              className="rounded-full border border-slate-500 px-4 py-2 transition hover:border-cyan-300"
              href="https://www.linkedin.com/in/dai-thai-108012239/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
            >
              LinkedIn
            </motion.a>
          </div>
        </motion.section>

        <footer
          className={`flex flex-col items-center justify-between gap-2 pb-4 pt-2 text-sm md:flex-row ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          <p>
            {ui.footerLeft} <span className="text-rose-400">❤</span> {ui.footerBy}
          </p>
          <p>{ui.footerRight}</p>
        </footer>
      </div>
    </main>
  );
}
