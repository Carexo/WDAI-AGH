import { Student } from "./Student.type.ts";
import { useState } from "react";
import AddStudentFrom from "./AddStudentFrom.tsx";

const StudentManager = () => {
  const [students, setStudents] = useState<Student[]>([
    { name: "Jan", surname: "Kowalski", year: 1990 },
    {
      name: "Anna",
      surname: "Nowak",
      year: 1995,
    },
    { name: "Piotr", surname: "Kowalczyk", year: 1993 },
    { name: "Krzysztof", surname: "Wójcik", year: 1992 },
    { name: "Krzysztof", surname: "Wójcik", year: 1992 },
  ]);

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  return (
    <>
      <table>
        <tr>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th>Rocznik</th>
        </tr>
        {students.map((student, index) => {
          return (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.year}</td>
            </tr>
          );
        })}
      </table>
      <AddStudentFrom addStudnet={addStudent} />
    </>
  );
};

export default StudentManager;
