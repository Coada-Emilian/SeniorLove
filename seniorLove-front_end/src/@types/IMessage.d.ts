// Purpose: Typescript interface for a message object.

export interface IMessage {
  id: number;
  messages: {
    id: number;
    message_content: string;
    sender_id: number;
    sender: { picture: string };
  }[];
  picture_url: string;
  name: string;
}
