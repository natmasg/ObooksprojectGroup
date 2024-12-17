import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DBHelperService } from '../services/dbhelper.service';

@Component({
  selector: 'app-library-detail',
  templateUrl: './library-detail.page.html',
  styleUrls: ['./library-detail.page.scss'],
})
export class LibraryDetailPage implements OnInit {

library;
libraryBook;
books;
booksSearch;
filtro="inicial";

  constructor(private alertController: AlertController, private router: Router, private route: ActivatedRoute,private dbHelper:DBHelperService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let library = this.router.getCurrentNavigation().extras.state.library;
        this.library = library;
        if (library.name == 'favourites') {
          this.library.name = 'Favoritos';
          document.getElementById('deleteButtton').style.display = "none";
        } else if (library.name == 'reading') {
          this.library.name = 'Leyendo';
          document.getElementById('deleteButtton').style.display = "none";
        } else {
          document.getElementById('deleteButtton').style.display = "block";
        }
        //console.log(this.library.id)

        this.loadBooks();
      }
    });
  }

  async ngOnInit() {
    //this.loadBooks();
  }

  ionViewWillEnter(){
    if(this.library.name==="Leyendo" || this.library.name==='Favoritos'){
      document.getElementById('deleteButtton').style.display = "none";
    }else{
      document.getElementById('deleteButtton').style.display = "block";

    }
  }

  async loadBooks() {
    this.libraryBook= await this.dbHelper.getLibraryBook(this.library.id);
    ////console.log(this.libraryBook.data, "................");


    this.books = this.dbHelper.getBooksById(this.libraryBook).reverse();
    this.booksSearch=this.books;

    ////console.log(this.books, ".....555....");
  }

  search(){
    this.booksSearch=[];
    var value=(<HTMLInputElement>document.getElementById("search")).value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    //console.log(value)
    if(this.filtro=="inicial"){
      document.getElementById("titulo").click();
    }else if(value==""){
      for(const book of this.books){
        this.booksSearch.push(book)
      }
    }else if(value!=""){
      for(const book of this.books){
        switch(this.filtro){
          case "title":
            if(book.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
              this.booksSearch.push(book)
            }
            break;
          case "author":
            if(book.author.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
              this.booksSearch.push(book)
            }
            break;
          case "tags":
            if(book.tags.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
              this.booksSearch.push(book)
            }
            break;
          case "language":
            if(book.language.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(value)){
              this.booksSearch.push(book)
            }
            break;
        }
      }
    }
  }

  openSegment(){
    document.getElementById("pantallaBuscar").style.display="block";
}

closeSegment(){
  document.getElementById("pantallaBuscar").style.display="none";
}

changeFilter(filter){
  this.filtro=filter;
  this.search()
}

llenarLista(){
  (<HTMLInputElement>document.getElementById("search")).value=""
  this.search();
}

async deleteLibrary(){
  const alert = await this.alertController.create({
    header: 'Eliminar Biblioteca',
   
    message: "¿Está segur@ de eliminar esta biblioteca?",
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Eliminar',
        handler:async () => {
          await this.dbHelper.deleteLibrary(this.library);
          
        }
      },
      
    ]
  });
  
  await alert.present();
  
}

}
