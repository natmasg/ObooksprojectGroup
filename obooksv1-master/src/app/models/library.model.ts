export class Library {
    library_id: number;
    name: string;
    color: string;
    icon: string;
    books: any[];

    constructor(lLibrary_id: number, lName: string, lColor: string, lBooks: any[], lIcon: string) { 
        this.library_id = lLibrary_id;
        this.name = lName;
        this.color = lColor;
        this.icon = lIcon;
        this.books = lBooks;
    }
}
