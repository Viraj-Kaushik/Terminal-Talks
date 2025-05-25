import React, {useState, useEffect} from 'react'
import { Container, Logo, PostCard } from '../components'
import appwriteServices from '../appwrite/config'
import { Link, useNavigate } from 'react-router-dom'


function Home() {

  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [typedText, setTypedText] = useState('');
  const fullText = 'TERMINAL TALKS';


  // for transition

 useEffect(() => {
  let index = 0;
  let isDeleting = false;
  let interval;

  const type = () => {
    interval = setInterval(() => {
      if (!isDeleting) {
        // Typing forward
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          // Pause before starting to delete
          clearInterval(interval);
          setTimeout(() => {
            isDeleting = true;
            type(); // Start deleting
          }, 2000);
        }
      } else {
        // Deleting
        if (index > 0) {
          setTypedText(fullText.slice(0, index - 1));
          index--;
        } else {
          // Pause before re-typing
          clearInterval(interval);
          setTimeout(() => {
            isDeleting = false;
            type(); // Start typing again
          }, 500);
        }
      }
    }, 150);
  };

  type(); // Start the animation

  return () => clearInterval(interval); // Cleanup on unmount
}, []);




  // for getting posts

  useEffect( () => {

    setLoading(true)

    appwriteServices.getPosts()
    .then( (posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    } )
    .catch( (error) => {
        console.log(error)
    } )
    .finally( () => {
        setLoading(false)
    } )

  }, [] )

  

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
          
          {/* Skeleton cards */}

          {/* can be used later when load increases */}

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

  if (posts.length === 0) {

    

    return (

        <div className="w-full py-16 bg-[#06202B] text-white min-h-screen flex items-center">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="max-w-xl">


            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Welcome to 
              <br />
              <span className="text-[#7AE2CF] font-mono">
                {typedText}
                <span className="animate-blink">|</span>
              </span>
            </h1>


            <p className="text-lg text-gray-300 mb-6">
              Explore cutting-edge blogs, tutorials, and insights from the world of technology.
              Whether you're a beginner or an expert, there's something for everyone here.
            </p>

            {/* Feature Highlights */}
            <ul className="text-gray-300 space-y-2 mb-8 list-disc list-inside">
              <li> Curated blogs on Web Development, AI, Cloud & more</li>
              <li> Tips from industry professionals and student coders</li>
              <li> Stay updated with trending technologies</li>
              <li> No spam — only pure tech knowledge</li>
            </ul>

            {/* CTA Buttons */}
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-[#7AE2CF] text-[#06202B] rounded-lg hover:bg-[#129990]  
                hover:text-[#06202B] transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 border border-[#7AE2CF] text-[#7AE2CF] rounded-lg hover:bg-[#129990] hover:text-[#06202B] hover:border-[#7AE2CF]"
              >
                Create Account
              </Link>
            </div>
          </div>

          
        </div>
      </Container>
    </div>

        )

    }

  return (

    <div className='w-full py-8 min-h-screen'>

      <Container>

        <div className='flex flex-wrap'>

          { posts.map( (post) => (

            <div key={post.$id} className='p-2 w-1/4'>

                <PostCard {...post} />

            </div>

          ) ) }

        </div>

      </Container>
      
    </div>

  )
}

export default Home