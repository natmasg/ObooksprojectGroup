import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private router: Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  async enviar(){
    var alert = await this.alertController.create({
      header: 'Enviado',
      message:'Muchas gracias por contactar con nosotros. En seguida responderemos.',
      buttons: ['OK']
    });
    await alert.present();
  
    var { role } = await alert.onDidDismiss();
    this.router.navigate(['/tabs/settings']);
  }


}
