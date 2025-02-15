import React, { useState, useEffect } from "react";
import "./DoYouKnow.css";

const facts = [
  "The first computer bug was an actual moth.",
  "Python is named after Monty Python, not the snake!",
  "JavaScript was created in just 10 days.",
  "GitHub was originally called Logical Awesome.",
  "The first website is still online: info.cern.ch"
];

export default function DidYouKnow() {
  const [fact, setFact] = useState("");

  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  }, []);

  return (
    <div className="did-you-know">
      <h2>🤔 Did You Know?</h2>
      <p>{fact}</p>
    </div>
  );
}
