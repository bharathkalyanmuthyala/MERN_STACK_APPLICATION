import React,{useContext,useEffect} from 'react'
import './Login.css'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { loginContext } from '../../contexts/loginContext'

function Login() {


  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)

  

   //navigate
   const navigate = useNavigate();
 
   //use form hook
   let {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();


   //user login
   const handleUserLogin=(userCredObj)=>{
   //console.log(userCredObj)
    loginUser(userCredObj)
   }


   useEffect(()=>{
    if(userLoginStatus===true){
      navigate("/user-profile")
    }
   },[userLoginStatus])

  

  return (
    <div className="add-user mt-5">
     
      {/* form submission error */}
      {error && error.length!=0 && (
        <p className="display-3 text-danger text-center">{error}</p>
      )}
      {/* add user form */}
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(handleUserLogin)}>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="name">Userame</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="e.g. John"
                {...register("username", { required: true })}
              />
              {/* validation errors for name */}
              {errors.username?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Username is required
                </p>
              )}
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                placeholder="*********"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {/* validation errors for name */}
              {errors.password?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Password is required
                </p>
              )}
            </div>
            
           
           
           
            {/* submit button */}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login