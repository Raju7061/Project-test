import Navbar from "./Navbar";
import { User, Code, Terminal, Cpu } from "lucide-react"; // Optional: Icons add a pro touch

function About() {
  const skills = [
    { name: "React.js", icon: <Code size={18} /> },
    { name: "Node.js", icon: <Terminal size={18} /> },
    { name: "Docker", icon: <Cpu size={18} /> },
    { name: "Kubernetes", icon: <Cpu size={18} /> },
    { name: "MongoDB", icon: <Terminal size={18} /> },
    { name: "CI/CD", icon: <Code size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
            </h1>
            <div className="h-1 w-20 bg-cyan-500 rounded-full" />
          </div>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            I am an <span className="text-cyan-300 font-medium">SRE & MERN Developer</span> focused on 
            bridging the gap between robust development and scalable operations. I build 
            full-stack applications that don't just look good—they're built to stay up.
          </p>

          {/* Skills Grid */}
          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-cyan-400">01.</span> Technical Arsenal
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </span>
                    <span className="font-medium text-slate-200">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Insight - Extra Value for SRE role */}
        <section className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-transparent border border-white/5">
          <h3 className="text-xl font-bold mb-2">My Philosophy</h3>
          <p className="text-slate-400">
            Whether it's optimizing a React render or orchestrating a Kubernetes cluster, 
            I believe in **automation over manual effort** and **observable systems** over guesswork.
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;