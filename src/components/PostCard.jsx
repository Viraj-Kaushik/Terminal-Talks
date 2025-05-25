import React from 'react'
import appwriteService from '../appwrite/config'    // this is noraml services object renamed here
import { Link } from 'react-router-dom'

function PostCard( {$id, title, featuredImage } ) {

  // console.log("image :: ",appwriteService.getFilePreview(featuredImage))
 
  const imageUrl = featuredImage ? appwriteService.getFileView(featuredImage) : null

  return (
    
    <Link to={`/post/${$id}`}>

        <div className='w-full bg-[#90D1CA] rounded-xl p-4 '>

            {/* image of the post */}

            <div className='w-full justify-center mb-4'>

                <img src= {imageUrl}  alt='Featured Image'
                 className='rounded-xl' />

            </div>

            <h2
            className='text-xl font-bold'
            > {title} </h2>

        </div>

    </Link>
    
  )

}

export default PostCard