import * as mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    age: {type: String, trim: true, 'default':''},		// 나이
    job: {type: String, trim: true, 'default':''},		// 직업
    education: {type: String, trim: true, 'default':''},		// 학력
    department: {type: String, trim: true, 'default':''},		// 관련학과
    phone: {type: String, trim: true, 'default':''},		// 전화번호
    kakaoid: {type: String, trim: true, 'default':''},		// 카카오톡아이디
    interest: {type: String, trim: true, 'default':''},		// 관심분야
    wantcompany: {type: String, trim: true, 'default':''},		// 원하는 회사
    skill: {type: String, trim: true, 'default':''},		// 취득기술
    location: {type: String, trim: true, 'default':''},		// 거주지역
    introduction: {type: String, trim: true, 'default':''},		// 소갯말
    userid: {type: String, trim: true, 'default':''},		// 연결된id
    
});


const Profile = mongoose.model('profile', profileSchema);

export default Profile;
