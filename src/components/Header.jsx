import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="bg-gradient-to-b from-black absolute px-6 py-2 z-30 flex justify-between items-center w-full">
      <div className="flex items-center">
        <img
          className="w-48"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full"
            src={user?.photoURL}
            alt="User Profile"
          />
          <button
            onClick={handleSignOut}
            className="text-white font-bold text-lg"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
