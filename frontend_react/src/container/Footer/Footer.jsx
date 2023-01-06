import React, {useState, useEffect}  from 'react'

import { images } from "../../constants";
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Footer.scss';

import ReCAPTCHA  from 'react-google-recaptcha';


const Footer = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false); // Add a state variable to track whether the CAPTCHA has been verified

  const {name, email, message} = formData;

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
    

  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Add a callback function that will be called when the CAPTCHA has been verified
  const onChange = () => {
    setCaptchaVerified(true);
  }
  

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError('Please use a valid e-mail address'); // Set the email error message
      return;
    }

    setLoading(true);
    setEmailError('');

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }
   
    if (!captchaVerified) {
      setEmailError('Please validate the Captcha');
      return;
    }

    client.create(contact)
    .then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }

  return (
    <>
      <h2 className="head-text"> Take a coffe & chat with me!</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:contact@mateicristiandev.com" className='p-text'> contact@mateicristiandev.com </a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel:#" className='p-text'> +40 123 456 789 </a>
        </div>

      </div>
      

{!isFormSubmitted ? 
      <div className='app__footer-form app__flex'>
        <div className='app__flex'>
          <input className="p-text" type="text" placeholder='Your Name' name="name" value={name} onChange={handleChangeInput} />
        </div>
        <div className='app__flex'>
          <input className={`p-text ${emailError ? 'error' : ''}`} type="email" placeholder='Your E-mail' name="email" value={email} onChange={handleChangeInput} />
        </div>
        {emailError && <p className='error-message'>{emailError}</p>}
        <div>
          <textarea 
            className='p-text'
            placeholder='Your Message'
            value={message}
            name="message"
            onChange={handleChangeInput}
          />
          
        </div>
        <a className='p-text button' onClick={handleSubmit} >{loading ? 'Sending' : 'Send Message'} </a>
        <ReCAPTCHA
            sitekey= {process.env.REACT_APP_ReCaptcha_TOKEN} // Replace this with your site key
            onChange={onChange}
        />
      </div>
      : <div>
        <h3 className='head-text'> Thank you for getting in touch</h3>
      </div>
      
}
    </>
    
  )
  
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'), 
  'contact',
  'app__whitebg'
  );