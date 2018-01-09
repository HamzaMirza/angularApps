import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class GetjoblistService {
  applicants:{date:"",stUid:"",studentName:""}[]=[];
 todos$: FirebaseListObservable<any[]>;
  hasApplied:boolean[]=[];
  constructor(private af:AngularFireDatabase) 
  { 
    this.todos$ = this.af.list('/vacancies');
    this.af.list('/vacancies/', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
              
              this.af.list('/vacancies/'+snapshot.key+'/applicants/', { preserveSnapshot: true}).subscribe(snapshots=>
              {
                snapshots.forEach(snapshot => 
                {
                  this.applicants.push(snapshot.val());
  
                    
                  
                });
              })
            });
          });
          console.log(this.applicants);
  }
        loadhasApplied(uid)
        {
           
           for(let k=0;k<this.applicants.length;k++)
            {
              if(this.applicants[k].stUid==uid)
                this.hasApplied[k]=true;
              else
                this.hasApplied[k]=false;
            }
        }

}
