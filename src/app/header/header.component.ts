import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 constructor(private router:Router,public authService: AuthService) { }
 display:boolean=false;
  ngOnInit() {}
  setDisplay(){
this.display=true;
  }
getDisplay(){
return this.display;
  }
logout() {
    this.authService.logout().then(
      success => this.router.navigate(['/login'])
    );
  }
}
