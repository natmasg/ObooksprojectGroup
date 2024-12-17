import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-page3',
  templateUrl: './register-page3.page.html',
  styleUrls: ['./register-page3.page.scss'],
})
export class RegisterPage3Page {

  userName: string;
  email: string;
  password: string;
  repPassword: string;

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController) {
    ////console.log('page 2');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let userName = this.router.getCurrentNavigation().extras.state.userName;
        this.userName = userName;

        let email = this.router.getCurrentNavigation().extras.state.email;
        this.email = email;
      
        ////console.log(this.router.getCurrentNavigation().extras.state.userName);
      }
    });

    
  }

  async validate() {
    if (this.password == undefined) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Contraseña no válida',
        message: 'No se ha escrito ninguna contraseña. ',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    } else if (this.repPassword == undefined || this.repPassword != this.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Contraseña no válida',
        message: 'Las contraseñas no coinciden. ',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    } else {
      if (this.password.length < 8) {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Contraseña no válida',
          message: 'Contraseña demasiado corta. ',
          buttons: ['OK']
        });
    
        await alert.present();
    
        const { role } = await alert.onDidDismiss();
      } else {
        var nums: string = '0123456789';
        var spChars = '-.,;:/()=?¿\&%$·@!#€~ºª[]{}+*<>|¬'
         var abc = 'abcdefghijklmnñopqrstuvwxyz'
        var valid: boolean = true; // cuidao

        /*for (let i = 0; i < this.password.length; i++){
          if (nums.indexOf(this.password.charAt(i), 0) != -1){
            if (spChars.indexOf(this.password.charAt(i), 0) != -1){
              if (abc.indexOf(this.password.charAt(i), 0) != -1){
                if (abc.toUpperCase().indexOf(this.password.charAt(i), 0) != -1){
                  valid = true;
                }
              }
            }
          }
        }*/ // mucho palo

        if (valid) {
          this.navigateNextRegisterPage('register-page4');
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Contraseña no válida',
            message: 'La contraseña debe tener números, letras y carácteres especiales. ',
            buttons: ['OK']
          });
      
          await alert.present();
      
          const { role } = await alert.onDidDismiss();
        }
      }
    }
  }

  navigateNextRegisterPage(page: string) {
    ////console.log(this.userName, 'in page 111111111');
    let navigationExtras: NavigationExtras = {
      state: {
        userName: this.userName,
        email: this.email,
        pass: this.password
      }
    };
    this.router.navigate([page],navigationExtras);
  }

}
