import { useRef, useState } from "react";
import "./contact.scss";
import emailjs from '@emailjs/browser';

function ContactForm() {
    const formRef = useRef();
    const [message, setMessage] = useState(false);


    const formSubmit = (e) => {
      e.preventDefault();

      emailjs
        .sendForm('service_dhuyayp', 'template_cvxoeqt', formRef.current, {
          publicKey: 'kQHv4dvYKfIiXyGdg',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            setMessage(true);
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };



    return (
      <div className="contact-form" id="contact">
        <div className="left">
          <img src="shake.svg" alt="" />
        </div>
        <div className="right">
          <h2>Contact.</h2>
          <form ref={formRef} onSubmit={formSubmit} >
            <input type="text" placeholder="Your name" name="user_name"/>
            <input type="text" placeholder="Your email" name="user_email"/>
            <textarea placeholder="Your message for us" name="message"></textarea>
            <button type="submit">Send</button>
            {message && <span>Thanks, I'll reply ASAP :)</span>}
          </form>
        </div>
      </div>
    );
}

export default ContactForm
