import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DBHelperService } from './services/dbhelper.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public platform: Platform,public alertController: AlertController, private  dbHelper : DBHelperService) {
    this.initializeApp()
  }
  books=[]

  async initializeApp() {
    this.dbHelper.cargarStorage();
    /*if(this.platform.is('ios')){
      this.dbHelper.getBooks().subscribe(
        resp =>{

          this.books.push(resp.data)
          this.dbHelper.setBooks(resp.data)
        })
        //console.log(this.books)
        //this.dbHelper.setBooks(this.books)
    }*/
      this.dbHelper.cargarLibros();
    
    this.dbHelper.cargarOffline();
    this.changeDarkMode();
    
    }
     
    async changeDarkMode(){
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      //console.log(prefersDark.matches)
      //console.log(await this.dbHelper.getTema())

      if (prefersDark.matches ||  await this.dbHelper.getTema()){
        //console.log('Entra modo dark')
        document.body.classList.toggle('dark');
      }
     }

  async presentAlertHelp() {
    const alert = await this.alertController.create({
      header: 'Infromación',
      subHeader: 'Año de nacimiento',
      message: "Únicamente usamos este dato para estudiar estadísticas. No cambiará el cotenido ni su experiéncia en la aplicación.",
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    ////console.log('onDidDismiss resolved with role', role);
  }
}
