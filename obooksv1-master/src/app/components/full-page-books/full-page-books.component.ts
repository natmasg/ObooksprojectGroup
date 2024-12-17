import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { ActionSheetController, Platform, PopoverController } from '@ionic/angular';



@Component({
  selector: 'app-full-page-books',
  templateUrl: './full-page-books.component.html',
  styleUrls: ['./full-page-books.component.scss'],
})
export class FullPageBooksComponent implements OnInit, OnChanges {

  @Input() books: Book[] = [];
  @Input() offline = false;
  @Input() library= 0;
  invisible: number = 0;

  constructor(private router: Router, private file: File,public platform: Platform, private popover: PopoverController) {
    //var book1: Book = new Book(1, 'si', 'https://static-cse.canva.com/blob/424162/1024w-qIvQK6RTXxg.jpg', 'si',['Romance'] );
    //var book2: Book = new Book(2, 'si', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sci-fi-book-cover-template-a1ec26573b7a71617c38ffc6e356eef9_screen.jpg?ts=1561547637', 'si',['Acción'] );
    //var book3: Book = new Book(3, 'si', 'https://edit.org/img/blog/wdn-editar-portadas-de-libros-gratis.jpg', 'si',['Aventura'] );
    //this.books = [book1, book2, book3,  book3, book2, book1, book1, book2, book2, book3];
  }

  /*ClosePopover() {
    this.popover.dismiss();
  }*/

  openBook(b) {
    //console.log(this.library)
    let navigationExtras: NavigationExtras = {
      state: {
        parametros: b,
        library: this.library
      }
    };
    this.router.navigate(['book-detail'], navigationExtras);
  }

  async openBookOffline(b) {
    let self = this;
    var title = b.title.replace(" ","%20")
    if(this.platform.is('hybrid')){
      var title = b.title.replace(" ","%20")
      let navigationExtras: NavigationExtras = {
        state: {
          parametros: "file:///storage/emulated/0/Android/data/io.ionic.starter/files/Downloads/" + title +".epub",
          origen: "offline",
        }
      };
      self.router.navigate(['viewer'], navigationExtras);
    }else{
      //console.log("Downloads/" + b.url_book +".epub")
      let navigationExtras: NavigationExtras = {
        state: {
          parametros: "Downloads/" + b.url_book +".epub",
          origen: "offline",
        }
      };
      self.router.navigate(['viewer'], navigationExtras);
    }
  }

ngOnChanges(changes: SimpleChanges)  {
  this.books = changes.books.currentValue;
  this.books = changes.books.currentValue;
}

ngAfterViewInit() {
  ////console.log(this.books, "ASDASDSADASDSDASDS")
  var invisibleCard1 = document.getElementById('invisibleCard1');
  var invisibleCard2 = document.getElementById('invisibleCard2');
  var invisibleCard3 = document.getElementById('invisibleCard3');
  var invisibleCard4 = document.getElementById('invisibleCard4');
  if(this.books!=undefined){
    if (this.books.length % 3 == 1) {
      //invisibleCard1.classList.remove("className");   //remove the class
      if(this.offline){
        invisibleCard1.classList.add("invisibleOn"); 
        invisibleCard2.classList.add("invisibleOn");
      }
      invisibleCard3.classList.add("invisibleOn"); 
      invisibleCard4.classList.add("invisibleOn");
    } else if (this.books.length % 3 == 2) {
      if(this.offline){
        invisibleCard1.classList.add("invisibleOn");   
        invisibleCard2.classList.remove("invisibleOn"); 
        invisibleCard2.classList.add("invisibleOff");
      }
      invisibleCard3.classList.add("invisibleOn"); 
      invisibleCard4.classList.add("invisibleOff");
        
    }
  } 

}

optionsOffline() {
  //console.log('options offline');
}

/*async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: PopoverComponent,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();
  //console.log('onDidDismiss resolved with role', role);
}*/

ngOnInit() { }


}
