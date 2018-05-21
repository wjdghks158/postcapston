export class Contest{
    constructor(
        public title: String,
        public host: String,
        public progress: String,
        public contents: String,
        public writer: String,
        public comments: String,
        public startline: Date,
        public deadline: Date,
        public person: String,
        public url: String,
        public url_img: String,
        public field: String,
        public tags: String,
        public hits: Number,
        public contest_id: String,
        public created_at: Date,
        public updated_at: Date,
        
    ){}
}