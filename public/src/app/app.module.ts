import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { GetstudentlistService } from './getstudentlist.service';
import { GetjoblistService } from './getjoblist.service';
import { NotifcationsListService } from './notifcations-list.service';
import { GetCompanylistService } from './get-companylist.service';

import { educations } from './educationList';

import { AtuhGuard } from './atuh.guard';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import {Router,RouterModule} from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import 'rxjs/add/observable/fromPromise';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    AdminComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'student',
        pathMatch:'full',
         canActivate:[AtuhGuard],
        component:StudentComponent
      },
      {
        path:'admin',
        pathMatch:'full',
         canActivate:[AtuhGuard],
        component:AdminComponent
      },
      {
        path:'company',
        pathMatch:'full',
         canActivate:[AtuhGuard],
        component:CompanyComponent
      },
        {
        path:'login',
        pathMatch:'full',
        component:LoginComponent
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'/login'
      },
      {
        path:'**',
        redirectTo:'/login'
      }
    ])
  ],
  providers: [NotifcationsListService,GetjoblistService,GetCompanylistService,GetstudentlistService,AuthService,AtuhGuard,AngularFireDatabase,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
