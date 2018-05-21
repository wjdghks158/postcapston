
//import {ChatMessage} from './chatMessage'



import * as mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
    username: [],
    messagesCount: {type:Number, 'default': 0},
    newMessagesCount: {type:Number, 'default': 0},
    messages: []
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;


