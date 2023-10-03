import React from 'react';
import ProjectCard from "../elements/ProjectCard";
import {default as projectListData} from "../data/project-list.json"
import {ProjectType} from "../types/ProjectType";

const Projects = () => {
  const projects = projectListData as ProjectType[]
  const reversed = projects.slice().reverse()

  return (
    <section id={'projects'}>
      <h2>Projects</h2>
      <div className={'project-list'}>
        {
          reversed.map((item, i) => <ProjectCard key={i} project={item}/>)
        }
      </div>
    </section>
  );
};

export default Projects;