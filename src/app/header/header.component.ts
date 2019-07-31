import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AppserviceService} from '../appservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
 
  constructor(private http:HttpClient,private service:AppserviceService) { }
  formdata;
  res:any;
  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl(""),
      addr: new FormControl("")
   });
  }
  add(user)
  {
    this.http.post('http://localhost:3005/add',user).subscribe((response)=>{
    this.res=response;
    this.formdata.reset();
    this.service.setMessage("Refresh");
    })
  }


}
