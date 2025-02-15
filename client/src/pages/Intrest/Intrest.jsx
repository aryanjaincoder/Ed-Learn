import React, { useState } from "react";
import "./Intrest.css";

const UserPreferences = ({ onSavePreferences }) => {
  const [level, setLevel] = useState("");
  const [interests, setInterests] = useState([]);

  const interestOptions = [
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Competitive Programming",
    "Cyber Security",
    "App Development",
    "Game Development",
  ];

  const handleInterestChange = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if (!level || interests.length === 0) {
      alert("Please select a skill level and at least one interest.");
      return;
    }
    onSavePreferences({ level, interests });
  };

  return (
    <div className="preferences-container">
      <h2>Personalized Learning Setup</h2>
      <div className="level-selection">
        <h3>Select Your Skill Level:</h3>
        <div className="levels">
          {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
            <button
              key={lvl}
              className={level === lvl ? "selected" : ""}
              onClick={() => setLevel(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="interest-selection">
        <h3>Select Your Interests:</h3>
        <div className="interests">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              className={interests.includes(interest) ? "selected" : ""}
              onClick={() => handleInterestChange(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <button className="save-btn" onClick={handleSubmit}>
        Save Preferences
      </button>
    </div>
  );
};

export default UserPreferences;
