export class Book {
    id: number;
    title: string;
    author: string;
    img: string;
    tags: string[];
    year: number;
    language: string;
    url_book: string;
    pages: number;

    constructor(lBookId: number, lTitle: string, lCover: string, lAuthor: string, lCategories: string[],lurl_book:string,lyear:number,llanguage) { 
        this.id = lBookId;
        this.title = lTitle;
        this.img = lCover;
        this.author = lAuthor;
        this.tags = lCategories;
        this.url_book = lurl_book;
        this.year = lyear;
        this.language = llanguage
    }

    getCover(): string {
        return this.img;
    }

}

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

