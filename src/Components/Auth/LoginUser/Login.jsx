// src/components/Login.js
import React, { useState } from 'react';
import authService from '../../FirebaseStore/LoginFirebase';
import { useNavigate } from 'react-router-dom';
// import locals
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorType, setErrorType] = useState('');
  const [error, setError] = useState('');
const [loading,setLoading]=useState(false)
const onPressLogin=()=>{
if(email && password){
  handleLogin()
}
else{
  alert("Please fill out all the info")
}
}

  const handleLogin = async (e) => {
    setLoading(true)
    // e.preventDefault();
    try {
      // Call Firebase authentication service to log in the user
      const user = await authService().loginWithEmailAndPassword(email, password);
      // Store user data and UID in local storage
      localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('uid', user.uid);
      // Redirect to the home page
      // history.push('/');
      navigate('/')
    } catch (error) {
      // Set error type based on the error message
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('password')) {
        setErrorType('password');
      } else if (errorMessage.includes('email')) {
        setErrorType('email');
      } else {
        setErrorType('valid');
      }
      setError(error.message);
    } finally{
      setLoading(false)
    }
  };

  return (
    
      <div>
           <div>
      {/* <section className="normal-breadcrumb set-bg" data-setbg="img/normal-breadcrumb.jpg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="normal__breadcrumb__text">
              <h2>Login</h2>
              <p>Welcome to the official Amore&nbsp;book reading app.</p>
            </div>
          </div>
        </div>
      </div>
    </section> */}
    
    <section className="login spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="login__form">
              <h3>Login</h3>
              <form >
                <div className="input__item">
                  <input type="text" placeholder="Email address"
                   value={email} onChange={(e)=>setEmail(e.target.value)} 
                  />
                  <span className="icon_mail" />
                </div>
                <div className="input__item">
                  <input type="password" placeholder="Password"
                   value={password} onChange={(e)=>setPassword(e.target.value)} 
                  />
                  <span className="icon_lock" />
                </div>
                {loading === true ?
                <div  className="site-btn">Loaing...</div>
              :
                <div onClick={()=> onPressLogin()}  className="site-btn">Login Now</div>
              }

              </form>
              {error && <div>{error}</div>}

              <a href="#" className="forget_pass">Forgot Your Password?</a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login__register">
              <h3>Dont’t Have An Account?</h3>
              <a href="/SignUp" className="primary-btn">Register Now</a>
            </div>
          </div>
        </div>
        {/* <div className="login__social">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="login__social__links">
                _______________________________<span>or</span>
                <ul>
                  <li><a href="#" className="facebook"><i className="fa fa-facebook" /> Sign in With
                      Facebook</a></li>
                  <li><a href="#" className="google"><i className="fa fa-google" /> Sign in With Google</a></li>
                  <li><a href="#" className="twitter"><i className="fa fa-twitter" /> Sign in With Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
    
  </div>
  
      </div>
    
  );
};

export default Login;
