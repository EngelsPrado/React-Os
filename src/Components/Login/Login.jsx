import React,{useState} from 'react'
import { auth } from 'firebase';
import { signInWithFacebook, signInWithGoogle } from '../../firebase';
import './style.css'
const Login =()=>{

  
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const [error,seterror]=useState(null)
    const sesion=(e)=>{

      e.preventDefault()
      
        auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        seterror(errorMessage)
      });

    }
    
    
    const iniciarG=(e)=>{

        e.preventDefault() 
        signInWithGoogle()

       
    
   }

   const iniciarF=(e)=>{
        e.preventDefault() 
       signInWithFacebook()

      
       

  }
  return (
    <div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <div class="login100-pic js-tilt animated infinite pulse delay-2s" data-tilt>
                <img src="images/React.png" alt="IMG"/>
                <h1>React Os</h1>
            </div>

            <form class="login100-form validate-form">
                <span class="login100-form-title">
                    Login
                </span>

                <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} class="input100" type="text" name="email" placeholder="Email"/>
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate = "Password is required">
                    <input value={pass} onChange={(e)=>setPass(e.target.value)}  class="input100" type="password" name="pass" placeholder="Password"/>
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </span>
                </div>
                
                <div class="container-login100-form-btn">
                    <button class="login100-form-btn" onClick={sesion} type="submit">
                        Login
                    </button>
                </div>

                <div class="text-center p-t-12">
                    <span class="txt1">
                        Forgot
                    </span>
                    <a class="txt2" href="#">
                        Username / Password?
                    </a>
                </div>
                <div class="or-box">
                    <span class="or">o</span>
                    <div class="row">
                        <div class="col-md-6 row-block">
                            <button   onClick={iniciarF} class="btn btn-facebook btn-block">Facebook</button>
                        </div>
                        <div class="col-md-6 row-block">
                            <button onClick={iniciarG} class="btn btn-google btn-block">Google</button>
                        </div>
                    </div>
                </div>
                <div class="text-center p-t-136">
                   {error}
                </div>
            </form>
        </div>
    </div>
</div>
  )
 

}

export default Login