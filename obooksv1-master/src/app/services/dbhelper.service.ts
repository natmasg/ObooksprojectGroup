
import { HttpClient } from '@angular/common/http';
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Injectable, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { iif } from 'rxjs';
import {  Book, boooks, RootObject } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class DBHelperService{
  userlog
  user={};
  allBooks;
  count;
  libraries;
  booksOffline=[];
  prov
  oscuro = false

  constructor(public platform: Platform,private http : HttpClient,public alertController: AlertController,private router: Router,private storage:Storage) {
    this.storage.create();
    

   }


   async saveBookOffline(book){
     await this.cargarOffline();
     var add=true;
     for(const b of this.booksOffline){
       if(b.id==book.id){
         add=false;
       }
     }
     if(add){
       this.booksOffline.push(book);
     }
     ////console.log("AAAAAAAA",book)
     this.storage.set('offline',this.booksOffline);
     ////console.log(this.booksOffline);
   }

   async cargarLibros(){
    var temp  = await this.storage.get('libros')
    
    if(temp!=null){
      this.allBooks = temp.data
      console.log(this.allBooks)
    }
    
   }

   async cargarOffline(){
     this.booksOffline= await this.storage.get('offline');
     ////console.log(this.booksOffline);
     if(this.booksOffline==null){
       this.booksOffline=[];
     }
   }

   async cargarStorage(){

     this.user=await this.storage.get('user');
     await this.getJson()
     if(this.user==null){
       this.user=[]
     }
   }

   guardarUsuario(user){
    this.cargarStorage();
    this.storage.set('user',user);
  }
  async cerrarSesion(){
    this.storage.remove('user');
    this.storage.remove('libraries');
    var tema = await this.storage.get('tema');
    if(tema===true){
      document.body.classList.toggle('dark');
    }
    this.storage.remove('tema');
    this.storage.remove('temaViewer');
   
    this.router.navigateByUrl('login',{
      replaceUrl : true
     });
  }

  async getJson(){
    const respuesta = await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/bookshowall/");
    this.storage.set('libros',respuesta.json()||[])
    //return respuesta.json() || [];
  }

  getBooks(){
    return this.http.get<RootObject>("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/bookshowall/");
    
  }

  setBooks(libros){
    console.log(libros)
    this.storage.set('libros',libros)
  }

  setUser(user){
    this.guardarUsuario(user)
    this.userlog = user
  }
  getUser(){
    ////console.log(this.userlog+"a")
    return this.userlog
  }


  async getUserLogged(){
    return await this.storage.get('user');
  }
  async checkUser(nick,password){

  var user = {
  "user_nick":nick,
  "pass":password,
  }

const url = "http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/userauthorizeuser?user_nick="+user.user_nick+"&password="+user.pass;
    const check = await (await fetch(url, {
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
    })).json()
   

    return check

  }

  async register(user){

    await fetch('http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/useradd?user_nick='+user.user_nick+'&name='+user.name+'&email='+user.email+'&password='+user.password, {
    "method": "POST",
    "headers": {},
    })
    .then(response => {
    //console.log(response);
    this.setUser(user);
  })
  .catch(err => {
    console.error(err);
  });
    
  }

  async alertInvitado(){
    
      const alert = await this.alertController.create({
        header: 'Estás en modo invitado',
       
        message: "Para hacer uso de esta función de <strong>oBooks</strong> debe iniciar sesión en su cuenta o bien, registrarse gratuitamente.",
        buttons: [
          {
            text: 'Más tarde',
            role: 'cancel',
          },
          {
            text: 'Usar una cuenta',
            handler: () => {
              this.router.navigateByUrl('login',{
                replaceUrl : true
               });
            }
          },
          
        ]
      });
  
      await alert.present();
    
  }
  /*
  alterLibrary(field: string, value: string, library) {
    let id = library.id;


  }*/

  deleteLibraryBook(Library,idBook){
    //console.log(idBook)
    fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/librarybookbookdel?library_id="+Library.id+"&book_id="+idBook, {
      "method": "DELETE",
      "headers": {}
    })
    .then(response => {
      //console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
    
  }

  deleteLibrary(library) {
    let id = library.id;

    fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/librarydel/"+id, {
      "method": "DELETE",
      "headers": {}
    })
    .then(response => {
      let ras: NavigationExtras = {
        state: {
          parametros: "tab1",
        }
      };
      this.router.navigate(['tabs/tab2'],ras);
    })
    .catch(err => {
      console.error(err);
    });

    
    
  }

  createLibrary(library, book){
    //console.log(library.color)
//http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/libraryadd?name=" + library.title + "&user_id=" + library.userId + "&color=" + library.color + "&iconName=" + library.icon
    fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/libraryadd?name=" + library.title + "&user_id=" + library.userId + "&color=" + library.color + "&iconName=" + library.icon, {
      "method": "POST",
      "headers": {}
    })
    .then(response => {
      //console.log(response);

      this.saveBookToNewLib(book);
    })
    .catch(err => {
      console.error(err);
    });
  }

  async saveBookToNewLib(book) {
    if (book != undefined && book != null) {
      let libs = await this.getLibraries(this.user);
      let libraries = libs.data.reverse();
      
      //console.log('ultima lib ', libraries[0]);
      this.createLibraryBook(book.id, libraries[0].id, 0);
    }
  }

  async createLibraryBook(idBook,idLibrary,reading_page){
    let lib = await this.getLibraryBook(idLibrary);
    var cont: number = 0;
    ////console.log(lib, 'EEEEEEEEEEEEEEEEEEEEEEEE');

    for (let i = 0; i < lib.data.length; i++) {
      if (lib.data[i].book_id == idBook) {
        cont++;
      }
    }

    if (cont == 0) {
        fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/librarybookadd?book_id="+idBook+"&library_id="+idLibrary+"&reading_page="+reading_page, {
        "method": "POST",
        "headers": {}
      })
      .then(response => {
        //console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  async getLibraries(user) {
    if(user!=null){
      var userId=user.id
      const respuesta = await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/libraryshowall/"+userId);
      return respuesta.json() || [];
    }
    return [];
   
}

guardarLibrary(libraries){
  this.storage.set('libraries',libraries)
}

async getLibraryBook(id){
  const respuesta = await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/librarybookshow/"+id);
   
  return respuesta.json() || [];
}

  async changePassword(peticion){
      ////console.log(peticion)

      fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/userupdate?id="+peticion.id+"&password="+peticion.password, {
        "method": "PATCH",
        "headers": {}
      })
      .then(response => {
        ////console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  }

  async changeEmail(peticion){
    ////console.log(peticion)

    fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/userupdate?id="+peticion.id+"&email="+peticion.email, {
      "method": "PATCH",
      "headers": {}
    })
    .then(response => {
      ////console.log(response);
    })
    .catch(err => {
      console.error(err);
    });


  }
  async changename(peticion){

    fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/userupdate?id="+peticion.id+"&name="+peticion.name, {
      "method": "PATCH",
      "headers": {}
    }).then(response => {
      ////console.log(response);
    }).catch(err => {
      console.error(err);
    });

  }
  async checkusernick(user_nick){

    const respuesta = await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/usercheck?user_nick="+user_nick);
    ////console.log(respuesta)
    return respuesta

  }
  async changeUserNick(peticion){
    ////console.log(peticion)

    fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/userupdate?id="+peticion.id+"&user_nick="+peticion.user_nick, {
      "method": "PATCH",
      "headers": {}
    })
    .then(response => {
      ////console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  }
  async deleteAccount(user){
    var id = user.id
    fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/userdel/"+id, {
  "method": "DELETE",
  "headers": {}
})
.then(response => {
  ////console.log(response);
})
.catch(err => {
  console.error(err);
});
    this.cerrarSesion()
  }
