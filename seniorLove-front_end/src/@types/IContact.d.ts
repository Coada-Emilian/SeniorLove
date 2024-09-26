// Purpose: Typescript interface for the contacts object.

import { IMessages } from './IMessages';

export interface IContact {
  id: number;
  messages: IMessages[];
  name: string;
  picture_url: string;
}
