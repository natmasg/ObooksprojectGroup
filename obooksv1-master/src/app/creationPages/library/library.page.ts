import { Component, OnInit } from '@angular/core';
import { DBHelperService } from 'src/app/services/dbhelper.service';
import { ActivatedRoute, Router } from '@angular/router';



interface Color {
  name: string;
  colorName: string;
}

interface Icon {
  name: string;
  icon: string;
}


@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  user;
  title: string;
  colors: Color[];
  icons: Icon[];
  icon: any = 'library';
  color: any = 'secondary';


  tempBook;

  constructor(private route: ActivatedRoute, private router: Router,public dbHelper: DBHelperService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tempBook = this.router.getCurrentNavigation().extras.state.parametros;
      }
    });

    this.colors = [
      {
        name: 'Predeterminado',
        colorName: 'secondary',
      },
      {
        name: 'Verde Oscuro',
        colorName: 'darkgreen',
      },
      {
        name: 'Verde Claro',
        colorName: 'lightgreen',
      },
      {
        name: 'Azul Oscuro',
        colorName: 'darkblue',
      },
      {
        name: 'Azul Claro',
        colorName: 'lightblue',
      },
      {
        name: 'Naranja',
        colorName: 'orange',
      },
      {
        name: 'Pikachu',
        colorName: 'pikachu',
      },
      {
        name: 'Rosa',
        colorName: 'pink',
      },
      {
        name: 'Rojo',
        colorName: 'red',
      },
    ];

    this.icons = [
      {
        name: 'Predeterminado',
        icon: 'library',
      },
      {
        name: 'Soleado',
        icon: 'sunny',
      },
      {
        name: 'Libro',
        icon: 'book',
      },
      {
        name: 'Pizza',
        icon: 'pizza',
      },
      {
        name: 'Planeta',
        icon: 'planet',
      },
      {
        name: 'Cama',
        icon: 'bed',
      },
      {
        name: 'Café',
        icon: 'cafe',
      },
      {
        name: 'Tierra',
        icon: 'earth',
      },
      {
        name: 'Luna',
        icon: 'moon',
      },
    ];
  }

  async create() {
    let library: object = {
      userId: this.user.id,
      title: this.title,
      color: this.color,
      icon: this.icon
    }

    this.dbHelper.createLibrary(library, this.tempBook);

    

    this.router.navigateByUrl('tabs/tab1',{
      replaceUrl:true
    });

  }

  async ngOnInit() {
    this.user = await this.dbHelper.getUserLogged()
    ////console.log(this.user);
  }

  changedIcon(selectedValue: any) {
    this.icon = selectedValue.detail.value;
  }

  changedColor(selectedValue: any) {
    this.color = selectedValue.detail.value;

    document.getElementById('testing_card_icon').style.color = this.color.colorName;
  }

}
