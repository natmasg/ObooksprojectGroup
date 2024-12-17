import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

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
    'newEmail':"",
  }

  async logForm() {
    //console.log(this.todo.password)
    var result = await this.dbHelper.checkUser(this.user.user_nick,this.todo.password)
    //console.log(result)
    if(result.name!==undefined){

        var peticion = {
          id: this.user.id,
          email: this.todo.newEmail
        }
        await this.dbHelper.changeEmail(peticion)
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
