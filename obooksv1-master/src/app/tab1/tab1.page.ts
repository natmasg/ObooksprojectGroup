import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DBHelperService } from '../services/dbhelper.service';

import {name} from '../variables/const'
import { ContactPage } from '../helpPages/contact/contact.page';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit/*,OnChanges*/ {

  user ={
    name:"prueba"
  }

  message: string = 'No hay bibliotecas.'

  libraries;
  librariesToShow;
  reading;

  constructor(private router: Router, private dbHelper : DBHelperService) {
  }

  /*async ngOnChanges(changes) {
    this.checkUser();
    console.log(changes)

  }*/

  async ngOnInit(){
    await this.checkUser();
    
    
  }
/*
  async ionViewDidEnter(){
    await this.checkUser();
  }*/

  async ionViewWillEnter(){
    await this.checkUser();
  }

  async checkUser(){
    if(await this.dbHelper.getUserLogged()!==null){
      this.message = 'No has creado ninguna biblioteca.'
      this.user=await this.dbHelper.getUserLogged();
      this.getLibreries()
      document.getElementById('identification_recom').style.display='none'
      //console.log('entra en storage');
    }else{
      this.message = 'Las bibliotecas no están disponibles en modo invitado. '
      document.getElementById('reading_shortcut').style.display='none';
      this.user.name=name;
      document.getElementById('identification_recom').style.display='block'
      //console.log('entra en invi');
    }
  }

  async libfav(){
    ////console.log(this.user.name);
    if(this.user.name==='invitado'){
      this.dbHelper.alertInvitado()
    }else{
      this.openLibrary(this.libraries[0]);
    }
  }

  async libleyendo(){
    if(this.user.name==='invitado'){
      this.dbHelper.alertInvitado()
    }else{
      this.openLibrary(this.libraries[1]);
    }
    
  }
 
  createLibrary() {
    if(this.user.name==='invitado'){
      this.dbHelper.alertInvitado()
    }else{
      this.router.navigateByUrl('library',{
        replaceUrl : true
       });
    }
  }

  async getLibreries() {
    if(this.user.name!=='invitado'){
      ////console.log(this.user)
      var temp = await this.dbHelper.getLibraries(this.user);
      this.libraries = temp.data
      this.librariesToShow = this.libraries.slice(2);
      this.librariesToShow = this.librariesToShow.reverse();
      //console.log(this.libraries)
      this.dbHelper.guardarLibrary(this.libraries)
      ////console.log(this.libraries)
      if(this.libraries !=undefined){
        //console.log(this.libraries)
        var libraryBook= await this.dbHelper.getLibraryBook(this.libraries[1].id);
        this.reading = this.dbHelper.getBooksById(libraryBook).reverse();

        if (this.reading.length == 0) {
          document.getElementById('reading_shortcut').style.display='none';
        } else {
        document.getElementById('reading_shortcut').style.display='block';
        }
      }
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

  openLibrary(library) {
    ////console.log(this.user.name);
    if(this.user.name==='invitado'){
      this.dbHelper.alertInvitado()
    }else{
      ////console.log(this.user.name);

      //this.router.navigate(['library-detail']);

      let navigationExtras: NavigationExtras = {
        state: {
          library: library,
          replaceUrl:true
        }
      };

      this.router.navigate(['library-detail'], navigationExtras);
    }
  }
  
  openBook(b){
    let navigationExtras: NavigationExtras = {
      state: {
        parametros: b,
        replaceUrl : true
        //library: null
      }
    };
    this.router.navigate(['book-detail'], navigationExtras);
  }


}

