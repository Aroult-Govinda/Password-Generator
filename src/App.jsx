import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numm, setNumm] = useState(false);
  const [charr, setCharr] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numm) str += "0123456789";
    if (charr) str += "!@#$%^&*_-+=[](){}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numm, charr]);

  const copyPass = useCallback(() => {
    if (passRef.current) {
      passRef.current.select();
      window.navigator.clipboard.writeText(passRef.current.value);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numm, charr, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-slate-600">
      <h1 className="text-slate-900 font-bold uppercase text-3xl text-center my-5 pt-4">
        Password generator
      </h1>
      <div className="flex gap-2 shadow-sm round-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-slate-800 rounded-md text-white"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          className="outline-none bg-green-700 text-white px-3 py-0.5 shrink-0 rounded-md"
          onClick={copyPass}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2 pb-4">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(parseInt(e.target.value, 10));
            }}
          />
          <label className="text-white">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numm}
            id="numberInput"
            onChange={() => {
              setNumm((prev) => !prev);
            }}
          />
          <label className="text-white font-semibold" htmlFor="numberInput">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charr}
            id="characterInput"
            onChange={() => {
              setCharr((prev) => !prev);
            }}
          />
          <label className="text-white font-semibold" htmlFor="characterInput">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
