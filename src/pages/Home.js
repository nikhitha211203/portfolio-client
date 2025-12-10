import React, { useEffect, useState } from 'react';
import { fetchAbout } from '../api';
import './Home.css';

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>{profile?.fullName || "Your Name"}</h1>
          <h2 className="role-text">{profile?.role || "Full Stack Developer"}</h2>
          <p className="bio-text">
            {profile?.bio || "Passionate developer building modern web applications."}
          </p>

          <div className="cta-buttons">
            <a
              href={profile?.resumeUrl || "#"}
              className="btn primary-btn"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
            <a href="/projects" className="btn secondary-btn">View Projects</a>
          </div>

          <div className="social-links">
            {/* You can add dynamic social links if added to schema, currently static */}
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        {profile?.profileUrl && (
          <div className="hero-image">
            <img src={profile.profileUrl} alt="Profile" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
