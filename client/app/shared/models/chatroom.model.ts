import { ChatMessage } from './chatmessage.model';

export interface Room  {
    users: string[];
    messages: ChatMessage[];
  }
