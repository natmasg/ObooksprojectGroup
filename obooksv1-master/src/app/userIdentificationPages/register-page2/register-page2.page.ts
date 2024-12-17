import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-page2',
  templateUrl: './register-page2.page.html',
  styleUrls: ['./register-page2.page.scss'],
})
export class RegisterPage2Page implements OnInit {

  userName: string;
  email: string;

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController) {
    ////console.log('page 2');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let params = this.router.getCurrentNavigation().extras.state.userName;
        this.userName = params;
        ////console.log(this.userName, '--------------------------------------');

        ////console.log(this.router.getCurrentNavigation().extras.state.userName);
      }
    });
  }

  async validate() {
    if (this.email == undefined) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Email no válido',
        message: 'No se ha escrito ningún email. ',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    } else {
      let splittedAt: string[] = this.email.split("@");
      
      if (splittedAt[0] == null || splittedAt[0] == undefined || splittedAt[0] == '' || splittedAt.length != 2) {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Email no válido',
          message: 'Este email o es una dirección válida. ',
          buttons: ['OK']
        });
    
        await alert.present();
    
        const { role } = await alert.onDidDismiss();
      } else {
        let splittedDot = splittedAt[1].split(".");

        if (splittedDot == null || splittedDot == undefined || splittedDot[1] == '' || splittedDot.length != 2) {
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Email no válido',
            message: 'Este email o es una dirección válida. ',
            buttons: ['OK']
          });
      
          await alert.present();
      
          const { role } = await alert.onDidDismiss();
        } else {
          this.navigateNextRegisterPage('register-page3');
        }
      }
    }
  }

  ngOnInit() {
  }

  sendToLogin() {
    this.router.navigate(['login']);
  }

  navigateNextRegisterPage(page: string) {
    
    let navigationExtras: NavigationExtras = {
      state: {
        userName: this.userName,
        email: this.email
      }
    };
    this.router.navigate([page],navigationExtras);
  }

}
