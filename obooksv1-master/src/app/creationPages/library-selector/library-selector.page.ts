import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-library-selector',
  templateUrl: './library-selector.page.html',
  styleUrls: ['./library-selector.page.scss'],
})
export class LibrarySelectorPage implements OnInit {

  libraries;
  book;
  user;

  constructor(private dbHelper: DBHelperService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let book = this.router.getCurrentNavigation().extras.state.book;
        this.book = book;
      }
    });

    
    this.getLibreries();


  }

  async getLibreries() {
    this.user = await this.dbHelper.getUserLogged();
    var temp = await this.dbHelper.getLibraries(this.user);
    this.libraries = temp.data
    ////console.log(this.libraries)
    this.dbHelper.guardarLibrary(this.libraries)
  }

  ngOnInit() {

  }

  newLibrary(book) {
    //this.dbHelper.createLibraryWithBook(book);
    ////console.log("new");

    let navigationExtras: NavigationExtras = {
      state: {
        parametros: this.book,
      }
    };
    this.router.navigate(['library'], navigationExtras);
  }

  endSelection() {
    //console.log("ok - ", this.book.id);

    for (let i = 0; i < this.libraries.length; i++) {
      if (this.libraries[i].isChecked == true) {
        this.dbHelper.createLibraryBook(this.book.id, this.libraries[i].id, 0);
      }
    }

    let navigationExtras: NavigationExtras = {
      state: {
        parametros: this.book,
      }
    };
    this.router.navigate(['book-detail'], navigationExtras);

    //ngmodeled
  }


}
