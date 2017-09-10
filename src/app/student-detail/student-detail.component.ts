import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
educations:string[]=['PhD','Masters','Bachelors','High School','Diplomas'];
isformSubmitted:boolean=false;
isCorrect:boolean=false;
onSubmit(data){
  this.isformSubmitted=true;
  this.isCorrect=false;
console.log(data);
}
changeFlag()
{
   this.isformSubmitted=!this.isformSubmitted;
}
  constructor() { }

  ngOnInit() {
  }

}
