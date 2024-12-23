import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(Number(localStorage.getItem("counter")));

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    localStorage.setItem("counter", String(count));
  }, [count]);

  return (
    <div className="flex flex-col justify-center items-center h-full gap-5">
      <p className="font-bold text-xl">{count}</p>
      <button className="btn-primary" onClick={increment}>
        Increment
      </button>
    </div>
  );
};

export default Counter;
