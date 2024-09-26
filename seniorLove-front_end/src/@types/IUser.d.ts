// Purpose: Interface for User object.

export interface IUser {
  id: number;
  name: string;
  alt: string;
  age: number;
  picture_url: string;
  picture_id: string;
  birth_date: Date;
  gender: string;
  description: string;
  hobbies: IHobby[];
  email: string;
  old_password?: string;
  new_password?: string;
  repeat_new_password?: string;
  events?: IEvent[];
}
