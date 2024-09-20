import { useState, useCallback, useRef } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, setPassword, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const Lengthset = (e) => {
    setLength(e.target.value);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="input-container">
        <input type="text" value={password} readOnly ref={passwordRef} />
        <button className="copy-button" onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>
      <div className="range-container">
        <label>Length: {length}</label>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={Lengthset}
        />
      </div>
      <div className="checkbox-container">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label htmlFor="numberInput">Include Numbers</label>
      </div>
      <div className="checkbox-container">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="characterInput">Include Special Characters</label>
      </div>
    </div>
  );
}

export default App;
