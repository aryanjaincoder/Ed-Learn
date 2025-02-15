import React from "react";
import "./Categories.css";

const categories = ["JavaScript", "Python", "Web Development", "AI & ML", "Cybersecurity"];

export default function Categories() {
  return (
    <div className="categories">
      <h2>📂 Categories</h2>
      <div className="category-list">
        {categories.map((cat, index) => (
          <button key={index} className="category-btn">{cat}</button>
        ))}
      </div>
    </div>
  );
}
