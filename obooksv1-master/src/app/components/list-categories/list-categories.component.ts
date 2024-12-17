import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Book, boooks, RootObject } from 'src/app/models/book.model';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent implements OnInit {

  dbHelper: DBHelperService;
  allCategories: string[]=[];
  allBooks: any[];
  catPolitica: boooks[] = [];
  currentBooks: any[] = [];

  booksInCategories: any[] = [];
  lengthBooks: number;

  constructor(private data: DBHelperService, private router: Router) {
    this.dbHelper=data;
    this.fillAllCAtegories();
    this.fillBooksInCategories();
  }
   
  async cogerlibros(){
    await this.data.cargarStorage()
    this.allBooks = await this.data.allBooks;
    return this.allBooks
  }

  async fillAllCAtegories() {
    await this.cogerlibros();
    if(this.allBooks!=undefined){
      for (let i = 0; i < this.allBooks.length; i++) {
        ////console.log('cat: ', this.allCategories[i]);
  
        let cats = this.allBooks[i].tags.split(', ');
  
        for (let i = 0; i < cats.length; i++) {
          let itsIn = false;
  
          for (let j = 0; j < this.allCategories.length; j++) {
            if (cats[i] == this.allCategories[j]) {
              itsIn = true;
            }
          }
  
          if (!itsIn) {
            this.allCategories.push(cats[i]);
          }
        }
      }
    }

    ////console.log('ats in fill cats: ', this.allCategories);

  }
  
  async fillBooksInCategories() {
    ////console.log('fillBooksInCategories');
    await this.cogerlibros();
    ////console.log('books in fillBooksInCategories: ', this.allBooks);

      for (let i = 0; i < this.allCategories.length; i++) {
        this.setBooksFromCategory(this.allCategories[i]);
      }
      ////console.log('Books In Cat: ', this.booksInCategories);
  }
  
  async setBooksFromCategory(cat: string) {
    ////console.log('setBooksFromCategory');
    await this.cogerlibros();

    let booksList: any= [] = [];
    for (let i  = 0; i < this.allBooks.length; i++) {
      var catbook= this.allBooks[i].tags.split(', ')
      for (let j = 0; j < catbook.length; j++) {
        if (catbook[j] == cat) {
          booksList.push(this.allBooks[i]);
        }
      }
    }

    ////console.log('books list: ', booksList);

    this.currentBooks = booksList;
    ////console.log("current Books",this.currentBooks)
      let currentCategory: any[] = [cat, this.currentBooks];
      this.booksInCategories.push(currentCategory);

  }


  bookDetail(book: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        parametros: book,
      }
    };
    this.router.navigate(['book-detail'], navigationExtras);
  }

  ngOnInit() {}

}
