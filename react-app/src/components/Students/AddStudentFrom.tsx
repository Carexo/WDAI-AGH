import { ChangeEvent, FormEvent, useState } from "react";
import { addStudent, Student } from "./Student.type.ts";

const AddStudentFrom = ({ addStudnet }: { addStudnet: addStudent }) => {
  const [studentInfo, setStudentInfo] = useState<Student>({
    name: "",
    surname: "",
    year: 0,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setStudentInfo((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentInfo.name || !studentInfo.surname || !studentInfo.year) {
      alert("Wszystkie pola muszą być wypełnione");
      return;
    }

    addStudnet(studentInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label>
        Imię:
        <input
          name="name"
          value={studentInfo.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Nazwisko:
        <input
          name="surname"
          value={studentInfo.surname}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Rocznik:
        <input
          name="year"
          type="number"
          value={studentInfo.year}
          onChange={handleInputChange}
        />
      </label>

      <input type="submit" value="Dodaj studenta" />
    </form>
  );
};

export default AddStudentFrom;
