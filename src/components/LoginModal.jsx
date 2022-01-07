import React, { useState } from "react";

function LoginModal() {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLoginOrReg(un, pw) {
    let response;
    if (login) {
      console.log("You are signing in", un, pw);
    } else {
      console.log("You are registering", un, pw);
    }
  }

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="bg-white h-[200px] w-[250px] absolute top-16 right-0 z-20 rounded-md border-4 border-primary flex flex-col items-center ">
      <input
        type="text"
        value={username}
        placeholder="Username"
        className="border-2 border-primary rounded w-[212px] h-[30px] pl-1 mt-4"
        onChange={handleUsername}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        className="border-2 border-primary rounded w-[212px] h-[30px] pl-1 mt-4"
        onChange={handlePassword}
      />
      <button
        className="bg-background text-white w-[82px] h-[30px] rounded-lg mt-2"
        onClick={() => {
          handleLoginOrReg(username, password);
        }}
      >
        {login ? "Sign in" : "Register"}
      </button>
      <p className="text-primary opacity-50 mt-1">or</p>
      <button
        className="w-[82px] h-[12px] text-detail"
        onClick={() => {
          setLogin(!login);
        }}
      >
        {!login ? "Sign in" : "Register"}
      </button>
    </div>
  );
}

export default LoginModal;
