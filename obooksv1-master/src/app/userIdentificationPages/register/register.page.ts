import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userName: string;

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
  }

  sendToLogin() {
    this.router.navigate(['login']);
  }

  async validate() {
    console.log('username: ', this.userName)
    if (this.userName == undefined) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Nombre no válido',
        message: 'No se ha escrito ningún nombre. ',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    } else {
      this.navigateNextRegisterPage('register-page2');
    }
  }

  navigateNextRegisterPage(page: string) {
    ////console.log(this.userName, 'in page 111111111');
    let navigationExtras: NavigationExtras = {
      state: {
        userName: this.userName
      }
    };
    this.router.navigate([page],navigationExtras);
  }
}
