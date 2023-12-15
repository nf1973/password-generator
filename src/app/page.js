"use client";

import { useState, useCallback } from "react";
import clipboardCopy from "clipboard-copy";

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
    <div className="container my-5">
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
    </div>

    // <div className="container">
    //   <div className="row">
    //     <div className="col-md-12 text-center">
    //       <h1>Simple Password Generator</h1>
    //       <h2>Generate a Strong Password</h2>
    //       <p className="display-5">{password}</p>
    //       <button
    //         className="btn btn-primary mx-2"
    //         onClick={getPasswordCallback}
    //       >
    //         Generate Password
    //       </button>
    //       {password && (
    //         <button
    //           className="btn btn-secondary mx-2"
    //           onClick={copyToClipboard}
    //         >
    //           Copy to Clipboard
    //         </button>
    //       )}
    //       <p>Created with ❤ in Next.js and Python</p>
    //     </div>
    //   </div>
    // </div>
  );
}
