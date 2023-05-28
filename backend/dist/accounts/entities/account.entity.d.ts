import { EventRegister } from 'src/event_register/entities/event_register.entity';
import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Qr } from 'src/qr/entities/qr.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
export declare class Account {
    id: number;
    username: string;
    email: string;
    address: string;
    phone_number: string;
    sex: string;
    password: string;
    role: number;
    posts: Post[];
    quizzes: Quiz[];
    images: Image[];
    qr: Qr;
    events: EventRegister[];
    createAt: Date;
    updateAt: Date;
}
