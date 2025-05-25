import React, {useId} from 'react'

const Input = React.forwardRef( function Input ({           // object and ref as input
    label,
    type = "text",
    className = "",
    ...props
    }, ref){

    const id = useId()

    return(
        
        <div className='w-full'>

            {/* label - if it is to be added */}

            { label && <label 
            className='inline-block mb-1 pl-1'
            htmlFor='id'>
                {label}         {/* text of the label */}
            </label> 
            }

            {/* main input box */}

            <input 
            type = {type}
            className= {` px-3 py-2 rounded-lg bg-white text-[#06202B] outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`} 

            ref={ref}               // very important for using forwardRef 
            {...props}
            id={id}
            />

        </div>
        
    )

} )

export default Input