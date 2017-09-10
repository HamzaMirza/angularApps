import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: string;
userName:string;
  password: string;
  repassword:string;
  error:any;
  types=['Admin','Student','Company'];
  typeSelected:string=this.types[0];
  todos$: FirebaseListObservable<any[]>;
 addTodo(email: string,type:string,uid:string,userName:string): void {
  this.todos$.push({ userName: userName, type: type,uid:uid,email:email});
}
  constructor(private router:Router,public authService: AuthService,private af:AngularFireDatabase) { }

  ngOnInit() {
    this.todos$ = this.af.list('/users');
    this.authService.getisLoggedIn().then(
      (success) => 
      {
        if(this.authService.isLoggedIn)
        {
          this.af.list('/users', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
                if(snapshot.val().uid==this.authService.uid)
                {
                  this.authService.userName=snapshot.val().userName;
                  console.log(''+['/'+snapshot.val().type.toLowerCase()]);
                  this.router.navigate(['/'+snapshot.val().type.toLowerCase()]);
                }
            });
          })
        }
        else
        {
          console.log(this.authService.isLoggedIn);
        }

  }
    );
         

   
  }
signup() {
  if(this.password && this.repassword)
    {
      try
      {
        let err= this.authService.signup(this.email, this.password).then(
          (success)=>
          {
              this.addTodo(this.email,this.typeSelected,this.authService.uid,this.userName);
               console.log("data inserted",this.email,this.typeSelected,this.authService.uid,this.userName );
               this.authService.userName=this.userName;
               if(this.typeSelected=="Company" || this.typeSelected=="Admin")
                {
                  this.af.list('/usersDetails').push({uid:this.authService.uid, name: this.userName, address:"",cellNum:"",key:""});
                  
                  this.af.list('/usersDetails', { preserveSnapshot: true}).subscribe(snapshots=>
                 {
                    snapshots.forEach(snapshot => 
                    {
                        if(snapshot.val().uid==this.authService.uid)
                        {
                          
                          this.af.object('/usersDetails/' + snapshot.key)
                            .update({key:snapshot.key});
                        }
                    });
                  });
                
                }
               else if(this.typeSelected=="Student")
               this.af.list('/usersDetails').push({uid:this.authService.uid, name: this.userName, fatherName:"",education:"",CGPA:"",cellNum:"",key:""});
                
               this.login();
          },
          (error)=>this.error=error//"Email/Password not correct!"
        );
        
      
     
      }
      catch(e){}
      finally{
         this.router.navigate(['/'+this.typeSelected.toLowerCase()]);
      }
      
      
    }
  else
    this.error="Password donot match";
   
  }

  login() {
    try
    {
      let tf:boolean=false;
       this.authService.login(this.email, this.password).then(
         (success)=>{
          this.af.list('/users', { preserveSnapshot: true})
          .subscribe(snapshots=>{
              snapshots.forEach(snapshot => {
                if(snapshot.val().email==this.email)
                {
                  this.authService.userName=snapshot.val().userName;
                  
                  tf=true;
                  this.router.navigate(['/'+snapshot.val().type.toLowerCase()]);
                }
              });
          });
            if(!tf) 
            {
              this.logout();
            }
         },
        (error)=>this.error="Email/Password not correct!"
       )
       
    }
    catch(e)
    {
      this.error=e;
    }
  }

  logout() {
    this.authService.logout();
  }
}
