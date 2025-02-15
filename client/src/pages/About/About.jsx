import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h2>About Ed Learn</h2>
        <p>
          Ed Learn is an online learning platform dedicated to teaching coding
          and programming. Whether you're a beginner or an experienced
          developer, our courses are designed to help you learn efficiently.
        </p>
        <div className="about-features">
          <div className="feature">
            <h3>📚 High-Quality Courses</h3>
            <p>Learn from industry experts with well-structured courses.</p>
          </div>
          <div className="feature">
            <h3>💡 Interactive Learning</h3>
            <p>Practice coding through real-world projects and exercises.</p>
          </div>
          <div className="feature">
            <h3>🌎 Community Support</h3>
            <p>Join a global community of developers and share knowledge.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
