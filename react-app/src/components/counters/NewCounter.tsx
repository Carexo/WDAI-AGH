import { useState } from "react";

const NewCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <IncrementButton onClick={increment} />
    </div>
  );
};

const IncrementButton = ({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>Increase</button>;
};

export default NewCounter;
