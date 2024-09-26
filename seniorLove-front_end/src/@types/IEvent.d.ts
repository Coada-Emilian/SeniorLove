// Purpose: Typescript interface for Event object

import { IHobby } from './IHobby';

export interface IEvent {
  id: number;
  name: string;
  location: string;
  picture_url: string;
  description: string;
  date: string;
  time: string;
  hobbies: IHobby[];
}
