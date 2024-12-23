import { useEffect, useState } from "react";

const CountDown = () => {
  const [time, setTime] = useState(60 * 2);
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    let intervalId: number;
    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalId);
            return 0;
          }

          return prevTime - 1;
        });
      }, 100);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  return (
    <div>
      <p>{`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`}</p>
      <button onClick={handleButtonClick} disabled={time === 0}>
        {time === 0 ? "Odliczanie zakonczone" : isActive ? "STOP" : "START"}
      </button>
    </div>
  );
};

export default CountDown;
