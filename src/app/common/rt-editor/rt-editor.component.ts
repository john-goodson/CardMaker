import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import { HotspotDataService } from '../../services/hotspot-data.service';
import { map } from 'rxjs/operators';
import { ContentDetails, Hotspot } from '../../entities';
declare var CKEDITOR: any;
@Component({
  selector: 'rt-editor',
  templateUrl: './rt-editor.component.html',
  styleUrls: ['./rt-editor.component.css']
})
export class RtEditorComponent implements OnInit {
 
  
  editorValue: string;
  @Input() title: string = "";
  @Input() filenameGuid: string = "";
  @Input() hotspotname: string;
  @Input() hotspotid: string;
  filename:string = "";
  createMode: boolean = false;
  filenameUnchanged: string;
  titleUnChanged : string;
  templatefile: string
  @Output() filenameChange = new EventEmitter();
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private hotspotservice: HotspotDataService,
    private router: Router
  ) {

  }

  fileNameChangedChanged() { 
    this.filenameChange.emit(this.title);
}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hotspotname = params.hotspotname
      this.filename = params.filename && params.filename.replace(/\.[^/.]+$/, "")
      
      this.templatefile = params.templatefile
      this.hotspotid = params.hotspotid;
      if (this.filename) {
        this.title = this.filename.split('_')[0];
        this.titleUnChanged =  this.title;
        this.filenameGuid = this.filename.split('_')[1];
        this.filenameUnchanged = this.filename
        this.getFile(this.filename && (this.filename + ".html"))
      }
      else {
        if (this.templatefile) {
          this.getFile(this.templatefile)
        }
        this.createMode = true;
      }
    });
  }

  Save() 
  {
    //if title changed during update mode , we need to update the filename like in create mode
    let titleChanged :Boolean = false;
    if(this.titleUnChanged && this.titleUnChanged.toLowerCase() != this.title.toLowerCase())
    {
      titleChanged = true;
    }
     if(!this.filenameGuid || titleChanged)
     this.filenameGuid = this.newGuid();
     this.filename = this.title +  "_"  + this.filenameGuid
      this.hotspotservice.getRequestDigestToken().subscribe(digest => {
        debugger;
        this.hotspotservice.addTextFileToFolder(digest["d"].GetContextWebInformation.FormDigestValue,
          this.hotspotname, this.filename && (this.filename + ".html"), this.editorValue).subscribe(x => {
            debugger;
            //If it is create mode then update back the new filename in the folder {hotspot}/data.json
            if (this.createMode || titleChanged) {
              this.UpdateDataJsonFileWthFileName(this.filename);
            }
            else {
              this.router.navigate([`/home/${this.hotspotname}`])
            }
          })
      })
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString(16);
    });
  } 

  private UpdateDataJsonFileWthFileName(filename) {
    this.http.get(`assets/data/${this.hotspotname}/data.jso`).pipe(map((imageDetails: ContentDetails) => {
      let hotspot: Hotspot = imageDetails.hotspots.find(h => h.hotspotId == this.hotspotid);
      hotspot.targetFilename = filename && (filename + ".html");
      this.hotspotservice.getRequestDigestToken().subscribe(digest => {
        this.hotspotservice.addJSONFileToFolder(digest["d"].GetContextWebInformation.FormDigestValue, this.hotspotname, "data.jso", JSON.stringify(imageDetails)).subscribe(() => {
          this.router.navigate([`/home/${this.hotspotname}`]);
        });
      });
    })).subscribe();
  }

  Delete() {
    if (this.filenameUnchanged) {
      this.hotspotservice.getRequestDigestToken().subscribe(digest => {
        this.hotspotservice.deleteFileFromFolder(digest["d"].GetContextWebInformation.FormDigestValue,
          this.hotspotname, this.filenameUnchanged && this.filenameUnchanged + ".html"
        ).subscribe(x => {
          this.UpdateDataJsonFileWthFileName("")
        })
      })
    }
  }

  getFile(filename: string) {
    this.hotspotservice.getRequestDigestToken().subscribe(digest => {
      this.hotspotservice.getFileFromFolder(digest["d"].GetContextWebInformation.FormDigestValue
        , this.hotspotname, filename
      ).subscribe(value => {
        debugger;
        this.editorValue = value.toString()
      })
    })
  }

  onChange($event) {
    debugger;
    this.editorValue =$event.editor.getData();// CKEDITOR.currentInstance.getData(); 
  }
}

