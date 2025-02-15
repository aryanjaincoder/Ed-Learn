import React from "react";
import "./FeaturedPost.css";

export default function FeaturedPost() {
  const featured = {
    title: "Mastering JavaScript: Tips & Tricks",
    description: "Improve your JavaScript skills with these expert techniques!",
    image: "https://plus.unsplash.com/premium_photo-1664297844174-d7dfb8d0e7f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D",
    link: "#"
  };

  return (
    <div className="featured">
      <h2>🔥 Featured Post</h2>
      <div className="featured-content">
        <img src={featured.image} alt={featured.title} />
        <div className="featured-text">
          <h3>{featured.title}</h3>
          <p>{featured.description}</p>
          <a href={featured.link} className="read-more">Read More →</a>
        </div>
      </div>
    </div>
  );
}
