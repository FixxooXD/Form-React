import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<link rel="stylesheet" href="../.css" />;

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(true);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit =  async (e) =>{
    e.preventDefault();

    setSuccess(true)
  }



  return (

    <div className="flex justify-center items-center">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">
          {errMsg}
        </p>
      </section>


    {
      success ? (
        <>
        <span>GetLogin</span>
        <h1>{user}</h1>
        </>
      ) 
      : (
<form onSubmit={handleSubmit} className="w-[25rem] mt-[8rem]">
        <div class="container border-2 flex flex-col p-5">
          <h1 className="text-center">Register</h1>
          <label className="mt-2">Username : </label>
          {/* <FontAwesomeIcon icon={faCheck} className={validName ? "block" : "none"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "block" : "none"} /> */}
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            aria-invalid={validName ? "false" : "true"}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="border-2 mt-1 p-1"
            placeholder="Enter Username"
            name="username"
            aria-describedby="pwdnote"
            onChange={(e) => setUser(e.target.value)}
            required
          />
          {user && userFocus && !validName ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          ) : null}

          {/*  PassworD */}
          <label className="mt-2">Password : </label>
          <input
            type="password"
            className="border-2 mt-1 p-1"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            required
          />

          {pwd && pwdFocus && !validPwd ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          ) : null}

          <label className="mt-2">Confirm Password: </label>
          <input
            type="password"
            className="border-2 mt-1 p-1"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            required
          />

          {matchFocus && !validMatch ? (
            <p>Must match the first password input field.</p>
          ) : null}

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}>
            Sign Up
          </button>
          {/* <input type="checkbox" checked="checked" /> Remember me */}
          <button
            type="button"
            onClick={console.log("yo")}
            // disabled={!validName || !validPwd || !validMatch ? true : false}
            className="mt-2">
            {" "}
            Cancel
          </button>
        </div>
      </form>
      )
    }

    </div>
  );
};
