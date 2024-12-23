export interface Student {
  name: string;
  surname: string;
  year: number;
}

export type addStudent = (student: Student) => void;
