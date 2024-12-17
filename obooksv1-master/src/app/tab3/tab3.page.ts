import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import Navigation from 'epubjs/types/navigation';
import { DBHelperService } from '../services/dbhelper.service';
import { Book } from '../models/book.model';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

url
user ={
  name :'invitado'
}
books
booksSearch=[];
filtro="inicial";

  constructor(public alertController: AlertController, private router: Router, private dbHelper: DBHelperService,public platform: Platform) {
    
  }

  async ngOnInit(){
    await this.checkUser();
    //console.log("AAAAAAA",this.dbHelper.booksOffline);
  }

  async ionViewDidEnter(){
    await this.checkUser();
    await this.dbHelper.cargarOffline();
    this.books=this.dbHelper.booksOffline;
    this.booksSearch=this.books;
  }

  async checkUser(){
    if(await this.dbHelper.getUserLogged()!==null){
      this.user=await this.dbHelper.getUserLogged();
      document.getElementById('modoInvi').style.display='none'
      document.getElementById('modoPro').style.display='block'
      if(!this.platform.is('hybrid')){
        document.getElementById('modoPro').style.display='none'
        document.getElementById('modoInvi').style.display='block'
      } 
      //console.log('entra en storage');
    }else{
      this.user.name='invitado';
      document.getElementById('modoPro').style.display='none'
      document.getElementById('modoInvi').style.display='block'
      
    }
  }


  async presentAlertHelp(sesion: string) {
    var mensage: string = '';
    var subHeader: string='';
    if (sesion == 'inv') {
      if(this.platform.is('hybrid')){
        subHeader='Libros en local'
        mensage = "Para hacer uso de la función de lectura de libros local de <strong>oBooks</strong> debe disponer de un libro en formato <strong>epub</strong> guardado en <strong>Android/data/io.ionic.starter/files/Downloads</strong>. </br></br> Click en el botón de 'Abrir libro' para seleccionar el archivo y leer.";
      }else{
        subHeader='Libros en local'
        mensage = "Para hacer uso de la función de lectura de libros local de <strong>oBooks</strong> debe disponer de un libro en formato <strong>epub</strong> descargado en su dispositivo. </br></br> Click en el botón de 'Abrir libro' para seleccionar el archivo y leer.";
      }
    } else {
      subHeader='Libros Offline'
      mensage = "Para hacer uso de la función de lectura de libros offline de <strong>oBooks</strong> debe disponer de un libro en formato <strong>epub</strong> descargado en su dispositivo. </br></br> Click en el botón de '+' para seleccionar el archivo y guardarlo en su biblioteca ofline.";
    }

    const alert = await this.alertController.create({
      header: 'Ayuda',
      subHeader: subHeader,
      message: mensage,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    ////console.log('onDidDismiss resolved with role', role);
  }

  abrirlibro() {
    //console.log("boton clicado")
    var libro:HTMLElement = (<HTMLInputElement>document.getElementById("book")) as HTMLElement;
    libro.click()
    //(<HTMLInputElement>document.querySelector("input[name=book]")).onchange=this.navigate();

  }
  library
  navigate(){
    if(this.platform.is('hybrid')){
      let name = (<HTMLInputElement>document.getElementById("book")).files[0].name;
      this.url="file:///storage/emulated/0/Android/data/io.ionic.starter/files/Downloads/"+name;
    }else{
      this.url = (<HTMLInputElement>document.getElementById("book")).files[0];
    }
    //console.log(this.url)
    if(this.url!=undefined){
      let navigationExtras: NavigationExtras = {
        state: {
          parametros: this.url,
          origen:"offline",
        }
      };
    this.router.navigate(['viewer'],navigationExtras);
    }

  }

  search(){
    this.booksSearch=[];
    var value=(<HTMLInputElement>document.getElementById("search")).value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    //console.log(value)
    if(this.filtro=="inicial"){
      document.getElementById("titulo").click();
    }else if(value==""){
      for(const book of this.books){
        var bookAux=new Book(book.id,book.title,book.img,book.author,book.tags,book.url_book,book.year,book.language);
        this.booksSearch.push(book)
      }
    }else if(value!=""){
      for(const book of this.books){
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
  }

  addToOffline(){
    var libro:HTMLElement = (<HTMLInputElement>document.getElementById("bookAddToOffline")) as HTMLElement;
    libro.click()
  }

  addBookToOffline(){
    let name = (<HTMLInputElement>document.getElementById("bookAddToOffline")).files[0].name;
    this.dbHelper.saveBookOffline(new Book(-1,name.split(".epub")[0],"","Desconocido",["Otros"],name,0,"Desconocido"));
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

  }
