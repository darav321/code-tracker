import React, { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode"; // To decode Google JWT

const GoogleAuth = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <>
          <h3>Welcome, {user.name}</h3>
          <img src={user.picture} alt="Profile" />
          <button onClick={() => { googleLogout(); setUser(null); }}>
            Logout
          </button>
        </>
      ) : (
        <GoogleLogin
          onSuccess={(response) => {
            const decodedUser = jwt_decode(response.credential);
            console.log(decodedUser); // User details
            setUser(decodedUser);
          }}
          onError={() => console.log("Login Failed")}
        />
      )}
    </div>
  );
};

export default GoogleAuth;
