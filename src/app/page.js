"use client";

import { useState, useCallback } from "react";
import clipboardCopy from "clipboard-copy";
import { Container } from "react-bootstrap";

function getPassword(setPassword) {
  const apiUrl = "/api/getpassword";
  // Making a GET request to the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data from the API
      setPassword(data.password);
      return data;
    })
    .catch((error) => {
      // Handle errors during the API call
      console.error("Error during API call:", error.message);
    });
}

export default function Home() {
  const [password, setPassword] = useState("");

  const getPasswordCallback = useCallback(
    () => getPassword(setPassword),
    [setPassword]
  );

  const copyToClipboard = () => {
    if (password) {
      clipboardCopy(password).catch((error) =>
        console.error("Error copying to clipboard:", error)
      );
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="Container">
          <a href="#" className="navbar-brand ps-3">
            Simple Password Generator
          </a>
        </div>
      </nav>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <p className="lead">
              This simple password generator will generate a strong password, 20
              characters long.
              <br /> Click the left button to create the password, and the right
              button to copy to your clipboard
            </p>
            <div className="fs-5 my-4 border border-1 rounded">
              {password ? (
                <p className="py-4 mb-0 fw-bold">{password}</p>
              ) : (
                <p className="py-4 mb-0 fw-lighter fst-italic">
                  Click the button below
                </p>
              )}
            </div>
            <button
              className={`btn mx-2 ${
                password ? "btn-secondary" : "btn-primary"
              }`}
              onClick={getPasswordCallback}
            >
              Generate Password
            </button>
            <button
              className={`btn mx-2 ${
                password ? "btn-primary" : "btn-secondary"
              }`}
              onClick={password ? copyToClipboard : null}
              disabled={!password}
            >
              Copy to Clipboard
            </button>
            <p className="mt-4">Created with ❤ in Next.js and Python</p>
          </div>
        </div>
      </div>
    </div>

    /* <div className="container my-5">
<div className="row">
  <div className="col-md-8 offset-md-2 text-center">
    <h1 className="mb-4">Simple Password Generator</h1>
    <p className="display-7 my-4">
      {password ? (
        <p className="display-9 my-4">{password}</p>
      ) : (
        <span>&nbsp;</span>
        // or simply use {null} if you prefer no space
      )}
    </p>
    <button
      className={`btn mx-2 ${password ? "btn-secondary" : "btn-primary"}`}
      onClick={getPasswordCallback}
    >
      Generate Password
    </button>
    <button
      className={`btn mx-2 ${password ? "btn-primary" : "btn-secondary"}`}
      onClick={password ? copyToClipboard : null}
      disabled={!password}
    >
      Copy to Clipboard
    </button>
    <p className="mt-4">Created with ❤ in Next.js and Python</p>
  </div>
</div>
</div> */
  );
}
