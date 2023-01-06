import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
          <a href="https://github.com/Skystream96" target="_blank" rel="noopener noreferrer">
            <BsGithub/>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/stamate-cristian-matei-658354131/" target="_blank" rel="noopener noreferrer">
           <BsLinkedin/>
          </a>
        </div>
        <div>
          <a href="https://www.facebook.com/Matthew.Matei" target="_blank" rel="noopener noreferrer">
           <FaFacebookF/>
          </a>
        </div>
    </div>
  )
}

export default SocialMedia