import { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    console.log("Hello world");
  }, []);

  useEffect(() => {
    console.log(`Licznik zwiększy sie do ${count}`);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
