import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/Services/admin-auth.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: '';

  constructor(private auth:AdminAuthService,private router:Router,private formBuilder:FormBuilder){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
  }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/main']);
    }
  }
  onSubmit()
  {
    const { email, password } = this.loginForm.value;
    this.auth.login(email,password).subscribe(
      (response)=>{
        this.router.navigate(['/main']);
        console.log(response)
      }
    )
  }

}
