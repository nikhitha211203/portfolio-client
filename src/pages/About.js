import React, { useEffect, useState } from 'react';
import { fetchAbout } from '../api';
import './About.css';

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="about-container">
      <h2 className="section-title">About Me</h2>

      <div className="profile-summary">
        <img src={profile.profileUrl || "https://via.placeholder.com/150"} alt="Profile" className="about-img" />
        <div className="summary-text">
          <h3>{profile.fullName}</h3>
          <p className="role">{profile.role}</p>
          <p className="bio">{profile.bio}</p>
        </div>
      </div>

      <div className="exp-edu-grid">
        <div className="section-col">
          <h3>Experience</h3>
          {profile.experience?.map((exp, index) => (
            <div key={index} className="timeline-card">
              <h4>{exp.role}</h4>
              <span className="company">{exp.company}</span>
              <span className="duration">{exp.duration}</span>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="section-col">
          <h3>Education</h3>
          {profile.education?.map((edu, index) => (
            <div key={index} className="timeline-card">
              <h4>{edu.degree}</h4>
              <span className="company">{edu.institution}</span>
              <span className="duration">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
