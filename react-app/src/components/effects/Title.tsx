import { useEffect, useState } from "react";

const Title = () => {
  const [title, setTitle] = useState("Title");

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <label>
      Title:
      <input onChange={handleInputChange} value={title} />
    </label>
  );
};

export default Title;
