import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/access']);
    }
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      {
        next: (response) => {
          console.log(response)
          console.log(email)
          console.log(response.id)
        },
        error: (err) => {
          console.error(err)
        },
        complete: () => {
          this.router.navigate(['/access'])
        }
      }
    );
  }
}