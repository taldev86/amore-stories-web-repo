import React from 'react'
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const auth = getAuth();
  const firestore = getFirestore();

  const onPressRegister = () => {
    if (email && password) {
      handleFormSubmit()
    }
    else {
      alert("Please fill up all the information")
    }
  }

  const handleFormSubmit = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user's information to Firestore database
      const userDocRef = doc(firestore, 'users', user.uid); // Reference to the user document
      await setDoc(userDocRef, {
        email: user.email,
        favorites: [],
        points: 0
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        favorites: [],
        books: [],
        points: 0
      };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');

    } catch (error) {
      console.error('Error signing up:', error);
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
                  <h2>Sign Up</h2>
                  <p>Welcome to the official Anime&nbsp;blog.</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="signup spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="login__form">
                  <h3>Sign Up</h3>
                  <form >
                    <div className="input__item">
                      <input type="text" placeholder="Email address"
                        value={email} onChange={(e) => setEmail(e.target.value)}

                      />
                      <span className="icon_mail" />
                    </div>
                    <div className="input__item">
                      <input type="text" placeholder="Your Name"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                      />
                      <span className="icon_profile" />
                    </div>
                    <div className="input__item">
                      <input type="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="icon_lock" />
                    </div>
                    <div
                      onClick={() => handleFormSubmit()}
                      className="site-btn">Sign Up</div>
                  </form>
                  <h5>Already have an account? <a >Log In!</a></h5>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login__social__links">
                  <h3>Login With:</h3>
                  <ul>
                    <li><a className="facebook"><i className="fa fa-facebook" /> Sign in With Facebook</a>
                    </li>
                    <li><a className="google"><i className="fa fa-google" /> Sign in With Google</a></li>
                    <li><a className="twitter"><i className="fa fa-twitter" /> Sign in With Twitter</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Register