import { useState } from 'react'
import '../styles/contact.css'
import React from 'react'

const Contact = React.forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phoneNumber: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE', // Replace this with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          business_name: formData.businessName,
          phone: formData.phoneNumber,
          message: formData.message,
          subject: 'New Contact Form Submission - Digital Move Platform'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message. We will get back to you soon!'
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          businessName: '',
          phoneNumber: '',
          message: ''
        })
      } else {
        throw new Error('Something went wrong!')
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="contact-section" ref={ref}>
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-title">We've been waiting for you.</h2>
            <p className="contact-subtitle">We want to hear from you. Let us know how we can help.</p>
          </div>

          <div className="form-container">
            <h3 className="form-title">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Business name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="form-input form-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              {submitStatus.message && (
                <div className={`submit-status ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Contact
