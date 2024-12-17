import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {
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
    'newName':"",
  }

  async logForm() {
    //console.log(this.todo.password)
    var result = await this.dbHelper.checkUser(this.user.user_nick,this.todo.password)
    //console.log(result)
    if(result.name!==undefined){

        var peticion = {
          id: this.user.id,
          name: this.todo.newName
        }
        await this.dbHelper.changename(peticion)
        var result = await this.dbHelper.checkUser(this.user.user_nick,this.todo.password)
        this.dbHelper.setUser(result)
        this.router.navigateByUrl('/tabs/settings',{
          replaceUrl : true
         });
      }else{
      alert("Contraseña Incorrecta")
    }
    


    //this.dbHelper.changePassword(this.user.id,this.todo.password)

    
  }
}