import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {Button, Input, Logo} from './index'

function Login() {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const login = async(data) => {
        setError("")

        try{

            const session = await authService.login(data)

            if(session){
                const userData = await authService.getCurrentUser()

                if(userData){
                    dispatch(authLogin(userData))
                }

            navigate("/")

            }


        }
        catch(error){
            setError(error)
        }

    }

  return (

    <div className='flex items-center justify-center w-full'>

        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            
            {/* logo */}

            <div className="mb-2 flex justify-center">

                <span className="flex w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>

            </div>

            {/* Sign in and if no account then direct to sign up */}

            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

            <p className="mt-2 text-center text-base text-black/60">

                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>

            </p>

            {/* show error if it's there */}

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>} 
            
            {/* form */}

            <form onSubmit={handleSubmit(login)} className='mt-8'>

                <div className='space-y-5'>

                    {/* input for email */}

                    <Input

                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register( "email", {
                        required: true,
                        validate: {
                            // Regular Expression - RegEx is used here
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />

                    {/* input for password */}


                    <Input
                    
                    label = "Password : "
                    type = "password"
                    placeholder = "Enter your password"
                    {...register( "password", {
                        required : true,
                    } ) }

                    />


                    {/* Sign In button */}

                    <Button
                    type="submit"
                    className="w-full text-white"
                    >Sign in
                    </Button>

                </div>

            </form>
        
        </div>
        
    </div>

  )

}

export default Login