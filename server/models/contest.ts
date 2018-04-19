import * as mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
    title: {type: String, trim: true, 'default':''},		// 글 제목
    host: {type: String, trim: true, 'default':''},		// 주최기관
    progress: {type: String, trim: true, 'default':''},		// 진행상황
    hits: {type:Number, 'default': 0},		// 조회수
    contents: {type: String, trim:true, 'default':''},						// 글 내용
    writer: {type: String, trim: true, 'default':''},							// 글쓴 사람
    comments: [{		// 댓글
        contents: {type: String, trim:true, 'default': ''},					// 댓글 내용
        writer: {type: String, trim: true, 'default':''},
        created_at: {type: Date, 'default': Date.now}
    }],
    startline: {type: String, trim:true, 'default':''}, //공모전 시작일
    deadline: {type: String, trim:true, 'default':''},  //공모전 마감일
    person: {type: String, trim:true, 'default':''},  // 참여 인원
    field : {type: String, 'default': ''}, //분야
    tags: {type: String, 'default': ''}, // tag 이름
    url : {type: String, 'default': ''}, //사이트 url
    url_img: {type: String, 'default': ''}, // 그림 url
    
    created_at: {type: Date, index: {unique: false}, 'default': Date.now}, // 글 생성 시간
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}  // 글 수정 시간
});



const Contest = mongoose.model('contest', contestSchema);

export default Contest;
