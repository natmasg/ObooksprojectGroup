import { Component, OnInit } from '@angular/core';
import { DBHelperService } from 'src/app/services/dbhelper.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
help
  constructor(private dbHelper: DBHelperService) { }

  async ngOnInit() {
    let temp = await this.dbHelper.getHelp()
    this.help = temp.data

  }

}
