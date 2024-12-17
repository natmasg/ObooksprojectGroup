import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname.page.html',
  styleUrls: ['./nickname.page.scss'],
})
export class NicknamePage implements OnInit {
  user
  constructor(private router: Router,private dbHelper:DBHelperService) { }

  async ngOnInit(){
    await this.getUser();
    //console.log(this.user)
  }

  async ionViewDidEnter(){
    await this.getUser();
  }

  async getUser(){
      this.user= await this.dbHelper.getUserLogged();
    
  }

  todo={
    'password':"",
    'newNick':"",
  }

  async logForm() {
    //console.log(this.todo.password)
    var result = await this.dbHelper.checkUser(this.user.user_nick,this.todo.password)
    //console.log(result)
    if(result.name!==undefined){
      var respuesta = await this.dbHelper.checkusernick(this.todo.newNick)
      if(respuesta.status===200){
        alert("ue")
        var peticion = {
          id: this.user.id,
          user_nick: this.todo.newNick
        }
        await this.dbHelper.changeUserNick(peticion)
        var result = await this.dbHelper.checkUser(this.todo.newNick,this.todo.password)
        this.dbHelper.setUser(result)
        this.router.navigateByUrl('/tabs/settings',{
          replaceUrl : true
         });

      }
      //var result = await this.dbHelper.checkUser(this.user.user_nick,this.todo.password)
      //this.router.navigateByUrl('/tabs/settings',{
      //  replaceUrl : true
      // });
    }else{
      alert("Contraseña Incorrecta")
    }
    


    //this.dbHelper.changePassword(this.user.id,this.todo.password)

    
  }
}
