import * as mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    receiver: {type: String, trim: true, 'default':''},							// 받은 사람
    sender: {type: String, trim: true, 'default':''},							// 보낸 사람
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    read_at: {type: Date, index: {unique: false}, 'default': ''},
    code: {type: String, trim: true, 'default':''},  // code 1 은 보낸 사람 발신함 code 2 는 받는 사람 수신함 
    title: {type: String, trim: true, 'default':''},		// 글 제목
    contents: {type: String, trim:true, 'default':''},						// 글 내용
    matchid: {type: String, trim:true, 'default':''},// 해당 글 id 값
    info:{type: String, trim:true, 'default':''} // 정보 전달용
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
