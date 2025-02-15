import React, { useContext } from "react";

import "./Courses.css";

// Import Course Images
import cppImg from "../../assets/cpp.jpg";
import pythonImg from "../../assets/python.jpg";
import javaImg from "../../assets/java.jpg";
import jsImg from "../../assets/js.jpg";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

// Course Data
const courses = [
  { id: 1, name: "C++ Programming", image: cppImg, description: "Learn C++ from basics to advanced concepts." },
  { id: 2, name: "Python Programming", image: pythonImg, description: "Master Python for web, AI, and data science." },
  { id: 3, name: "Java Development", image: javaImg, description: "Deep dive into Java and OOP concepts." },
  { id: 4, name: "JavaScript Essentials", image: jsImg, description: "Learn JavaScript for front-end and back-end." },
];

export default function Courses() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`courses-container ${darkMode ? "dark" : ""}`}>
      <h2>Our Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.name} className="course-image" />
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <Link to = "/courses/course">
            <button className="enroll-btn">Enroll Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
