import React, { useState, useContext } from 'react';
import { userContext } from '../../App';
import "../../Styles/Login.css";

const Login = () => {
  const { setIsAuth, userName, setUserName } = useContext(userContext);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "") {
      setErrMsg("Please enter Your Name");
    } else {
      setErrMsg("");
      localStorage.setItem("userName", userName);
      setIsAuth(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className='login-heading'>Sign In</h1>
        {errMsg && <p className="login-error">{errMsg}</p>}
        
        <label htmlFor="username" className="login-label">Username</label>
        <input 
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="login-input"
          placeholder='Enter your name here'
        />
        
        <button type="submit" className="login-btn">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
