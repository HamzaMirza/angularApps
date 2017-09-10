import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class GetstudentlistService {

  studentsUid:string[]=[];
  studentList:Object[]=[];
  studentkey:string[]=[];
    student$: FirebaseListObservable<any[]>;

  constructor(private af:AngularFireDatabase) 
  { 
        this.student$ = this.af.list('/usersDetails_student/');

    this.af.list('/users', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
                if(snapshot.val().type=="Student")
                {
                  this.studentsUid.push(snapshot.val().uid);
                  this.studentkey.push(snapshot.key);

                }
            });
          });
          let index=0;
     this.af.list('/usersDetails_student', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
                if(snapshot.val().uid==this.studentsUid[index])
                {
                  
                   this.studentList.push(snapshot.val());
                
                   
                   index++;
                }
            });
          })
  }

}
