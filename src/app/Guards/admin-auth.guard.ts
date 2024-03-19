  import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
  import { AuthService } from '../Services/auth.service';
  import { Injectable } from '@angular/core';
  
  @Injectable({
    providedIn: 'root'
  })
  export class AdminAuth implements CanActivate {
  
    constructor(private router: Router, private authService: AuthService){
  
    }
    
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot):
       boolean {
      if(!this.authService.isLoggedIn()){
        this.router.navigate(['member']);
        // return false;
      }
      return this.authService.isLoggedIn();
    }
     
  };
  
  
  


