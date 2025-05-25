// for layput of btn

import React from 'react'

function Button({

    children,       // nothing just the text of button (children used as fancy term)
    type = "button",
    bgColor="bg-[#06202B]",
    textColor = "text-[#]",
    className = "",
    ...props
    
    }) {

  return (
    
    <button className = {` px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `} {...props} >
        {children}
    </button>
    
  )

}

export default Button