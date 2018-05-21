export class Match{
    constructor(
        public title: String,
        public contents: String,
        public writer: String,
        public comments: [{
            contents: String,
            writer: String,
            created_at: Date
        }],
        public field: String,
        public tags: String,
        public hits: Number,
        public contest_id: String,
        public matchstate: Boolean,
        public matchuser: String,
        public education: String,
        public major: String,
        public created_at: Date,
        public updated_at: Date,
        
    ){}
}