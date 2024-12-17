import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})

export class BooksComponent implements OnInit {

  //@Input() size: string; 
  //@Input() category: string;
  


  allBooks;

  list = [];

  constructor(private dbHelper: DBHelperService, private router: Router) {
    //var book1: Book = new Book(1, 'si', 'https://static-cse.canva.com/blob/424162/1024w-qIvQK6RTXxg.jpg', 'si',['politica'] );
    //var book5: Book = new Book(1, 'si7', 'https://static-cse.canva.com/blob/424162/1024w-qIvQK6RTXxg.jpg', 'si',['economia'] );
    //var book2: Book = new Book(2, 'si', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sci-fi-book-cover-template-a1ec26573b7a71617c38ffc6e356eef9_screen.jpg?ts=1561547637', 'si',['novela'] );
    //var book3: Book = new Book(3, 'si', 'https://edit.org/img/blog/wdn-editar-portadas-de-libros-gratis.jpg', 'si',['novela corta'] );
    //this.allBooks = [book1, book2, book3, book5]; // get books from DB

    /*//console.log("category: !" + this.category);
    //console.log("size: !" + this.size);*/


    /*for(let i = 0; i < this.allBooks.length; i++) {
      let b = this.allBooks[i];
      //console.log("book " + b.bookId);

      for(let j = 0; j < b.categories.length; j++) {
        //console.log("added to " + this.category + "?");

        if (this.category == b.categories[j]) {
          this.list.push(b);
          //console.log("added");
        }
      }
    }*/

  }

  /*
  setCategory(c: any) {
    this.category = c;
  }*/

  openBook(b){
    let navigationExtras: NavigationExtras = {
      state: {
        parametros: b,
        library: null
      }
    };
    this.router.navigate(['book-detail'], navigationExtras);
  }

  ngOnInit() {}

}
