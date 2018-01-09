import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GetstudentlistService } from '../getstudentlist.service';
import { educations } from '../educationList';
import {Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { GetCompanylistService } from '../get-companylist.service';
import { GetjoblistService } from '../getjoblist.service';
import { NotifcationsListService } from '../notifcations-list.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 details={uid:"",name:"", address:"",cellNum:"",key:""};
 display:boolean=false; 
 displayStudentList:boolean=false; 
 displayVacancy:boolean=false; 
 isformSubmitted:boolean=false;
 isCorrect:boolean=false;
 isViewNotification:boolean=false;
 educations=educations;
displayCompanyList:boolean=false;
displayApplicantList:boolean=false;
applicats: FirebaseListObservable<any[]>;
isViewJob:boolean=false;
 date:string=new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy');
    posts:{subject,details,date,minQualification,owner,key}[]=[];


  
 constructor(private router:Router,public authService: AuthService,public studentlistService:GetstudentlistService,private af:AngularFireDatabase,public GetCompanylistService:GetCompanylistService,public GetjoblistService:GetjoblistService,public NotifcationsListService:NotifcationsListService) {}
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
       this.af.list('/vacancies', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
                   this.posts.push(snapshot.val()); 
                   this.posts[this.posts.length-1].key=snapshot.key;
            });
          })
          console.log(this.studentlistService.studentList);
  }
updateTodo2(data): void
  {
    this.af.object('/usersDetails/' + this.details.key)
    .update({name:data.name, address:data.address,cellNum:data.cellNum,key:this.details.key}).then(
      success=>this.isCorrect=true,
      error=>this.isCorrect=false
    ); 
    console.log(data.name,data.address,data.cellNum,this.details.key,"updted");   
 }

  setDisplay()
  {
    this.displayStudentList=false; 
    this.displayVacancy=false;  
    this.displayCompanyList=false;
    this.isViewJob=false;
    this.display=true;
    this.isViewNotification=false; 
    this.displayApplicantList=false;
  }
  setDisplayStudentList()
  {
    this.displayVacancy=false;    
    this.displayCompanyList=false;
    this.isViewJob=false;
    this.display=false;   
    this.displayStudentList=true;
    this.isViewNotification=false; 
    this.displayApplicantList=false;
    
  }
   setDisplayCompanyList()
  {
    this.displayVacancy=false;    
    this.isViewJob=false;
    this.display=false;   
    this.displayStudentList=false;
    this.displayCompanyList=true;
    this.isViewNotification=false;
    this.displayApplicantList=false;
     
  }
  setDisplayVacancy()
  {
    this.GetjoblistService.loadhasApplied(this.authService.uid); 
    this.displayCompanyList=false;
    this.isViewJob=false;
    this.display=false;   
    this.displayStudentList=false;
    this.displayVacancy=true;    
    this.isViewNotification=false; 
    this.displayApplicantList=false;
    
  }
  setDisplayJobs()
  {
    this.GetjoblistService.loadhasApplied(this.authService.uid); 
    this.displayCompanyList=false;
    this.isViewJob=true;
    this.display=false;   
    this.displayStudentList=false;
    this.displayVacancy=false;   
    this.isViewNotification=false; 
    this.displayApplicantList=false;
    
    
  }
  setDisplayVacancyList()
  {
    this.GetjoblistService.loadhasApplied(this.authService.uid); 
    this.displayCompanyList=false;
    this.isViewJob=false;
    this.display=false;   
    this.displayStudentList=false;
    this.displayVacancy=false;   
    this.isViewNotification=true;   
    this.displayApplicantList=false;
    
  }
  onSubmit(data)
  {
    this.isCorrect=false;
    this.updateTodo2(data);
    this.isformSubmitted=true;
  }
  onSubmitNotification(data)
  {
    this.isCorrect=false;
    this.uploadNotification(data);
    this.isformSubmitted=true;
  }
  uploadNotification(data): void
  {
    this.af.list('/notification/').push({name:data.notifytext,owner:this.details.name,date:this.date,key:""}).then(
      success=>{this.isCorrect=true;
      this.af.list('/notification', { preserveSnapshot: true}).subscribe(snapshots=>
                 {
                   this.af.object('/notification/' + snapshots[snapshots.length-1].key)
                            .update({key:snapshots[snapshots.length-1].key});
                   
              this.displayVacancy=false;   
        
                  });},
      error=>this.isCorrect=false
    ); 
    console.log("added");   
 }
changeFlag()
  {
    this.isformSubmitted=!this.isformSubmitted;
  }
logout() 
  {
    this.authService.logout().then(
      success => this.router.navigate(['/login'])
    );
  }




