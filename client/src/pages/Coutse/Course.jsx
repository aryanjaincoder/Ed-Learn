import React, { useState } from 'react';
import { FaPlay, FaStar, FaUser, FaClock, FaMoneyBill, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Course.css';

const CoursePage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const course = {
    title: "The Complete React Developer Course",
    description:
      "Learn React from scratch. Build real-world applications with React, Redux, and React Router.",
    instructor: {
      name: "John Doe",
      bio: "Senior Software Engineer with 10+ years of experience in web development.",
      image: "https://th.bing.com/th/id/OIP.rVA7ubg8ckJ_jJZJjY__JgHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    rating: 4.7,
    students: 15000,
    duration: "18 hours",
    price: "$94.99",
    discountedPrice: "$12.99",
    curriculum: [
      {
        id: 1,
        title: "Introduction to React",
        lectures: [
          { id: 1, title: "What is React?", url: "https://www.youtube.com/embed/dGcsHMXbSOA" },
          { id: 2, title: "Setting Up Your Environment", url: "https://www.youtube.com/embed/7YhYI_l2W7Y" },
        ],
      },
      {
        id: 2,
        title: "Components and Props",
        lectures: [
          { id: 3, title: "Functional Components", url: "https://www.youtube.com/embed/3Z0V3PVdF7A" },
          { id: 4, title: "Class Components", url: "https://www.youtube.com/embed/5QfZ8V2Zc4E" },
        ],
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Alice Johnson",
        comment: "This course is amazing! I learned so much about React in a short time.",
      },
      {
        id: 2,
        name: "Bob Smith",
        comment: "The instructor is very knowledgeable and explains concepts clearly.",
      },
    ],
  };

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="course-page">
      {/* Header Section */}
      <div className="course-header">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {course.title}
        </motion.h1>
        <p>{course.description}</p>
        <div className="course-meta">
          <span>
            <FaStar /> {course.rating} ({course.students}+ students)
          </span>
          <span>
            <FaUser /> {course.instructor.name}
          </span>
          <span>
            <FaClock /> {course.duration}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-content">
        {/* Curriculum Section */}
        <div className="curriculum">
          <h2>Curriculum</h2>
          {course.curriculum.map((section) => (
            <div key={section.id} className="curriculum-section">
              <div className="section-header" onClick={() => toggleSection(section.id)}>
                <h3>{section.title}</h3>
                <FaChevronDown className={activeSection === section.id ? 'rotate' : ''} />
              </div>
              {activeSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="lectures"
                >
                  {section.lectures.map((lecture) => (
                    <div key={lecture.id} className="lecture">
                      <h4>
                        <FaPlay /> {lecture.title}
                      </h4>
                      <div className="video-container">
                        <iframe
                          src={lecture.url}
                          title={lecture.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="course-sidebar">
          {/* Pricing Box */}
          <div className="pricing-box">
            <h3>Course Price</h3>
            <p className="original-price">{course.price}</p>
            <p className="discounted-price">{course.discountedPrice}</p>
            <button className="enroll-button">Enroll Now</button>
          </div>

          {/* Instructor Profile */}
          <div className="instructor-profile">
  <h3>Instructor</h3>
  <div className="instructor-info">
    <img src={course.instructor.image} alt={course.instructor.name} />
    <div className="instructor-details">
      <h4>{course.instructor.name}</h4>
      <p>{course.instructor.bio}</p>
    </div>
  </div>
</div>

          {/* Testimonials */}
          <div className="testimonials">
            <h3>What Students Say</h3>
            {course.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial">
                <p>{testimonial.comment}</p>
                <span>- {testimonial.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
