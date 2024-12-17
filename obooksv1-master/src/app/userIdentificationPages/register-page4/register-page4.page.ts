import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-register-page4',
  templateUrl: './register-page4.page.html',
  styleUrls: ['./register-page4.page.scss'],
})
export class RegisterPage4Page implements OnInit {

  nickname: string;
  userName: string;
  email: string;
  password: string;

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController, public dbHelper : DBHelperService) {
    ////console.log('page 2');
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let userName = this.router.getCurrentNavigation().extras.state.userName;
        this.userName = userName;

        let email = this.router.getCurrentNavigation().extras.state.email;
        this.email = email;

        let pass = this.router.getCurrentNavigation().extras.state.pass;
        this.password = pass;
      
        ////console.log(this.router.getCurrentNavigation().extras.state.userName);
      }
    });

    
  }

  async presentAlertHelp() {
    var alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Año de nacimiento',
      message: "Únicamente usamos esta información para estudiar estadísticas, no afectará al contenido ni a la experiencia en la aplicación.",
      buttons: ['OK']
    });

    await alert.present();

    var { role } = await alert.onDidDismiss();
    ////console.log('onDidDismiss resolved with role', role);
  }

  async endRegister() {

    var respuesta = await this.dbHelper.checkusernick(this.nickname)
      if(respuesta.status===200){

    var user = {
      'user_nick': this.nickname,
      'name': this.userName,
      'email' : this.email,
      'password' : this.password
    }
    //console.log("REGISTER: ", this.userName, ", ", this.email, ", ", this.nickname, ", ", this.password);
    //console.log(user)
    this.dbHelper.register(user)
    
    var result = await this.dbHelper.checkUser(user.user_nick, user.password);
    this.dbHelper.setUser(result)

  
    let fav: object = {
      userId: result.id,
      title: 'favourites'
    }
    await this.dbHelper.createLibrary(fav, null);
    let reading: object = {
      userId: result.id,
      title: 'reading'
    }
    await this.dbHelper.createLibrary(reading, null);
    

    this.router.navigateByUrl('tabs/tab1',{
      replaceUrl : true
     });
  }else{
    var alert = await this.alertController.create({
      header: 'Nombre de usuario en uso',
      message: "Lo sentimos, este nombre de usuario ya esta en uso, intente otro.",
      buttons: ['OK']
    });

    await alert.present();

    var { role } = await alert.onDidDismiss();
    //console.log('nope')
    }
  ////console.log('onDidDismiss resolved with role', role);
    }

  ngOnInit() {
  }

}
