import * as mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    title: {type: String, trim: true, 'default':''},		// 글 제목
    contents: {type: String, trim:true, 'default':''},						// 글 내용
    writer: {type: String, trim: true, 'default':''},							// 글쓴 사람
    comments: [{		// 댓글
        contents: {type: String, trim:true, 'default': ''},					// 댓글 내용
        writer: {type: String, trim: true, 'default':''},
        created_at: {type: Date, 'default': Date.now}
    }],
    field : {type: [], 'default': ''}, //분야
    tags: {type: [], 'default': ''}, // tag 이름
    hits: {type:Number, 'default': 0},		// 조회수
    contest_id: {type: String, trim: true, 'default':''}, //선택한 contestid
    matchstate: {type: Boolean, trim: true, 'default':false},	
    matchuser: {type: String, trim: true, 'default':''},
    education: {type: String, trim: true, 'default':''},		// 학력
    major: {type: String, trim: true, 'default':''},		// 관련학과
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}

});



const Match = mongoose.model('match', matchSchema);

export default Match;
