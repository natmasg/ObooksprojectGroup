import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  user:string='';
  password:string='';

  constructor(private router: Router, private dbHelper: DBHelperService,public alertController: AlertController) {}

  ngOnInit() {
  }

  async checkUser(){
    
    this.user = (<HTMLInputElement>document.getElementById("user")).value
    this.password = (<HTMLInputElement>document.getElementById("password")).value

    var result = await this.dbHelper.checkUser(this.user,this.password);

    //console.log(result)

    if(result.user_nick!==undefined){
      this.dbHelper.setUser(result)
      this.router.navigate(['tabs/tab1']);

    }else{
      var alert = await this.alertController.create({
        header: 'Nombre o Contraseña incorrecto',
        message:'Lo sentimos, el nombre o contraseña no coinciden',
        buttons: ['OK']
      });
  
      await alert.present();
  
      var { role } = await alert.onDidDismiss();
    }

  }

  useGuest() {

      this.router.navigate(['tabs/tab1']);
  }

  sendToRegister() {
    this.router.navigate(['register']);
  }

}
