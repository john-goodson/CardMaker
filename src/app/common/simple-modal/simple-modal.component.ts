import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalCommunicatorService } from '../../services/modal-communicator.service';
import { Observable, Subject } from 'rxjs'
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent {
  @Input() title: string;   // passed in from the parent component's markup
  @Input() elementId: string;  //ditto
  @Input() closeOnBodyClick: string;
  @Input() primaryBtnText: string;
  @Input() secondaryButtonText: string;
  @Input() showsecondaryButton: Boolean = false;
  @Input() enablePrimary: Boolean = false;
  @Input() enableSecondary: Boolean = true;
  @ViewChild('modalcontainer') containerEl: ElementRef;
  modalId: string;

  private modalSubmittedSource = new Subject<string>();
  modalSubmitted$ = this.modalSubmittedSource.asObservable();

  private modalClosedSource = new Subject<string>();
  modalClosedSource$ = this.modalClosedSource.asObservable();

  private modalSecondarySource = new Subject<string>();
  modalSecondary$ = this.modalSecondarySource.asObservable();
  
  constructor() { }

  closeModal() {
    if (this.closeOnBodyClick.toLocaleLowerCase() === "true") {
      $(this.containerEl.nativeElement).modal('hide');
    }
    
  }
  cancelModal()
  {
    this.closeModal();
    this.modalClosedSource.next();
  }

  showModal(data) {
    this.modalId = data;
    $(this.containerEl.nativeElement).modal('show');

  }
  

  submit() {
    this.modalSubmittedSource.next();
    this.closeModal();
  }
  secondarySubmit() {
    this.modalSecondarySource.next();
    this.closeModal();
  }







}