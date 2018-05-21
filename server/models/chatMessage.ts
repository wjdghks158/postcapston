
 import * as mongoose from 'mongoose';

 const chatMessageSchema = new mongoose.Schema({
     username: String,
     messages: String
 });
 
 const ChatMessageSchema = mongoose.model('ChatRoom', chatMessageSchema);
 
 export default ChatMessageSchema;
 
 
 
 /**export interface ChatMessage {
     userName: string;
     content: string;
   } */
 
 