import React from "react";
import { PROJECTS } from "../data/projects";
import { TbArrowUpRight } from "react-icons/tb";
import AnimatedBg from "../components/AnimatedBg";
import SectionHeading from "../components/SectionHeading";

const isExternalLink = (url) => /^https?:\/\//.test(url);

const Projects = () => {
  return (
    <div className="min-h-screen bg-[#0c1a2e] text-white overflow-x-hidden">
      <AnimatedBg />
      <section className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 pt-28 md:pt-36 pb-20 md:pb-28">
        <SectionHeading num="01" label="Portfolio" title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target={isExternalLink(project.link) ? "_blank" : undefined}
              rel={
                isExternalLink(project.link) ? "noreferrer noopener" : undefined
              }
              className="project-card group relative border border-white/[0.06] rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/30 animate-fadeIn"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="absolute -top-4 -right-4 text-[120px] md:text-[160px] font-black leading-none text-white/[0.015] select-none pointer-events-none transition-all duration-700 group-hover:text-white/[0.035] group-hover:scale-110">
                {project.num}
              </div>

              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${project.color} rounded-full transition-all duration-500 group-hover:w-1.5 opacity-70 group-hover:opacity-100`}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[11px] font-mono font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}
                  >
                    {project.num}
                  </span>
                  <span className="h-px flex-1 bg-white/[0.06]" />
                  <span className="text-[10px] font-mono text-slate-600">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-teal-400 transition-all duration-500">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-5 font-body line-clamp-2">
                  {project.desc}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono border border-white/[0.06] rounded-md text-slate-500 bg-white/[0.02] group-hover:border-amber-500/20 group-hover:text-amber-400/70 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600 group-hover:text-amber-400 transition-all duration-300">
                  <span>View Project</span>
                  <TbArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
