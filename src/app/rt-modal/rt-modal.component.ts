import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { SimpleModalComponent } from '../common/simple-modal/simple-modal.component';
import { RtEditorComponent } from '../common/rt-editor/rt-editor.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rt-modal',
  templateUrl: './rt-modal.component.html',
  styleUrls: ['./rt-modal.component.css']
})
export class RtModalComponent implements OnInit,AfterViewChecked {
  hotspotname:string;
  ngAfterViewChecked(): void {
    this.EnableSave();
  }
  constructor(private _router:Router,private route: ActivatedRoute) { }
  @ViewChild('modalRTEditor') private modalRTEditor: SimpleModalComponent;
  @ViewChild('editor') private RTEditor: RtEditorComponent;
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.hotspotname = params.hotspotname;
        let filename = params.filename;
        if(!filename)
        {
          this.modalRTEditor.enableSecondary = false;
        }
    });
    this.modalRTEditor.showModal({})
    this.modalRTEditor.modalSubmitted$.subscribe(t => this.RTEditor.Save())
    this.modalRTEditor.modalSecondary$.subscribe(t => this.RTEditor.Delete())
    this.modalRTEditor.modalClosedSource$.subscribe(t => this._router.navigate([`./home/${this.hotspotname}`]))
    
  }
  UpdateValidationChanges() {
    debugger;
    this.EnableSave();
  }


  private EnableSave() {
    if (this.RTEditor.title) {
      this.modalRTEditor.enablePrimary = true;
    }
    else {
      this.modalRTEditor.enablePrimary = false;
    }
  }
}
