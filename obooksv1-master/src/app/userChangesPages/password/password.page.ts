import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  user
  constructor(private router: Router, private dbHelper: DBHelperService) { }

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
    'currentPassword':"",
    'newPassword':"",
    'newPasswordRep':""
  }


 async logForm() {
    //console.log(this.todo.currentPassword)
    var result = await this.dbHelper.checkUser(this.user.user_nick,this.todo.currentPassword)
    //console.log(result)
    if(result.name!==undefined){
    if(this.todo.newPassword===this.todo.newPasswordRep){
      var peticion = {
        id: this.user.id,
        password: this.todo.newPassword
      }
      await this.dbHelper.changePassword(peticion)
      var result = await this.dbHelper.checkUser(this.user.user_nick,this.todo.newPassword)
      this.router.navigateByUrl('/tabs/settings',{
        replaceUrl : true
       });
    }
    }else{
      alert("Contraseña Actual Incorrecta")
    }
    


    //this.dbHelper.changePassword(this.user.id,this.todo.password)

    
  }
}
