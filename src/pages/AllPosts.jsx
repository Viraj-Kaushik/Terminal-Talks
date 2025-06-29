import React,{useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {Container , PostCard} from '../components'

function AllPosts() {

  const[posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {

    setLoading(true)

    appwriteService.getPosts([])
    .then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
    .catch( (error) => {
      console.log(error);
    } )
    .finally( () => {
      setLoading(false)
    } )

  } , [] )


  // handling the loading state as same as home page

  if(loading === true){
  
      return (
        
        <div className="w-full py-8 mt-4 text-center">

          <Container>
            
            <div className="flex flex-col justify-center items-center min-h-64">
              <div className="flex space-x-2 mb-4">
                {[0, 1, 2].map((index) => (
                  <div 
                    key={index}
                    className="w-4 h-4 rounded-full bg-[#06202B] animate-bounce" 
                    style={{ 
                      animationDelay: `${index * 0.15}s`,
                      animationDuration: "0.8s"
                    }}
                  />
                ))}
              </div>
              <div className="text-xl font-medium text-gray-700">
                Loading amazing content for you...
              </div>
            </div>
            
            {/* Skeleton Postcards */}
  
            <div className="flex flex-wrap mt-8">

              {[1, 2, 3, 4, 5, 6].map((item) => (

                <div key={item} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="animate-pulse">
                      <div className="h-48 bg-gray-300"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
  
          </Container>
        </div>
      )
  
    }


  // console.log(posts.documents);

  return (

    <div className='w-full py-8 pb-12'>

      <Container>

        <div className='flex flex-wrap min-h-screen'>



          { posts.map( (post) => (

            <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4' >
              <PostCard {...post} />
            </div>

          ) ) }

        </div>

      </Container>
      
    </div>

  )
}

export default AllPosts