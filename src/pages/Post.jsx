import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading ] = useState(true);

    const userData = useSelector( (state) => state.auth.userData );

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {

      setLoading(true)

        if (slug) {
          appwriteService.getPost(slug)
          .then((post) => {

            if (post){ 
              setPost(post)
            }
            else {
              navigate("/")
            };

          })
          .catch( (error) => {
            console.log(error);
          } )
          .finally( () => {
            setLoading(false)
          } )
        } 
        else{
           navigate("/")
        }

    }, [slug, navigate]);

    const deletePost = () => {

        appwriteService.deletePost(post.$id)
        .then( (status) => {

          if (status) {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/");
          }

        });

    };

    if(loading === true){

       return (
              
              <div className="w-full py-8 mt-4 text-center h-screen">
      
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
                      Loading content for you...
                    </div>
                  </div>

                </Container>

                </div>

              
       )

    }

    return post ? (

        <div className="py-8">

            <Container>


              {/* post title with edit/delete buttons */}

                <div className="w-full mb-6 flex justify-between items-center">

                    <h1 className="text-2xl font-bold">{post.title}</h1>

                    {/* giving edit and delete button to author */}
                    { isAuthor && (

                        <div className="flex">

                          <Link to={`/edit-post/${post.$id}`}>

                            <Button bgColor="bg-[#06202B] " className="mr-3 text-[#7AE2CF] 
                               p-5 ">
                                Edit
                            </Button>

                          </Link>

                          <Button className="text-white bg-[#CB0404] box-border
                              hover:border hover:border-white" onClick={deletePost}>
                            Delete
                          </Button>

                        </div>

                    )}

                </div>

                

                

              <div className="w-full flex justify-center mb-4 relative rounded-xl p-2 ">



                <img
                  src={appwriteService.getFileView(post.featuredImage)}
                  alt={post.title}
                  className="rounded-xl"
                />

                    
              </div>


                {/* content */}

                <div className="browser-css ">

                    {parse(post.content)}

                </div>

            </Container>

        </div>

    ) : null;
}