async getHelp(){
  const respuesta = await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/helpshowall");
  let temp = respuesta.json()
  return temp;
}

  getBooksById(lib) {
    let books: Book[] = [];

    ////console.log(lib, "lib")
    //console.log(lib)
    for (let i = 0; i < lib.data.length; i++) {
      ////console.log(i)
      let b = lib.data[i].book_id;
      
      for (let j = 0; j < this.allBooks.length; j++) {
        ////console.log(j)
        ////console.log(this.allBooks[j], "book j")
        if (b == this.allBooks[j].id) {
          let book: Book = new Book(this.allBooks[j].id, this.allBooks[j].title, this.allBooks[j].img, this.allBooks[j].author, this.allBooks[j].tags,this.allBooks[j].url_book,this.allBooks[j].year,this.allBooks[j].language );
          books.push(book);
        }
      }
    }
    ////console.log(books, "books in dbh")
    return books;
  }

 async  getMarkers(user){
   
  const respuesta = await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/markershowall/"+user.id);
  let temp = respuesta.json()
  return temp;
  }

  async addMarker(peticion){
    await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/markeradd?user_id="+peticion.user_id+"&book_id="+peticion.book_id+"&page="+peticion.page, {
      "method": "POST",
      "headers": {}
    })
    .then(response => {
      ////console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
    
    }
    librarybook
    temp
    async savePage(peticion){
      /*//console.log(this.libraryprov, " prov en savePage")
      //console.log(this.librarybook, " librarybook  en save page")*/
      for(var i =0; i<this.librarybook.length;i++){
         for(let j = 0; j<this.libraryprov[i].length;j++){
          /*//console.log("yi",this.libraryprov[i][j].id)
          //console.log("yo",this.libraryprov[i][j].book_id)
          //console.log("yu",peticion.book_id)**/

        if(this.libraryprov[i][j].book_id===peticion.book_id){
          ////console.log("lo hagooooooo",this.libraryprov[i][j].id)
          await fetch("http://sergi-diaz-7e2.alwaysdata.net/obooksback/index.php/api/librarybookupdatepage?id="+this.libraryprov[i][j].id+"&book_id="+peticion.book_id+"&library_id="+this.librarybook[i].id+"&reading_page="+peticion.reading_page, {
            "method": "PATCH",
            "headers": {}
          }).then(response => {
             ////console.log(response);
         }).catch(err => {
            console.error(err);
          });
        }
      }
    }
    }
 libraryprov=[]
 pagggg
  async getPage(peticion){
    this.libraryprov=[]
    ////console.log("holi")
    var count=0
      this.temp = await this.getLibraries(peticion);
      this.librarybook = this.temp.data
      ////console.log(this.librarybook," vacio get Page");
      for (let index = 0; index < this.librarybook.length; index++) {
        const element = this.librarybook[index].id;
        this.prov = await this.getLibraryBook(element);
        ////console.log(this.prov.data)
        this.libraryprov.push(this.prov.data)
        ////console.log(this.libraryprov," dentro del bucle del  get  page")
        for (let j = 0; j < this.prov.data.length; j++) {
        const element = this.prov.data[j];
        ////console.log(element)
        
        if(element.book_id===peticion.book_id && count === 0  && element.reading_page!=="0"){
          count=1
          this.pagggg=element.reading_page
          ////console.log(element.reading_page)
          
        }
      }
  }
  return this.pagggg
}
  setTema(opcion){
    this.storage.set('tema',opcion)

  }
  async getTema(){
    this.oscuro= await this.storage.get('tema');
    return this.oscuro
  }
  guardarEstiloViewer(estilos){
    //console.log((estilos))
    this.storage.set('temaViewer',estilos)
  }
  async getStyleViewer(){
    var estilos= await this.storage.get('temaViewer');
    return estilos
  }
}