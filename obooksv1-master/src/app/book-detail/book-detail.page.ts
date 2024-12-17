import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DBHelperService } from '../services/dbhelper.service';
import { Book, boooks, RootObject } from '../models/book.model';
import { name } from '../variables/const'
import { AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {

  book: any;
  user = {
    name
  }
  libs;
  library;

  constructor(public alertController: AlertController,private route: ActivatedRoute, private router: Router, private downloader: Downloader, private socialSharing: SocialSharing, public dbHelper: DBHelperService,public toastController: ToastController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.book = this.router.getCurrentNavigation().extras.state.parametros;
        this.library = this.router.getCurrentNavigation().extras.state.library;
      }

      //console.log(this.library, 'liiiiib')
      //console.log(this.book)
      if (this.library != undefined && this.library != null) {
        document.getElementById('deleteFromLib').style.display = "block";
        
        if (this.library.name == 'Leyendo') {
          document.getElementById('libraryDelOp').style.display = "none";
          document.getElementById('readingDelOp').style.display = "block";
        } else if (this.library.name == 'Favoritos') {
          document.getElementById('libraryDelOp').style.display = "none";
          document.getElementById('readingDelOp').style.display = "none";
        } else {
          document.getElementById('libraryDelOp').style.display = "block";
          document.getElementById('readingDelOp').style.display = "none";
        }
      } else {
        document.getElementById('deleteFromLib').style.display = "none";
      }
    });

    this.getLibreries();
  }

  async checkFav(id) {
    let lib: any = this.dbHelper.getLibraryBook(id);

    for (let i = 0; i < lib.length; i++) {
      if (this.book.id == lib[i].id) {
        document.getElementById('favOn').style.display = "block";
        document.getElementById('favOff').style.display = "none";
      } else {
        document.getElementById('favOn').style.display = "none";
        document.getElementById('favOff').style.display = "block";
      }
    }
  }

  async deleteFromLibrary(fav) {
    let lib;

    if (fav == null) {
      lib = this.libs[0];
    } else {
      lib = this.library;
    }

    await this.dbHelper.deleteLibraryBook(lib, this.book.id)
    let navigationExtras: NavigationExtras = {
      state: {
        library: this.library
      },
      replaceUrl : true
    };

    this.router.navigate(['library-detail'], navigationExtras,);
  }

  async ngOnInit() {
    await this.checkUser();
    


  }
  async ionViewDidEnter() {
    await this.checkUser();
  }

  async checkUser() {
    if (await this.dbHelper.getUserLogged() !== null) {
      this.user = await this.dbHelper.getUserLogged();
      //console.log('entra en storage');
    } else {
      this.user = {
        name: name
      }
      //console.log('entra en invi');
    }
  }

  async getLibreries() {
    this.user = await this.dbHelper.getUserLogged();
    var temp = await this.dbHelper.getLibraries(this.user);
    this.libs = temp.data;
    let favs = await this.dbHelper.getLibraryBook(this.libs[0].id);
    //console.log('favvvs', favs.data.length);
    if (favs.data.length == 0 || favs.data.length == undefined) {
      document.getElementById('favOff').style.display="block";
      document.getElementById('favOn').style.display="none";
    } else {
      for (let i = 0; i < favs.data.length; i++) {
        if (this.book.id == favs.data[i].book_id){
          document.getElementById('favOff').style.display="none";
          document.getElementById('favOn').style.display="block";
          i = this.libs[0].length;
        }else{
          document.getElementById('favOff').style.display="block";
          document.getElementById('favOn').style.display="none";
        }
      }
    }
    
    //console.log(this.libs)
    this.dbHelper.guardarLibrary(this.libs)

    this.checkFav(this.libs[0].id);
  }

  async read(book) {
    ////console.log(book, 'ppppppppppppp')

    if (this.user.name !== "invitado") {
      let user = this.dbHelper.getUserLogged();
      var libs = await this.dbHelper.getLibraries(this.user);
      let reading = libs.data[1];
      console.log('reading', libs)

      let cont: number = 0;
      for (let i = 0; i < reading.length; i++) {
        if (reading[i].id == book.id) {
          cont++;
        }
      }

      if (cont == 0) {
        this.addLibary(book.id, this.libs[1].id, 0);
      } else {
        this.dbHelper.deleteLibraryBook(reading, book.id);
        this.addLibary(book.id, this.libs[1].id, 0);
      }
    }

    let navigationExtras: NavigationExtras = {
      state: {
        parametros: book,
      }
    };
    this.router.navigate(['viewer'], navigationExtras);
  }

  share(book) {
    var options = {
      message: 'Ayudanos a aprobar con este libro. :D ' + book.title, // not supported on some apps (Facebook, Instagram)
      subject: book.title, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: window.location.href.split("book-detail")[0]+"tabs/tab2?id="+book.id,
      chooserTitle: 'Elige una aplicación', // Android only, you can override the default share sheet title
      iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };
    this.socialSharing.shareWithOptions(options).then((res) => {
      //console.log('Successful share');
    }).catch(async (e) => {
      if(navigator.share===undefined){
      var alert = await this.alertController.create({
        header: 'Error',
        message:'Tenemos problemas para compartir en este navegador',
        buttons: ['OK']
      });
  
      await alert.present();
  
      var { role } = await alert.onDidDismiss();
    }else{
      //console.log('error');
      navigator.share({
        'title': book.title,
        'text': 'Holi, te comparto este libro <3',
        'url': window.location.href.split("book-detail")[0]+"tabs/tab2?id="+book.id
      }).then(function () {
        //console.log('Successful share');
      }).catch(async function (error) {
      });
    }
    });
  

  }


  download(book) {
    if (this.user.name === 'invitado') {
      this.dbHelper.alertInvitado()
    } else {
      //console.log(book)
      var request: DownloadRequest = {
        uri: book.url_book,
        title: book.title,
        description: 'Descargando',
        mimeType: 'application/epub+zip',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: book.title + '.epub'
        }
      };

      var self = this;
      this.downloader.download(request)
        .then(function (location: string) {
          //console.log('File downloaded at:' + location)
          self.addToOffline(book, location);
        }).catch(function (error: any) {
          var element = document.createElement('a');
          element.setAttribute('href', book.url_book);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });

        this.presentToastDescarga()
    }
  }

  async addToOffline(book, location) {
    let bookAux = new Book(book.id, book.title, book.img, book.author, book.tags, location, book.year, book.language)
    await this.dbHelper.saveBookOffline(bookAux);
  }

  addLibary(idBook, idLibrary, readingPage) {
    if (this.user.name === 'invitado') {
      this.dbHelper.alertInvitado()
    } else {
      this.dbHelper.createLibraryBook(idBook, idLibrary, readingPage);
    }
  }

  async addFav() {
    if (this.user.name === 'invitado') {
      this.dbHelper.alertInvitado()
    } else {
      var temp = await this.dbHelper.getLibraries(this.user);
      this.dbHelper.createLibraryBook(this.book.id, temp.data[0].id, 0);
      this.presentToastFav();

      document.getElementById('favOn').style.display = "block";
      document.getElementById('favOff').style.display = "none";
    }
  }

  async presentToastFav() {
    const toast = await this.toastController.create({
      message: 'El libro se ha añadido a favoritos',
      duration: 2000
    });
    toast.present();
  }

  async presentToastDescarga() {
    const toast = await this.toastController.create({
      message: 'El libro se ha descargado correctamente',
      duration: 2000
    });
    toast.present();
  }
  selectLibrary() {
    //this.router.navigate(['library-selector']);
    if (this.user.name !== "invitado") {
    let navigationExtras: NavigationExtras = {
      state: {
        book: this.book
      }
    };

    this.router.navigate(['library-selector'], navigationExtras);
  }else{
    this.dbHelper.alertInvitado()
  }
}

}
