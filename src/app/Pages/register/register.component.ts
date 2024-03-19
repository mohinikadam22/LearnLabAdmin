import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/access']);
    }
  }
  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      () => {
        // Registration successful, navigate to dashboard
        this.router.navigate(['/access']);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
