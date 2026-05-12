import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="mb-4 text-sm sm:text-base font-medium tracking-widest uppercase text-cyan-400">
            Welcome to my portfolio
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Raju Gupta
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
            SRE Engineer, DevOps enthusiast, and MERN Stack Developer focused on
            building reliable, scalable, and production-ready applications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/resume/Raju.resume.pdf"
              download
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 hover:-translate-y-1 transition-all duration-300"
            >
              Download Resume
            </a>

            <a
              href="#projects"
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-slate-700 text-slate-200 font-semibold hover:border-cyan-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300"
            >
              View Projects
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-2xl font-bold text-cyan-400">DevOps</h3>
              <p className="text-sm text-slate-400 mt-2">
                CI/CD, Docker, Kubernetes, AWS
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-2xl font-bold text-cyan-400">SRE</h3>
              <p className="text-sm text-slate-400 mt-2">
                Monitoring, RCA, Alerting, Reliability
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-2xl font-bold text-cyan-400">MERN</h3>
              <p className="text-sm text-slate-400 mt-2">
                React, Node.js, Express, MongoDB
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;