import React, { useEffect, useRef, useState } from "react";
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
  { key: "tools", label: "Tools", icon: Wrench, match: /.*/ },
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

const PortfolioPreview = ({ resume, accentColor }) => {
  if (!resume) return null;

  const hero = resume.hero || {};
  const skills = resume.skills || [];
  const projects = resume.projects || [];
  const experience = resume.experience || [];
  const education = resume.education || [];
  const certs = resume.certifications || [];
  const contact = resume.contact || {};

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
    { label: "Certifications", value: certs.length },
  ];

  const topStrengths = skills.slice(0, 4).map((s) => (typeof s === "string" ? s : s?.name));
  const bestProjects = projects.slice(0, 3);

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-dashed border-white/15 bg-[#020617] font-[Inter,system-ui,sans-serif] text-white">

      {/* ambient base mesh */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600 opacity-[0.18] blur-[110px]" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-blue-600 opacity-[0.14] blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-cyan-500 opacity-[0.12] blur-[110px]" />
      </div>

      {/* draft chip */}
      <div className="relative z-10 flex items-center gap-2 px-8 pt-6">
        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: GRADIENT }} />
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
          Preview &mdash; not yet published
        </span>
      </div>

      {/* HERO */}
      <section className="relative z-10 px-8 pb-16 pt-10 md:px-12">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-600 opacity-25 blur-[90px]" />
        <div className="pointer-events-none absolute right-0 top-20 h-56 w-56 rounded-full bg-cyan-500 opacity-20 blur-[90px]" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-slate-300 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: GRADIENT }} />
            Available for opportunities
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {hero?.name || "Your Name"}
          </h1>

          <p className={`mt-3 text-lg font-medium md:text-xl ${GRADIENT_TEXT}`}>
            {hero?.profession || "Software Developer"}
          </p>

          <p className="mt-5 max-w-xl leading-relaxed text-slate-400">
            {resume.about ||
              "Building scalable digital experiences and solving real-world problems through software."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {contact?.email && (
              <button
                className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_-8px_rgba(168,85,247,0.6)] transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: GRADIENT }}
              >
                <Mail size={16} />
                Email
              </button>
            )}
            {contact?.github && (
              <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]">
                <Github size={16} />
                GitHub
              </button>
            )}
            {contact?.linkedin && (
              <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]">
                <Linkedin size={16} />
                LinkedIn
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="relative z-10 px-8 md:px-12">

        {/* RECRUITER SNAPSHOT */}
        <Section eyebrow="At a glance" title="Recruiter snapshot">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {snapshot.map((item) => (
              <Reveal key={item.label}>
                <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.35)]">
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
        <Section eyebrow="Capabilities" title="Skill intelligence">
          <div className="grid gap-4 md:grid-cols-2">
            {SKILL_BUCKETS.map((bucket) => {
              const items = buckets[bucket.key];
              if (!items.length) return null;
              const Icon = bucket.icon;
              return (
                <Reveal key={bucket.key}>
                  <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.3)]">
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
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
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

        {/* FEATURED PROJECT */}
        {featuredProject && (
          <Section eyebrow="Selected work" title="Featured project">
            <Reveal>
              <div className="rounded-[28px] p-[1px]" style={{ background: GRADIENT }}>
                <div className="overflow-hidden rounded-[27px] bg-[#0F172A]">
                  <div className="grid md:grid-cols-[1.3fr_1fr]">
                    <div className="p-7 md:p-10">
                      <span className={`font-mono text-xs uppercase tracking-widest ${GRADIENT_TEXT}`}>
                        Case study
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        {featuredProject.title || featuredProject.name || "Project"}
                      </h3>
                      <p className="mt-4 leading-relaxed text-slate-400">
                        {featuredProject.description}
                      </p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        {featuredProject.github && (
                          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5">
                            <Github size={15} />
                            Source
                          </button>
                        )}
                        {featuredProject.live && (
                          <button
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_25px_-8px_rgba(59,130,246,0.7)] transition-all duration-300 hover:-translate-y-0.5"
                            style={{ background: GRADIENT }}
                          >
                            <ExternalLink size={15} />
                            Live demo
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-6 border-t border-white/10 bg-white/[0.02] p-7 md:border-l md:border-t-0 md:p-10">
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

            {otherProjects.length > 0 && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {otherProjects.map((project, i) => (
                  <Reveal key={i}>
                    <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(168,85,247,0.3)]">
                      <h4 className="font-semibold text-white">{project.title || project.name}</h4>
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
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* EXPERIENCE */}
        <Section eyebrow="Career" title="Experience">
          <div className="relative ml-2">
            <div
              className="absolute left-0 top-0 h-full w-px"
              style={{ background: "linear-gradient(180deg, #A855F7, #3B82F6, #22D3EE)" }}
            />
            {experience.length > 0 ? (
              experience.map((exp, i) => (
                <Reveal key={i}>
                  <div className="relative mb-9 ml-8 last:mb-0">
                    <span
                      className="absolute -left-[37px] top-1 h-4 w-4 rounded-full ring-4 ring-[#020617]"
                      style={{ background: GRADIENT, boxShadow: "0 0 14px 2px rgba(59,130,246,0.6)" }}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Briefcase size={15} className="text-slate-500" />
                        <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
                      </div>
                      {exp.duration && (
                        <span className="font-mono text-xs text-slate-500">{exp.duration}</span>
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

        {/* EDUCATION */}
        <Section eyebrow="Foundation" title="Education">
          <div className="relative ml-2">
            <div
              className="absolute left-0 top-0 h-full w-px"
              style={{ background: "linear-gradient(180deg, #A855F7, #3B82F6, #22D3EE)" }}
            />
            {education.length > 0 ? (
              education.map((edu, i) => (
                <Reveal key={i}>
                  <div className="relative mb-9 ml-8 last:mb-0">
                    <span
                      className="absolute -left-[37px] top-1 h-4 w-4 rounded-full ring-4 ring-[#020617]"
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

        {/* CERTIFICATIONS */}
        <Section eyebrow="Credentials" title="Certifications">
          {certs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {certs.map((cert, i) => (
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
        <Section eyebrow="For recruiters" title="Why hire me">
          <Reveal>
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
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

                  <div className="mt-7 flex items-center gap-2">
                    <Target size={16} className="text-blue-300" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400">
                      Career highlights
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {experience.slice(0, 3).map((exp, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: GRADIENT }} />
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
                          <span className="text-sm font-medium text-slate-200">{p.title || p.name}</span>
                          {p.live && <ArrowUpRight size={15} className="text-slate-400" />}
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
        <section className="pb-16 pt-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] px-8 py-14 text-center text-white">
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #581C87 0%, #1E3A8A 55%, #0E7490 100%)" }}
              />
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl" />
              <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-fuchsia-400 opacity-25 blur-[100px]" />

              <div className="relative z-10">
                <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                  Let&rsquo;s build something
                  <br />
                  amazing together
                </h2>
                <p className="mx-auto mt-4 max-w-md text-white/70">
                  Open to full-time roles, collaborations, and projects worth building well.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {contact?.email && (
                    <span className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-slate-900">
                      <Mail size={16} />
                      {contact.email}
                    </span>
                  )}
                  {contact?.github && (
                    <span className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-xl">
                      <Github size={16} />
                      GitHub
                    </span>
                  )}
                  {contact?.linkedin && (
                    <span className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-xl">
                      <Linkedin size={16} />
                      LinkedIn
                    </span>
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

const Section = ({ eyebrow, title, children }) => (
  <section className="relative border-t border-white/[0.06] py-12 md:py-16">
    <Reveal>
      <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
        {eyebrow}
      </span>
      <h2 className="mb-7 mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
    </Reveal>
    {children}
  </section>
);

export default PortfolioPreview;