import { ChangeEvent, FormEvent, useState } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "login") {
      setLogin(value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Hasła nie są zgodne");
    } else {
      alert(`Zalogowano jako ${login}`);
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      onSubmit={handleSubmit}
    >
      <label>
        Login
        <input name="login" value={login} onChange={handleInputChange} />
      </label>
      <label>
        Password
        <input name="password" value={password} onChange={handleInputChange} />
      </label>

      <label>
        Confirm Password
        <input
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
        />
      </label>
      <input
        type="submit"
        value="Login"
        disabled={!login || !password || !confirmPassword}
      />
    </form>
  );
};

export default Login;
