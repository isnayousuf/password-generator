import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import "./style.css";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
  });

  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const allNumbers = "0123456789";
  const allSymbols = "~!@#$%^&*";

  const generatePassword = () => {
    let allChars = "";
    if (options.lowercase) allChars += lowerChars;
    if (options.uppercase) allChars += upperChars;
    if (options.numbers) allChars += allNumbers;
    if (options.symbols) allChars += allSymbols;

    if (allChars === "") return;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += allChars.charAt(
        Math.floor(Math.random() * allChars.length)
      );
    }

    setPassword(newPassword);
    setCopied(false);
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <div className="inputBox">
        <input type="text" value={password} readOnly className="passBox" />
        <span onClick={copyToClipboard} className="copy-icon" title="Copy">
          {copied ? <Check color="green" /> : <Copy />}
        </span>
      </div>

      <div className="row-length">
        <p>Password Length</p>
        <input
          type="range"
          min="4"
          max="30"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <span>{length}</span>
      </div>

      <div className="more-info">
        {Object.keys(options).map((key) => (
          <div className="row" key={key}>
            <label htmlFor={key}>
              Include {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="checkbox"
              id={key}
              checked={options[key]}
              onChange={() =>
                setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            />
          </div>
        ))}
      </div>

      <button className="genBtn" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
