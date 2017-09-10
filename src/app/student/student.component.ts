import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { educations } from '../educationList';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import { GetCompanylistService } from '../get-companylist.service';
import { GetjoblistService } from '../getjoblist.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
educations=educations;
isformSubmitted:boolean=false;
isCorrect:boolean=false;
displayCompanyList:boolean=false;
displayVacancy:boolean=false;
isViewJob:boolean=false;
date:string=new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy');
details={uid:"", name:"", fatherName:"",education:"",CGPA:"",cellNum:"",key:""};

  constructor(private router:Router,public authService: AuthService,private af:AngularFireDatabase,public GetCompanylistService:GetCompanylistService,public GetjoblistService:GetjoblistService) {}
  ngOnInit() 
  {
    if(this.authService.userName=="")
    {
       this.af.list('/users', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
                if(snapshot.val().uid==this.authService.uid)
                {
                  this.authService.userName=snapshot.val().userName;
                }
            });
          });
          
    }
       this.af.list('/usersDetails', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
                if(snapshot.val().uid==this.authService.uid)
                {
                  
                   this.details= snapshot.val();
              
                   this.details.key=snapshot.key;
                }
            });
          });
         
  }
  display:boolean=false; 

  logout() 
  {
    this.authService.logout().then(
      success => this.router.navigate(['/login'])
    );
  }
  updateTodo2(data): void
  {
   
    this.af.object('/usersDetails/' + this.details.key)
    .update({name:data.name, fatherName:data.fatherName,education:data.education,CGPA:data.CGPA,cellNum:data.cellNum,key:this.details.key}).then(
      success=>this.isCorrect=true,
      error=>this.isCorrect=false
    ); 
    console.log(data.name,data.CGPA,data.cellNum,this.details.key,"updted");   
 }
    onSubmit(data)
  {
        this.isCorrect=false;
    this.updateTodo2(data);
    this.isformSubmitted=true;
  }
    setDisplay()
  {
    this.display=true;
    this.displayVacancy=false;    
    this.displayCompanyList=false;
    this.isViewJob=false;
    
  }
  setDisplayCompanyList()
  {
    this.display=false;
    this.displayVacancy=false;    
    this.displayCompanyList=true;
    this.isViewJob=false;
    
  }
  setDisplayVacancy()
  {
    this.GetjoblistService.loadhasApplied(this.authService.uid); 
    this.display=false;
    this.displayCompanyList=false;
    this.displayVacancy=true;
    this.isViewJob=true;     
  }

changeFlag()
{
   this.isformSubmitted=!this.isformSubmitted;
}
 apply(i:any,ind)
{
  this.af.list('/vacancies/' + i.$key+'/applicants').push({ studentName: this.authService.userName,date:this.date,stUid:this.authService.uid }).then(
      success=>{
        this.isCorrect=true;
        this.GetjoblistService.hasApplied[ind]=true;
      },
      error=>this.isCorrect=false
    ); ; 
}

}
