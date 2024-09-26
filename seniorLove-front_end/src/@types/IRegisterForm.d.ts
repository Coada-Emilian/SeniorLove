// Purpose: Interface for the Register Form.

export interface IRegisterForm {
  name: string;
  birth_date: string;
  gender: string;
  hobbies: number[];
  picture: file;
  description: string;
  email: string;
  password: string;
  repeat_password: string;
}
