import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AtuhGuard implements CanActivate {
   constructor(public authService: AuthService,private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

 return this.authService.getisLoggedIn().then(
      (success) => 
      {
        if(this.authService.isLoggedIn)
        {
           console.log("guardif:",this.authService.isLoggedIn)
          return this.authService.isLoggedIn;
        }
        else
        {
          console.log("guard",this.authService.isLoggedIn)
          this.router.navigate(['/']);
        }

  }
    );
   
  }
}
