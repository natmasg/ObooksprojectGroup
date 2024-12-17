import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DBHelperService } from '../services/dbhelper.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  allCategories: string[] = [];
  allBooks;
  booksSearch:Book[]=[];
  filtro="inicial";

  constructor(private router: Router,public dbHelper:DBHelperService,private route: ActivatedRoute) {
    this.filtro="inicial"
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if(this.router.getCurrentNavigation().extras.state.parametros=="tab1"){
          this.router.navigateByUrl('tabs/tab1');
        }
      }

    });
    //this.dbHelper = new DBHelperService;
    //this.allCategories = ['economia', 'politica', 'novela', 'novela corta']; // get categories from DB
    /*
    var book1 = new Book(1, 'si', 'https://static-cse.canva.com/blob/424162/1024w-qIvQK6RTXxg.jpg', 'si',['Romance'] );
    var book2 = new Book(2, 'si', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sci-fi-book-cover-template-a1ec26573b7a71617c38ffc6e356eef9_screen.jpg?ts=1561547637', 'si',['Acción'] );
    var book3 = new Book(3, 'si', 'https://edit.org/img/blog/wdn-editar-portadas-de-libros-gratis.jpg', 'si',['Fantasía'] );
    this.allBooks = [book1, book2, book3]; // get books from DB
    */

    //this.allBooks = this.dbHelper.allBooks;

  }
  async ngOnInit() {
    //await this.dbHelper.cargarLibros();
    this.allBooks= await this.dbHelper.allBooks;

    //console.log(this.allBooks,"sdfdsfdsfsdf")
    var bookDetail=window.location.search.split("?id=")[1];
    if(bookDetail!=undefined){
      var bookToDetail;
      for(const bookAux of this.allBooks){
        if(bookDetail==bookAux.id){
          bookToDetail=bookAux;
        }
      }
      this.bookDetail(bookToDetail)
    }
  }

  bookDetail(book) {
    let navigationExtras: NavigationExtras = {
      state: {
        parametros: book,
        //library: null
      }
    };
    this.router.navigate(['book-detail'], navigationExtras);
  }
  search(){
    this.booksSearch=[];
    var value=(<HTMLInputElement>document.getElementById("search")).value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    //console.log(value)
    if(this.filtro=="inicial"){
      document.getElementById("titulo").click();
    }else if(value==""){
      for(const book of this.allBooks){
        var bookAux=new Book(book.id,book.title,book.img,book.author,book.tags,book.url_book,book.year,book.language);
        this.booksSearch.push(bookAux)
      }
    }else if(value!=""){
      for(const book of this.allBooks){
        switch(this.filtro){
          case "title":
            if(book.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
        var bookAux=new Book(book.id,book.title,book.img,book.author,book.tags,book.url_book,book.year,book.language);
              this.booksSearch.push(bookAux)
            }
            break;
          case "author":
            if(book.author.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
        var bookAux=new Book(book.id,book.title,book.img,book.author,book.tags,book.url_book,book.year,book.language);
              this.booksSearch.push(bookAux)
            }
            break;
          case "tags":
            if(book.tags.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
        var bookAux=new Book(book.id,book.title,book.img,book.author,book.tags,book.url_book,book.year,book.language);
              this.booksSearch.push(bookAux)
            }
            break;
          case "language":
            if(book.language.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
        var bookAux=new Book(book.id,book.title,book.img,book.author,book.tags,book.url_book,book.year,book.language);
              this.booksSearch.push(bookAux)
            }
            break;
        }
      }
    }
    console.log(this.booksSearch)
  }

  openSegment(){
      document.getElementById('principalFullPage').style.display="block";
      document.getElementById("pantallaBuscar").style.display="block";
      document.getElementById("listadoInicial").style.display="none";
      document.getElementById("listadoFiltro").style.display="block";
      //document.getElementById('titulo').click();
  }
  
  closeSegment(){
    document.getElementById('principalFullPage').style.display="none";
    document.getElementById("pantallaBuscar").style.display="none";
    document.getElementById("listadoFiltro").style.display="none";
    document.getElementById("listadoInicial").style.display="block";
  }

  changeFilter(filter){
    this.filtro=filter;
    this.search()
  }

  llenarLista(){
    (<HTMLInputElement>document.getElementById("search")).value=""
    this.search();
  }

  viewBookDetail() {
    this.router.navigate(['book-detail']);
  }

}
