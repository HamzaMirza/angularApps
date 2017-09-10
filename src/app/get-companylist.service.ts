import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class GetCompanylistService {

  companiesUid:string[]=[];
  companieskey:string[]=[];
  companyList:Object[]=[];
  companies$: FirebaseListObservable<any[]>;
  constructor(private af:AngularFireDatabase) 
  { 
    this.companies$ = this.af.list('/usersDetails_company/');
    this.af.list('/users', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {
                if(snapshot.val().type=="Company")
                {
                  this.companiesUid.push(snapshot.val().uid);
                  this.companieskey.push(snapshot.key);
                }
            });
          });
          let index=0;
     this.af.list('/usersDetails_company', { preserveSnapshot: true}).subscribe(snapshots=>
          {
            snapshots.forEach(snapshot => 
            {      
               if(snapshot.val().uid==this.companiesUid[index])               
                {
                     this.companyList.push(snapshot.val());
                     index++;
                }
            });
          })
  }
}
