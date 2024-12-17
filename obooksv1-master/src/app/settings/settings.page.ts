import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DBHelperService } from '../services/dbhelper.service';
import {name} from '../variables/const'

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class settingsPage implements OnInit {
  user={
    name
  }
  darkMode: boolean = true;

  constructor(private router: Router, public dbHelper: DBHelperService,public alertController: AlertController) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    ////console.log(prefersDark)
    ////console.log(this.dbHelper.oscuro)
    if (prefersDark.matches ===true || this.dbHelper.oscuro===true){
      this.darkMode = true;
    }else{
      this.darkMode = false
    }
  }
    async ngOnInit(){
      await this.checkUser();
      await this.dbHelper.getTema()
      console.log(window.location.href.split("/tabs/settings")[0]+"/tabs/tab1")
    }
  

    change() {
      ////console.log("a")
      this.darkMode = !this.darkMode;
      ////console.log(this.darkMode)
      document.body.classList.toggle('dark');
      this.dbHelper.setTema(this.darkMode)
    }


    async ionViewDidEnter(){
      await this.checkUser();
    }
    
    async checkUser(){
      if(await this.dbHelper.getUserLogged()!==null){
        this.user= await this.dbHelper.getUserLogged();
      }else{
        this.user.name=name
        document.getElementById('cuenta').style.display='none'
        document.getElementById('invitado').style.display='block'
      }
    }
 
  login() {
    this.router.navigateByUrl('login',{
      replaceUrl : true
     });
    
  }

  register(){
    this.router.navigateByUrl('register',{
      replaceUrl : true
     });
  }

  navigateChange(page: string) {
    this.router.navigate([page]);
  }

    async share(){
      if(navigator.share===undefined){
        var alert = await this.alertController.create({
          header: 'Error',
          message:'Tenemos problemas para compartir en este navegador',
          buttons: ['OK']
        });
    
        await alert.present();
    
        var { role } = await alert.onDidDismiss();
      }else{

      
      navigator.share({
        'title': 'Me ha gustado muchisisisisimo esta web/app, toma <3',
        'text': 'Graciaaaaaaaaaaaaaaaaaas <3',
        'url': window.location.href.split("/tabs/settings")[0]+"/tabs/tab1"
      }).then(function() {
        //console.log('Successful share');
      }).catch(async function(error) {
        var alert = await this.alertController.create({
          header: 'Error',
          message:'Tenemos problemas para compartir en este navegador',
          buttons: ['OK']
        });
    
        await alert.present();
    
        var { role } = await alert.onDidDismiss();
        var options = {
          message: 'Ayudanos a aprobar con esta web/app. :D ', // not supported on some apps (Facebook, Instagram)
          subject:'asias', // fi. for email
          files: ['', ''], // an array of filenames either locally or remotely
          url: 'nuestra url',
          chooserTitle: 'Elige una aplicación', // Android only, you can override the default share sheet title
          iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
        };
        
        this.socialSharing.shareWithOptions(options);
      });
    }
  
    }
    cerrar(){
      document.getElementById('cuenta').style.display='none'
      document.getElementById('invitado').style.display='block'
      this.dbHelper.cerrarSesion();
    }

   async borrar(){
      const alert = await this.alertController.create({
        header: 'ELIMINAR CUENTA',
       
        message: "¿Está segur@ de eliminar su cuenta?</br></br>Le advertimos que esta accion será irreversible",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.dbHelper.deleteAccount(this.user)
              this.router.navigateByUrl('login',{
                replaceUrl : true
               });
            }
          },
          
        ]
      });
  
      await alert.present();
    }
  
}
