import { useState } from "react";
import { saveArticle } from "../utils/localStorage.ts";
import { useNavigate } from "react-router";

const ArticleForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveArticle(formState);
    setFormState({
      title: "",
      content: "",
    });

    navigate("/blog");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-5 mt-10 w-72" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="title">Tytuł</label>
        <input
          id="title"
          type="text"
          className="input"
          value={formState.title}
          name="title"
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="content">Treść</label>
        <textarea
          id="content"
          className="textarea"
          value={formState.content}
          name="content"
          onChange={handleInputChange}
        />
      </div>

      <button className="btn-primary" type="submit">
        Dodaj
      </button>
    </form>
  );
};

export default ArticleForm;
