import React from 'react'
import logoImage from '../assets/logo.png'

function Logo({width = '100px'}) {
  return (
    <div style={ {backgroundImage: `url(${logoImage})`, height: '50px', width: '300px',  backgroundSize: 'contain', backgroundRepeat: 'no-repeat'  } } >
      {/* <img src={logoImage} alt='Logo' style={{ width: '100px', height: '100px' }}  ></img> */}
    </div>
  )
}

export default Logo