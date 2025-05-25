import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from "../index";
import appwriteService from '../../appwrite/config'// you can change name here because of export default
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm( {post} ) {

  const navigate = useNavigate()
  const {slug} = useParams()

  const {register, handleSubmit, watch, setValue, control, getValues} = useForm( {
    defaultValues : {
      title : post?.title || "",
      slug : post?.$id || "",
      content : post?.content || "" ,
      status : post?.status || "active" ,
    }
  } )

  const userData = useSelector( state => state.auth.userData )

  const submit = async (data) => {

    // if post is already there

    if(post){

        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        // if new file is uploaded dlt previous one

        if(file) {
          appwriteService.deleteFile(post.featuredImage)
        }

        const dbPost = await appwriteService.updatePost( post.$id , {
          ...data,
          featuredImage : file? file.$id : post.featuredImage,

        } )

        if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }

    }

    // in case there is no post

    else{

        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if(file){

          const fileId = file.$id
          data.featuredImage = fileId

          const dbPost = await appwriteService.createPost( {
            ...data,
            userId : userData.$id,
            
          } )

          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }

        }

    }

  }

  // end of submit function

  // to transform the title to slug 

  const slugTransform = useCallback( (value) => {

    if(value && typeof value === "string" ){

      return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")    // regex to replace all the letters other than these with "-"
      .replace(/\s/g, "-");

    }

    return ""     // for edge case

  }, [] )

  // for optimization

  useEffect( () => {

    const subscription = watch((value, { name }) => {

      if(name === "title"){
        setValue("slug", slugTransform(value.title), 
        { shouldValidate: true });
      }

    });

    return () => {
      subscription.unsubscribe();     // for optimisation
    }

    }, [watch, slugTransform, setValue]);

  return (

    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">


        {/* left or first part */}

        <div className="w-2/3 px-2">

          {/* used input component */}

            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />

            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

            </div>

            {/* right part */}

            <div className="w-1/3 px-2">
                <Input
                  label="Featured Image :"
                  type="file"
                  className="mb-4"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />

                {post && (

                  <div className="w-full mb-4">
                      <img
                          src={appwriteService.getFileView(post.featuredImage)}
                          alt={post.title}
                          className="rounded-lg"
                      />
                  </div>

                )}

                <Select

                  options={["active", "inactive"]}
                  label="Status"
                  className="mb-4"
                  {...register("status", { required: true })}
                    
                />

                <Button 
                type="submit" 
                bgColor="bg-[#06202B]"
                textColor='text-[#F5EEDD]'
                className="w-full"
                >
                    {post ? "Update" : "Submit"}

                </Button>

            </div>

        </form>

  )

}

export default PostForm