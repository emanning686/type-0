import React, { useState, useEffect } from "react";
import { HiMiniKey, HiExclamationTriangle, HiMiniXMark } from "react-icons/hi2";

function getOrdinal(n) {
  let ord = "th";

  if (n % 10 == 1 && n % 100 != 11) {
    ord = "st";
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = "nd";
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = "rd";
  }

  return ord;
}

const Alert = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => handleDelete(), 5000);
  }, []);

  let quantity = props.quantity;
  let pin = props.pin;
  let setAlerts = props.setAlerts;

  function handleDelete() {
    setShow(false);
    setTimeout(() => {
      setAlerts((prevAlerts) =>
        prevAlerts.filter(
          (alert) =>
            !(
              alert.props.pin === props.pin &&
              alert.props.quantity === props.quantity
            ),
        ),
      );
    }, 200);
  }
  return (
    <div
      className={
        show
          ? quantity > 1
            ? "right-0 flex animate-slideIn space-x-5 rounded-md bg-[#e8c170] p-2 opacity-65"
            : "right-0 flex animate-slideIn space-x-5 rounded-md bg-[#d0da91] p-2 opacity-65"
          : quantity > 1
            ? "right-0 flex animate-fadeOut space-x-5 rounded-md bg-[#e8c170] p-2 opacity-0"
            : "right-0 flex animate-fadeOut space-x-5 rounded-md bg-[#d0da91] p-2 opacity-0"
      }
    >
      <div className="stretch-0 text-xl md:text-4xl">
        {quantity > 1 ? (
          <HiExclamationTriangle className="text-[#de9e41]" />
        ) : (
          <HiMiniKey className="text-[#a8ca58]" />
        )}
      </div>
      <div className="flex-1 space-y-2 py-2">
        <h1
          className={
            quantity > 1
              ? "text-lg font-semibold text-[#602c2c] md:text-3xl"
              : "text-lg font-semibold text-[#25562e] md:text-3xl"
          }
        >
          {quantity > 1 ? "Oops!" : "Good Find!"}
        </h1>
        <h1
          className={
            quantity > 1
              ? "text-base font-medium text-[#884b2b] md:text-xl"
              : "text-base font-medium text-[#468232] md:text-xl"
          }
        >
          {quantity > 1
            ? `You're the ${quantity}${getOrdinal(quantity)} to enter the pin ${pin}`
            : `You're the 1st to enter the pin ${pin}`}
        </h1>
      </div>
      <div className="stretch-0 text-xl md:text-4xl">
        {quantity > 1 ? (
          <HiMiniXMark className="m-1 text-[#602c2c]" onClick={handleDelete} />
        ) : (
          <HiMiniXMark className="m-1 text-[#25562e]" onClick={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Alert;
