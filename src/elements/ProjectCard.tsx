import React from 'react';
import {ProjectType} from "../types/ProjectType";
import {ReactComponent as GithubIcon} from "../assets/icons/github-142-svgrepo-com.svg";
import {ReactComponent as WebIcon} from "../assets/icons/web-svgrepo-com.svg";


const ProjectCard: React.FC<{project: ProjectType}> = ({project}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [expandedInfo, setExpandedInfo] = React.useState(project.description)

  const handleDescriptionClick = () => {
    setExpandedInfo(project.description)
    setIsExpanded(prevState => !prevState)
  }
  const handleStackClick = () => {
    setExpandedInfo(project.stack.join(", "))
    setIsExpanded(prevState => !prevState)
  }

  return (
    <div onMouseLeave={() => {setIsExpanded(false)}} className={'card'}>
      <div className={'card__image'}>
        <img src={project.screenshotUrl} alt=""/>
      </div>
      <div className={'card__content'}>
        <div className={'card__name'}>{project.name}</div>
        <div className={'card__url-icons'}>
          {
            project.deployLink &&
            <a target="_blank" href={project.deployLink}><WebIcon/></a>
          }

          {
            project.githubLink &&
            <a target="_blank" href={project.githubLink}><GithubIcon/></a>
          }
        </div>

        <div className={`card__description ${isExpanded ? 'card__description__expanded' : ''}`}>
          <div>{expandedInfo}</div>
          <span onClick={handleDescriptionClick}>Description {isExpanded ? "▼" : "▲"}</span>
          <span onClick={handleStackClick}>Stack {isExpanded ? "▼" : "▲"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;