import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import "./contact.css"

function MyContact() {
    const teamMembers = [
        {
          name: "Aryan Jain",
          role: "Founder & CEO",
          email: "aryan@edLearn.com",
          phone: "+91 9999999999",
          linkedin: "https://linkedin.com/in/aryanjain",
        },
        {
          name: "Shashank Shekhar",
          role: "Lead Instructor",
          email: "shashank@edLearn.com",
          phone: "+91 9999999999",
          linkedin: "https://linkedin.com/in/rahulsharma",
        },
        {
          name: "Aditya Kakauriya",
          role: "Marketing Head",
          email: "aditya@edLearn.com",
          phone: "++91 9999999999",
          linkedin: "https://linkedin.com/in/priyaverma",
        },
        {
          name: "Satyam Prakash",
          role: "Technical Lead",
          email: "satyam@edLearn.com",
          phone: "+91 9999999999",
          linkedin: "https://linkedin.com/in/sandeepkumar",
        },
      ];

      return (

        <div>

          <section className="contact">
            <h2>Contact Our Team</h2>
            <p>Get in touch with us for any queries or collaborations.</p>

            <div className="contact-cards">
              {teamMembers.map((member, index) => (
                <div className="contact-card" key={index}>
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="contact-logo">
                    <FaEnvelope />{" "}
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </p>
                  <p className="contact-logo">
                    <FaPhone /> <a href={`tel:${member.phone}`}>{member.phone}</a>
                  </p>
                  <p className="contact-logo">
                    <FaLinkedin />{" "}
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </section>

         
              </div>

      );
    }


export default MyContact
