import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppserviceService} from '../appservice.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html'
})
export class BodyComponent implements OnInit {

  constructor(private http:HttpClient,private service:AppserviceService) { }
  people:any;
  IsTextBoxDisabled=[];
  index=0;
  response;
  ngOnInit() {
  this.http.get('http://localhost:3005/').subscribe((res)=>
  {
     this.people=res;
     this.IsTextBoxDisabled.length=this.people.length;
     this.IsTextBoxDisabled=this.IsTextBoxDisabled.fill(true);
     this.service.message.subscribe((msg)=>{
       if(msg=='Refresh')
       this.refresh();
     })
  })
  }
  delete(id)
  {
    var json={
      'id':id
    };
    this.http.post('http://localhost:3005/delete',json).subscribe((res)=>{
    this.people=res;
    })
  }

  refresh()
  {
    this.ngOnInit();
  }

  enable(i)
  {
    this.IsTextBoxDisabled[i]=false;
  }

  update(person)
  {
    this.http.post('http://localhost:3005/update',person).subscribe((res)=>{
    this.response=res;
    if(this.response.status==true)
    this.refresh();
    })
  }

  disp()
  {
    console.log("focused");
  }


}
