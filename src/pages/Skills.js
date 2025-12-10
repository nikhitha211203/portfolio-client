import React, { useEffect, useState } from 'react';
import { fetchSkills } from '../api';
import './Skills.css';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills()
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {});

  if (loading) return <div className="loading">Loading skills...</div>;

  return (
    <div className="skills-page-container">
      <h2 className="section-title">My Skills</h2>

      <div className="skills-wrapper">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="skill-category-section">
            <h3 className="category-title">{category}</h3>
            <div className="skills-grid">
              {categorySkills.map((skill) => (
                <div key={skill._id} className="skill-item">
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
