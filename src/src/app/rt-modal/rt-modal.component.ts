import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { SimpleModalComponent } from '../common/simple-modal/simple-modal.component';
import { RtEditorComponent } from '../common/rt-editor/rt-editor.component';

@Component({
  selector: 'rt-modal',
  templateUrl: './rt-modal.component.html',
  styleUrls: ['./rt-modal.component.css']
})
export class RtModalComponent implements OnInit,AfterViewChecked {

  ngAfterViewChecked(): void {
    this.EnableSave();
  }
  constructor() { }
  @ViewChild('modalRTEditor') private modalRTEditor: SimpleModalComponent;
  @ViewChild('editor') private RTEditor: RtEditorComponent;
  ngOnInit() {
    this.modalRTEditor.showModal({})
    this.modalRTEditor.modalSubmitted$.subscribe(t => this.RTEditor.Save())
    this.modalRTEditor.modalSecondary$.subscribe(t => this.RTEditor.Delete())
  }
  UpdateValidationChanges() {
    debugger;
    this.EnableSave();
  }


  private EnableSave() {
    if (this.RTEditor.filename) {
      this.modalRTEditor.enablePrimary = true;
    }
    else {
      this.modalRTEditor.enablePrimary = false;
    }
  }
}