showInput:number=-1;
 inputName:string="";
 inputAddress:string="";
 inputCellNum:string="";
 inputfatherName:string="";
 inputeducation:string="";
 inputCGPA:string="";
 editStd(i:number,data)
{
 this.showInput=i;
 this.inputName=data.name;
 this.inputfatherName=data.fatherName;
 this.inputCellNum=data.cellNum;
  this.inputeducation=data.education;
 this.inputCGPA=data.CGPA;

}
saveStd(data,i)
{
  if(this.inputName!='' &&this.inputfatherName!='' &&this.inputCellNum!=''  &&this.inputeducation!='' &&this.inputCGPA!='' )
  {
    this.updateStudent(data,i);
    
    console.log('Saved',data);  
  }
  else
    console.log('Input value Empty ',data);  

}
updateStudent(data,i): void {
   this.isformSubmitted=true;
  this.af.object('/usersDetails_student/' + data.key)
    .update({name:this.inputName, fatherName:this.inputfatherName,cellNum:this.inputCellNum,CGPA: this.inputCGPA,education: this.inputeducation}).then(
      success=>{
        this.studentlistService.studentList[i]={name:this.inputName, fatherName:this.inputfatherName,cellNum:this.inputCellNum,CGPA: this.inputCGPA,education: this.inputeducation};
        console.log("success",this.studentlistService.studentList[i]);
        this.showInput=-1;
    this.inputName="";
 this.inputfatherName="";
 this.inputCellNum="";
  this.inputeducation="";
 this.inputCGPA="";
 this.isCorrect=true;
        
      },
    error=>this.isCorrect=false
    ); 
    
}
deleteStd(i:number,data)
{
   this.isformSubmitted=true;
   this.af.object('/users/' + this.studentlistService.studentkey[i]).remove().then(
     success=>{

          this.af.object('/usersDetails_student/' + data.key).remove().then(
            success=>{
              console.log("account delted",this.studentlistService.studentkey[i],",",data.key);
              this.isCorrect=true;
            },error=>this.isCorrect=false
          );
     }
  );

          console.log("account delted",this.studentlistService.studentkey[i],",",data.key);
 
}
viewApplicats(data,i:number)
{
  this.applicats=null;
   this.applicats=this.af.list('/vacancies/'+data.$key+'/applicants/');
         
                  
   
      this.displayApplicantList=true;
     this.displayVacancy=false;    
    this.isViewJob=false;
    this.display=false;   
    this.displayStudentList=false;
    this.displayCompanyList=false;
    this.isViewNotification=false;
 //   this.applicats
   
}
edit(i:number,data)
{
 this.showInput=i;
 this.inputName=data.name;
 this.inputAddress=data.address;
 this.inputCellNum=data.cellNum;

}

delete(i:number,data)
{
   this.isformSubmitted=true;
   this.af.object('/users/' + this.GetCompanylistService.companieskey[i]).remove().then(
     success=>{

          this.af.object('/usersDetails_company/' + data.key).remove().then(
            success=>{
              this.isCorrect=true;
              console.log("account delted",this.GetCompanylistService.companieskey[i],",",data.key);
            },
            error=>this.isCorrect=false
          );
     }
  );

          console.log("account delted",this.GetCompanylistService.companieskey[i],",",data.key);
 
}
save(data,i)
{
   this.isformSubmitted=true;
  if(this.inputName!='' &&this.inputAddress!='' &&this.inputCellNum!='' )
  {
    this.updateCompany(data,i);
    
    console.log('Saved',data);  
  }
  else
    console.log('Input value Empty ',data);  

}
updateCompany(data,i): void {
   this.isformSubmitted=true;
  this.af.object('/usersDetails_company/' + data.key)
    .update({name:this.inputName, address:this.inputAddress,cellNum:this.inputCellNum}).then(
      success=>{
        this.GetCompanylistService.companyList[i]={name:this.inputName, address:this.inputAddress,cellNum:this.inputCellNum};
        console.log("success",this.GetCompanylistService.companyList[i]);
        this.showInput=-1;
    this.inputName="";
    this.inputAddress="";
    this.inputCellNum="";
    this.isCorrect=true;
      
        
      },
      error=>this.isCorrect=false
    ); 
    
}
trackById(i: number): number { return i; }
deleteJob(data,i:number)
{
   this.isformSubmitted=true;
   this.af.object('/vacancies/' + data.$key).remove().then(
     success=>this.isCorrect=true,
     error=>this.isCorrect=false
  
  );

          console.log("account delted",",",data.$key);
 
}

}
