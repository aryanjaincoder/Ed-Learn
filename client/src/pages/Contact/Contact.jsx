

import React from 'react'
import MyContact from '../../components/mycontact/MyContact'
import ContactForm from '../../components/contact/ContactForm'

function Contact() {
  return (
    <div style={{display : "flex", flexDirection : "column", alignItems : "center"}}>
      <MyContact/>
      <ContactForm/>
    </div>
  )
}

export default Contact
