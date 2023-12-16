"use client";

import { useState, useCallback } from "react";
import clipboardCopy from "clipboard-copy";
import { Container } from "react-bootstrap";
import showcaseImage from "@/app/img/showcase.svg";
import Image from "next/image";

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
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
        <div className="container">
          <a href="" className="navbar-brand">
            Strong Password Generator
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  href="https://github.com/nf1973/password-generator"
                  className="nav-link"
                  target="_blank"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Generate a <span className="text-warning">Strong Password</span>
              </h1>
              <p className="lead my-4">
                Click the button to generate a 20 character long strong
                password, then copy to your clipboard!
              </p>

              <button
                className={`btn ${
                  password ? "btn-secondary text-gray" : "btn-primary"
                } btn-lg my-3 me-3`}
                data-bs-toggle="modal"
                data-bs-target="#enrol"
                onClick={getPasswordCallback}
              >
                Generate Password
              </button>

              <button
                className={`btn ${
                  !password ? "btn-secondary text-gray" : "btn-primary"
                } btn-lg my-3 me-3`}
                data-bs-toggle="modal"
                data-bs-target="#enrol"
                onClick={copyToClipboard}
              >
                Copy to Clipboard
              </button>

              <div className="fs-5 my-4 border border-1 rounded">
                {password ? (
                  <p className="py-4 text-center mb-0 fw-bold">{password}</p>
                ) : (
                  <p className="py-4 mb-0 text-dark">&nbsp;</p>
                )}
              </div>
            </div>
            <Image
              className="img img-fluid d-none d-sm-block w-30 "
              src={showcaseImage}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="text-center">
        <div className="container">
          <p className="m-4 p-6 text-center">
            Created by Neil with <span className="text-danger">❤</span> with{" "}
            <a href="https://getbootstrap.com/" target="_blank">
              Bootstrap
            </a>
            <span> </span>
            in{" "}
            <a href="https://nextjs.org/" target="_blank">
              Next.js
            </a>
            <span> </span> and{" "}
            <a href="https://python.org/" target="_blank">
              Python
            </a>
            <span> </span>
          </p>
        </div>
      </section>
    </div>
  );
}
