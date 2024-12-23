import { ChangeEvent, useState } from "react";

const Form = () => {
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} value={text} />
      <div style={{ padding: "5px" }}>{text}</div>
    </div>
  );
};

export default Form;
