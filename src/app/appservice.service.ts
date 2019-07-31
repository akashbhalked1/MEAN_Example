import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  public message = new Subject<string>();

  setMessage(msg)
  {
    this.message.next(msg);
  }
 constructor(){
   this.message.next("Started");
 }
}
