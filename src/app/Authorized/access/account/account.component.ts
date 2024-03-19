import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  
  userId = ''
  username=''

 
  constructor(private auth:AuthService){
    const user = this.auth.getUser();
    this.userId = user.UserID;
    this.username = user.Username;
  }
}
