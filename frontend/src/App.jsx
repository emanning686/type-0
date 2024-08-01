import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import Alert from "./components/Alert";

function App() {
  const [pin, setPin] = useState("");
  const [alerts, setAlerts] = useState([]);

  function handleKeyPress(e) {
    var key = e.target.value.replace(/\s/g, "");
    if (key.length > 0) {
      if (isNaN(key)) {
        key = pin;
      }
    } else {
      key = "";
    }
    if (key.toString().length < 5) {
      setPin(key);
    }
  }

  async function handleEnter() {
    let currPin = pin;
    setPin("");
    if (currPin.length === 4) {
      let response = await axios.post(`/api/${currPin}`);
      setAlerts([
        ...alerts,
        <Alert
          key={currPin + response.quantity}
          quantity={response.quantity}
          pin={currPin}
          setAlerts={setAlerts}
        />,
      ]);
    }
  }

  return (
    <div className="h-screen bg-[#c7cfcc]">
      <div className="absolute right-0 top-0 z-10 m-2 flex w-3/4 flex-col space-y-2 md:w-1/3">
        {alerts.map((alert) => alert)}
      </div>
      <Spline
        className="absolute left-0 top-0"
        scene="https://prod.spline.design/bTxG5kFiDkSHaUhp/scene.splinecode"
      />
      <div className="flex h-1/2 cursor-none flex-col items-center justify-center">
        <h1 className="relative text-center font-inter text-4xl font-semibold text-[#394a50] text-[3c5e8b] md:text-7xl">
          password:
        </h1>
        <div className="z-0 mt-7 md:mt-14">
          <div className="card relative cursor-none">
            <input
              className="input-box h-[52px] w-32 rounded-md bg-[#ebede9] p-4 text-center font-inter text-4xl font-semibold text-[#394a50] text-[3c5e8b] md:h-[104px] md:w-64 md:rounded-2xl md:text-7xl"
              autoFocus={true}
              onBlur={({ target }) => target.focus()}
              onChange={handleKeyPress}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEnter();
              }}
              value={pin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
