export class    Message{
    constructor(
        public receiver: String,
        public sender: String,
        public created_ad: Date,
        public read_ad: Date,
        public code: String,
        public title: String,
        public contents: String,
        public matchid: String,
        public info: String
    ){}
}