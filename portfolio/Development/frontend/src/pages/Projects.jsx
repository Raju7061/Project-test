import Navbar from "./Navbar";

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      desc: "Modern responsive portfolio using React, Tailwind, and clean UI/UX.",
      tech: ["React", "Tailwind"],
      link: "#",
    },
    {
      title: "SRE Monitoring App",
      desc: "Centralized logging, alerting & dashboards using Prometheus, Grafana & Loki.",
      tech: ["Prometheus", "Grafana", "Loki"],
      link: "#",
    },
    {
      title: "MERN Blog App",
      desc: "Full-stack blog with JWT auth, CRUD operations, and admin dashboard.",
      tech: ["MongoDB", "Express", "React", "Node"],
      link: "#",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-80px)] bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto mb-12">
            Real-world production-ready projects focused on scalability,
            monitoring, and modern web development.
          </p>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <div
                key={i}
                className="group relative bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-left hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 shadow-lg"
              >
                {/* Title */}
                <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition">
                  {p.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {p.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <a
                  href={p.link}
                  className="inline-block text-sm font-semibold text-cyan-400 hover:underline"
                >
                  View Project →
                </a>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-cyan-500/5 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;