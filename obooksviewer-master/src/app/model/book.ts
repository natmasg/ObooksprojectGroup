export interface boooks {
    id: number;
    title: string;
    year: number;
    language: string;
    tags: string;
    author: string;
    url_book: string;
    pages: number;
    img: string;
}

export interface RootObject {
    data: boooks[];
}