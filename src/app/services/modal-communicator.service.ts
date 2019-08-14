import { Injectable } from '@angular/core';
 import { Observable,Subject} from  'rxjs'

@Injectable()
export class ModalCommunicatorService {

  constructor() { }
 // Observable string sources
 private modalSubmittedSource = new Subject<string>();
 private modalCancelledSource = new Subject<string>(); 
 

 // Observable string streams
 
 modalSubmitted$ = this.modalSubmittedSource.asObservable();
 modalCancelled$ = this.modalCancelledSource.asObservable();
 
 modalSubmitClicked() {
   this.modalSubmittedSource.next();
 }

 modalCancelClicked() {
   
   this.modalCancelledSource.next();
 }
}
