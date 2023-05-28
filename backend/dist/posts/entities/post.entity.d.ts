import { Image } from 'src/image/entities/image.entity';
export declare class Post {
    id: number;
    content: string;
    title: string;
    slot: number;
    startDay: string;
    startTime: string;
    account: number;
    images: Image[];
    events: Image[];
    createAt: Date;
    updateAt: Date;
}
