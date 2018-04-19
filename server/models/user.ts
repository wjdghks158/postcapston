import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, trim: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String,
  age: {type: String, trim: true, 'default':''},		// 나이
    job: {type: String, trim: true, 'default':''},		// 직업
    education: {type: String, trim: true, 'default':''},		// 학력
    majorGroup: {type: String, trim: true, 'default':''}, //계열
    major: {type: String, trim: true, 'default':''},		// 관련학과
    phone: {type: String, trim: true, 'default':''},		// 전화번호
    kakaoid: {type: String, trim: true, 'default':''},		// 카카오톡아이디
    interest: {type: String, trim: true, 'default':''},		// 관심분야
    wantcompany: {type: String, trim: true, 'default':''},		// 원하는 회사
    skill: {type: String, trim: true, 'default':''},		// 취득기술
    location: {type: String, trim: true, 'default':''},		// 거주지역
    introduction: {type: String, trim: true, 'default':''},		// 소갯말
    pages: {type: []},
    preference: [{		// 댓글
      location: {type: String, trim:true, 'default': ''},					// 선호도
      skill: {type: String, trim: true, 'default':''},
      wantcompany: {type: String, trim: true, 'default':''},
      interest: {type: String, trim: true, 'default':''},
      major: {type: String, trim: true, 'default':''},
      job: {type: String, trim: true, 'default':''},
      education: {type: String, trim: true, 'default':''}  
    }]
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;