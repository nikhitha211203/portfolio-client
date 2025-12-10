import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="projects-page-container">
      <h2 className="section-title">My Projects</h2>

      <div className="projects-grid">
        {projects.length === 0 && <p>No projects found.</p>}

        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <div className="card-img-holder">
              <img
                src={project.imageUrl || "https://via.placeholder.com/300X200"}
                alt={project.title}
                className="card-img"
              />
            </div>
            <div className="card-body">
              <h3>{project.title}</h3>
              <p className="card-desc">{project.description.substring(0, 100)}...</p>

              <div className="tech-tags">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="card-links">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="link-btn github">
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="link-btn live">
                    Live Demo
                  </a>
                )}
              </div>

              <button
                className="details-btn"
                onClick={() => setSelectedProject(project)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProject(null)}>×</button>
            <img src={selectedProject.imageUrl} alt={selectedProject.title} className="modal-img" />
            <h3>{selectedProject.title}</h3>
            <div className="tech-tags">
              {selectedProject.techStack.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
            <p>{selectedProject.description}</p>
            <div className="card-links">
              {selectedProject.githubLink && (
                <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="link-btn github">
                  GitHub
                </a>
              )}
              {selectedProject.liveLink && (
                <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="link-btn live">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
