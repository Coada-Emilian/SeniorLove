// Purpose: Typescript interface for the messages object.

export interface IMessages {
  id: number;
  message_content: string;
  receiver_id: number;
  sender: {
    id: number;
    name: string;
    picture_url: string;
  };
  sender_id: number;
}
