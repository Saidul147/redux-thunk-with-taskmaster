import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/image/login.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/features/user/userSlice';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider()

  const dispatch = useDispatch()

  const onSubmit = ({ email, password }) => {
    // Email Password Login

   dispatch(loginUser({email,password}))

    console.log(email, password);
  };

  const {email,isError,error} = useSelector((state) => state.userSlice)
  console.log(error)
  useEffect(()=>{
    if(email){
      toast.success("Login Success")
      localStorage.setItem("login",true)
      setTimeout(()=>{
        navigate("/")
      },500)
    }else if(error){
      toast.error("Login failed")
    }
  },[email,error])

  const handleGoogleLogin = () => {
    // signInWithPopup(auth,googleProvider)
    // .then((result) => {
    //   console.log(result)
    // })
  }

  return (
    <div className="flex max-w-7xl h-screen items-center mx-auto">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email')}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password')}
              />
            </div>
            <div className="relative !mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
            <div>
              <p>
                Don&apos;t have an account?{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </span>
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </form>
        </div>
      </div>
      <Toaster position='top-right'  />
    </div>
  );
};

export default Login;
