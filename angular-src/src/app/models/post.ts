import { Comment } from './comment';

export class Post {
    id: String;
    title: String;
    intro: String;
    tags: [String];
    content: String;
    createDate: Date;
    comments: [Comment];
    author: String;
    rating: Number;
}
