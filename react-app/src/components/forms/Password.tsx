import { ChangeEvent, useState } from "react";

const Password = () => {
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <input name="password" value={password} onChange={handleInputChange} />
      <input
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleInputChange}
      />
      <div>
        {!password && !confirmPassword
          ? "wprowadz hasło"
          : password !== confirmPassword
            ? "Hasła nie są zgodne"
            : ""}
      </div>
    </div>
  );
};

export default Password;
