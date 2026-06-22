import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../configs/api";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Database,
  Wrench,
  Code2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const GRADIENT = "linear-gradient(90deg, #A855F7 0%, #3B82F6 55%, #22D3EE 100%)";
const GRADIENT_TEXT = "bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent";

const SECTIONS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "why", label: "Why me" },
  { id: "contact", label: "Contact" },
];

// Buckets used only to group existing skill strings for the Skill
// Intelligence Grid — does not alter the underlying skills data.
const SKILL_BUCKETS = [
  {
    key: "frontend",
    label: "Frontend",
    icon: Layers,
    match: /react|next|vue|angular|svelte|html|css|tailwind|javascript|typescript|redux|frontend/i,
  },
  {
    key: "backend",
    label: "Backend",
    icon: Code2,
    match: /node|express|django|flask|spring|java|python|go(lang)?|rust|php|ruby|api|graphql|backend/i,
  },
  {
    key: "database",
    label: "Database",
    icon: Database,
    match: /sql|postgres|mongo|mysql|redis|firebase|dynamo|database|prisma/i,
  },
  {
    key: "tools",
    label: "Tools",
    icon: Wrench,
    match: /.*/,
  },
];

const bucketSkills = (skills) => {
  const buckets = { frontend: [], backend: [], database: [], tools: [] };
  skills.forEach((skill) => {
    const name = typeof skill === "string" ? skill : skill?.name || "";
    const found = SKILL_BUCKETS.find((b) => b.match.test(name) && b.key !== "tools");
    buckets[found ? found.key : "tools"].push(name);
  });
  return buckets;
};

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Reveal = ({ children, className = "" }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const PortfolioPublic = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("snapshot");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/portfolio/${slug}`);
        setData(res.data.portfolioData);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug]);

  useEffect(() => {
    if (!data) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            loading portfolio
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
            404
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Portfolio not found
          </h1>
          <p className="mt-2 text-slate-400">
            The portfolio you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const {
    hero,
    about,
    skills = [],
    projects = [],
    experience = [],
    education = [],
    certifications = [],
    contact,
  } = data;

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);
  const buckets = bucketSkills(skills);

  const yearsOfExperience = (() => {
    if (!experience.length) return 0;
    const years = experience
      .map((e) => (e.duration?.match(/\d{4}/g) || []).map(Number))
      .flat();
    if (!years.length) return experience.length;
    return Math.max(1, new Date().getFullYear() - Math.min(...years));
  })();

  const snapshot = [
    { label: "Years Experience", value: yearsOfExperience || experience.length },
    { label: "Projects Shipped", value: projects.length },
    { label: "Skills", value: skills.length },
    { label: "Certifications", value: certifications.length },
  ];

  const topStrengths = skills.slice(0, 4).map((s) => (typeof s === "string" ? s : s?.name));
  const bestProjects = projects.slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] font-[Inter,system-ui,sans-serif] text-white">

      {/* ambient base mesh — fixed, sits behind all sections */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-600 opacity-[0.15] blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-blue-600 opacity-[0.12] blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-500 opacity-[0.10] blur-[140px]" />
      </div>

      {/* SECTION RAIL — desktop only */}
      <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center justify-end gap-2.5"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-opacity duration-200 ${
                activeSection === s.id
                  ? `opacity-100 ${GRADIENT_TEXT}`
                  : "opacity-0 text-slate-400 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full transition-all duration-300"
              style={{
                background: activeSection === s.id ? GRADIENT : "#FFFFFF26",
                transform: activeSection === s.id ? "scale(1.6)" : "scale(1)",
              }}
            />
          </a>
        ))}
      </nav>

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen items-center overflow-hidden px-6 pt-24">
        <div className="absolute -left-32 top-12 h-[28rem] w-[28rem] rounded-full bg-violet-600 opacity-30 blur-[110px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-[110px]" />

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-slate-300 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GRADIENT }} />
              Available for opportunities
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.03] tracking-tight md:text-7xl">
              {hero?.name || "Your Name"}
            </h1>

            <p className={`mt-4 text-xl font-medium md:text-2xl ${GRADIENT_TEXT}`}>
              {hero?.profession || "Software Developer"}
            </p>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
              {about ||
                "Building scalable digital experiences and solving real-world problems through software."}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_-8px_rgba(168,85,247,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_-6px_rgba(59,130,246,0.7)]"
                  style={{ background: GRADIENT }}
                >
                  <Mail size={16} />
                  Get in touch
                </a>
              )}
              {contact?.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/20"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/20"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              )}
            </div>
          </Reveal>

          {/* glass profile card */}
          <Reveal className="mt-16 hidden md:block">
            <div className="ml-auto w-fit rounded-3xl border border-white/10 bg-white/[0.04] px-7 py-5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              <div className="flex items-center gap-8">
                {snapshot.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <p className="font-mono text-2xl font-semibold text-white">{s.value}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        {/* RECRUITER SNAPSHOT */}
        <Section id="snapshot" eyebrow="At a glance" title="Recruiter snapshot">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {snapshot.map((item) => (
              <Reveal key={item.label}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.35)]">
                  <p className="font-mono text-3xl font-semibold tabular-nums text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                  <div
                    className="mt-4 h-0.5 w-7 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: GRADIENT }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* SKILL INTELLIGENCE GRID */}
        <Section id="skills" eyebrow="Capabilities" title="Skill intelligence">
          <div className="grid gap-4 md:grid-cols-2">
            {SKILL_BUCKETS.map((bucket) => {
              const items = buckets[bucket.key];
              if (!items.length) return null;
              const Icon = bucket.icon;
              return (
                <Reveal key={bucket.key}>
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.3)]">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10"
                        style={{ background: "linear-gradient(135deg, #A855F726, #22D3EE26)" }}
                      >
                        <Icon size={18} className="text-cyan-300" />
                      </div>
                      <h3 className="font-semibold text-white">{bucket.label}</h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {items.map((name, i) => (
                        <span
                          key={i}
                          className="cursor-default rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:text-white"
                          style={{ "--tw-gradient-stops": GRADIENT }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = GRADIENT)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
            {skills.length === 0 && (
              <p className="font-mono text-sm text-slate-500">No skills added.</p>
            )}
          </div>
        </Section>

        {/* FEATURED PROJECT — case study */}
        {featuredProject && (
          <Section id="work" eyebrow="Selected work" title="Featured project">
            <Reveal>
              <div
                className="rounded-[32px] p-[1px]"
                style={{ background: GRADIENT }}
              >
                <div className="overflow-hidden rounded-[31px] bg-[#0F172A]">
                  <div className="grid md:grid-cols-[1.3fr_1fr]">
                    <div className="p-8 md:p-12">
                      <span className={`font-mono text-xs uppercase tracking-widest ${GRADIENT_TEXT}`}>
                        Case study
                      </span>
                      <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                        {featuredProject.title || featuredProject.name || "Project"}
                      </h3>

                      <p className="mt-5 leading-relaxed text-slate-400">
                        {featuredProject.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        {featuredProject.github && (
                          <a
                            href={featuredProject.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                          >
                            <Github size={15} />
                            Source
                          </a>
                        )}
                        {featuredProject.live && (
                          <a
                            href={featuredProject.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_25px_-8px_rgba(59,130,246,0.7)] transition-all duration-300 hover:-translate-y-0.5"
                            style={{ background: GRADIENT }}
                          >
                            <ExternalLink size={15} />
                            Live demo
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-6 border-t border-white/10 bg-white/[0.02] p-8 md:border-l md:border-t-0 md:p-12">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                          Stack
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {featuredProject.techStack?.length > 0 ? (
                            featuredProject.techStack.map((tech, i) => (
                              <span
                                key={i}
                                className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-slate-200"
                              >
                                {tech}
                              </span>
                            ))
                          ) : (
                            <span className="font-mono text-xs text-slate-500">—</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto border-t border-white/10 pt-5">
                        <div className="flex items-center gap-2 text-slate-200">
                          <TrendingUp size={15} className="text-cyan-300" />
                          <p className="text-sm font-medium">Built end-to-end, shipped to production</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* remaining projects */}
            {otherProjects.length > 0 && (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {otherProjects.map((project, i) => (
                  <Reveal key={i}>
                    <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(168,85,247,0.3)]">
                      <h4 className="font-semibold text-white">
                        {project.title || project.name}
                      </h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                        {project.description}
                      </p>
                      {project.techStack?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-5 flex gap-4 border-t border-white/10 pt-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                          >
                            <Github size={14} /> Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                          >
                            <ArrowUpRight size={14} /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* EXPERIENCE TIMELINE */}
        <Section id="experience" eyebrow="Career" title="Experience">
          <div
            className="relative ml-2"
            style={{ borderLeft: "1px solid transparent", backgroundImage: "none" }}
          >
            <div
              className="absolute left-0 top-0 h-full w-px"
              style={{ background: "linear-gradient(180deg, #A855F7, #3B82F6, #22D3EE)" }}
            />
            {experience.length > 0 ? (
              experience.map((exp, i) => (
                <Reveal key={i}>
                  <div className="relative mb-10 ml-8 last:mb-0">
                    <span
                      className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-[#020617]"
                      style={{ background: GRADIENT, boxShadow: "0 0 14px 2px rgba(59,130,246,0.6)" }}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Briefcase size={15} className="text-slate-500" />
                        <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
                      </div>
                      {exp.duration && (
                        <span className="font-mono text-xs text-slate-500">
                          {exp.duration}
                        </span>
                      )}
                    </div>
                    <p className={`mt-1 text-sm font-medium ${GRADIENT_TEXT}`}>
                      {exp.position}
                    </p>
                    {exp.description && (
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))
            ) : (
              <p className="ml-6 font-mono text-sm text-slate-500">No experience added.</p>
            )}
          </div>
        </Section>

        {/* EDUCATION TIMELINE */}
        <Section id="education" eyebrow="Foundation" title="Education">
          <div className="relative ml-2">
            <div
              className="absolute left-0 top-0 h-full w-px"
              style={{ background: "linear-gradient(180deg, #A855F7, #3B82F6, #22D3EE)" }}
            />
            {education.length > 0 ? (
              education.map((edu, i) => (
                <Reveal key={i}>
                  <div className="relative mb-10 ml-8 last:mb-0">
                    <span
                      className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-[#020617]"
                      style={{ background: GRADIENT, boxShadow: "0 0 14px 2px rgba(168,85,247,0.6)" }}
                    />
                    <div className="flex items-center gap-2">
                      <GraduationCap size={15} className="text-slate-500" />
                      <h3 className="text-lg font-semibold text-white">{edu.institution}</h3>
                    </div>
                    <p className="mt-1 text-sm font-medium text-slate-300">{edu.degree}</p>
                    {edu.year && (
                      <p className="mt-1 font-mono text-xs text-slate-500">{edu.year}</p>
                    )}
                  </div>
                </Reveal>
              ))
            ) : (
              <p className="ml-6 font-mono text-sm text-slate-500">No education added.</p>
            )}
          </div>
        </Section>

        {/* CERTIFICATION WALL */}
        <Section id="certifications" eyebrow="Credentials" title="Certifications">
          {certifications.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, i) => (
                <Reveal key={i}>
                  <div className="group flex items-start gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(34,211,238,0.3)]">
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10"
                      style={{ background: "linear-gradient(135deg, #A855F726, #22D3EE26)" }}
                    >
                      <Award size={17} className="text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold leading-snug text-white">{cert.name}</h3>
                      {cert.issuer && (
                        <p className="mt-0.5 text-sm text-slate-400">{cert.issuer}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="font-mono text-sm text-slate-500">No certifications added.</p>
          )}
        </Section>

        {/* WHY HIRE ME */}
        <Section id="why" eyebrow="For recruiters" title="Why hire me">
          <Reveal>
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-12">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-violet-300" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400">
                      Top strengths
                    </h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topStrengths.length > 0 ? (
                      topStrengths.map((s, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-slate-200"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-xs text-slate-500">—</span>
                    )}
                  </div>

                  <div className="mt-8 flex items-center gap-2">
                    <Target size={16} className="text-blue-300" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400">
                      Career highlights
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {experience.slice(0, 3).map((exp, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-300">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full"
                          style={{ background: GRADIENT }}
                        />
                        {exp.position} at {exp.company}
                      </li>
                    ))}
                    {experience.length === 0 && (
                      <li className="font-mono text-xs text-slate-500">—</li>
                    )}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-cyan-300" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400">
                      Best work
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    {bestProjects.length > 0 ? (
                      bestProjects.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                        >
                          <span className="text-sm font-medium text-slate-200">
                            {p.title || p.name}
                          </span>
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noreferrer">
                              <ArrowUpRight size={15} className="text-slate-400" />
                            </a>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="font-mono text-xs text-slate-500">—</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* CONTACT CTA */}
        <section id="contact" className="py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[40px] px-8 py-16 text-center text-white md:py-24">
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #581C87 0%, #1E3A8A 55%, #0E7490 100%)" }}
              />
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl" />
              <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-400 opacity-25 blur-[110px]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-300 opacity-20 blur-[110px]" />

              <div className="relative z-10">
                <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
                  Let&rsquo;s build something
                  <br />
                  amazing together
                </h2>
                <p className="mx-auto mt-5 max-w-md text-white/70">
                  Open to full-time roles, collaborations, and projects worth building well.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {contact?.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-medium text-slate-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Mail size={16} />
                      {contact.email}
                    </a>
                  )}
                  {contact?.github && (
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                  {contact?.linkedin && (
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
};

const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="scroll-mt-24 border-t border-white/[0.06] py-16 md:py-20">
    <Reveal>
      <div className="mb-10 flex items-baseline gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
          {eyebrow}
        </span>
      </div>
      <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white">{title}</h2>
    </Reveal>
    {children}
  </section>
);

export default PortfolioPublic;