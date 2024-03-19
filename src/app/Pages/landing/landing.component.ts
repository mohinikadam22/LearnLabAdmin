import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/access']);
    }
  }
}
