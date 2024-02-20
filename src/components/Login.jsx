import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addUser } from "../features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInForm, setSignInForm] = useState(true);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const [errorMsg, seterrorMsg] = useState(null);

  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  const onHandleClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMsg(message);
    if (message) return;

    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/90442388?v=4",
          })
            .then(() => {
              // Profile updated!

              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              seterrorMsg(error);
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          seterrorMsg(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMsg(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!signInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Username"
            className="p-3 my-4 w-full bg-gray-800 border-2 border-gray-700 rounded"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 my-4 w-full bg-gray-800 border-2 border-gray-700 rounded"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full bg-gray-800 border-2 border-gray-700 rounded"
        />

        <p className="text-red-500 font-bold text-lg py-2">{errorMsg}</p>

        <button
          className="p-3 my-6 bg-red-700 w-full rounded-lg"
          onClick={onHandleClick}
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4  ">
          <span className="text-gray-400">
            {signInForm ? "New to Netflix?" : "Already a member?"}
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={toggleSignInForm}
          >
            {signInForm ? " Sign Up Now" : " Sign In Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
