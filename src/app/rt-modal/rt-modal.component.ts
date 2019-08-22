import { Component, OnInit, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { SimpleModalComponent } from '../common/simple-modal/simple-modal.component';
import { RtEditorComponent } from '../common/rt-editor/rt-editor.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rt-modal',
  templateUrl: './rt-modal.component.html',
  styleUrls: ['./rt-modal.component.css']
})
export class RtModalComponent implements OnInit,AfterViewChecked,OnDestroy {
  ngOnDestroy(): void {
    for(var i=0;i<this.subs.length;i++)
    {
      this.subs[i].unsubscribe()
    }
  }
  hotspotname:string;
  subs:Subscription[] =[];
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
    this.subs.push(this.modalRTEditor.modalSubmitted$.subscribe(t => this.RTEditor.Save()))
    this.subs.push(this.modalRTEditor.modalSecondary$.subscribe(t => this.RTEditor.Delete()))
    this.subs.push(this.modalRTEditor.modalClosedSource$.subscribe(t => this._router.navigate([`./home/${this.hotspotname}`])))
    
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
