export class User{
    constructor(
        public username: String,
        public email: String,
        public password: String,
        public age: String,
        public job: String,
        public education: String,
        public majorGroup: String,
        public major: String,
        public phone: String,
        public kakaoid: String,
        public interest: String,
        public wantcompany: String,
        public skill: String,
        public location: String,
        public introduction: String,
        public pages,
        public preference: [{
            location: Number,
            skill: Number,
            wantcomany: Number,
            interest: Number,
            major: Number,
            job: Number,
            education: Number
        }]
        
    ){}
}