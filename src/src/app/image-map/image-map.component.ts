import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked, ViewChild, ElementRef, ContentChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ImageDetails, Hotspot, Markup } from '../entities';
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs';
import { SimpleModalComponent } from '../common/simple-modal/simple-modal.component';
import { RtEditorToolbarComponent } from '../rt-editor-toolbar/rt-editor-toolbar.component';
import { Renderer } from '@angular/core';
import { map } from 'rxjs/operators';
import { HotspotDataService } from '../services/hotspot-data.service';
declare var $: any;
@Component({
  selector: 'app-image-map',
  templateUrl: './image-map.component.html',
  styleUrls: ['./image-map.component.css']
})
export class ImageMapComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  @ViewChild('popoverToolbarCreate') private popoverToolbarCreate: ElementRef;
  @ViewChild('popoverToolbarEdit') private popoverToolbarEdit: ElementRef;
  constructor(private http: HttpClient,
    private hotspotservice: HotspotDataService,
    private route: ActivatedRoute
    , private elementRef: ElementRef
    , private renderer: Renderer) { }
  imageDetails: ImageDetails;
  hotspotname: string;
  clickTop : any;
  clickLeft : any;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      if (!params.hotspotname) {
        //TODO: remove this code later
        this.hotspotname = "hotspot1";
      }
      else {
        this.hotspotname = params.hotspotname;
      }
      
      this.http.get(`assets/data/${this.hotspotname}/data.jso`).pipe(map((t: ImageDetails) => {
        this.imageDetails = t;

        for (var i = 0; i < this.imageDetails.hotspots.length; i++) {
          let hotspot = this.imageDetails.hotspots[i];
          if (hotspot.filename) {
            this.hotspotservice.getRequestDigestToken().subscribe(digest => {
              this.hotspotservice.getFileFromFolder(digest["d"].GetContextWebInformation.FormDigestValue,this.hotspotname, hotspot.filename).subscribe(value => {
                hotspot.markup.body = value.toString();
                $(this.popoverToolbarEdit.nativeElement).find(".editLink").attr("href", `#edit/${this.hotspotname}/${hotspot.hotspotId}/${hotspot.filename}`);
                console.log(this.popoverToolbarEdit.nativeElement.innerHTML)
                hotspot.markup.body = hotspot.markup.body + this.popoverToolbarEdit.nativeElement.innerHTML;
              })
            })

          }
          else {
            
            if(hotspot.template)
            {
              $(this.popoverToolbarCreate.nativeElement).find(".editLink").attr("href", `./#edit/template/${this.hotspotname}/${hotspot.hotspotId}/${hotspot.template}`)
            }
            else
            {
              $(this.popoverToolbarCreate.nativeElement).find(".editLink").attr("href", `./#edit/${this.hotspotname}/${hotspot.hotspotId}`)
              
            }
            hotspot.markup = { body: this.popoverToolbarCreate.nativeElement.innerHTML, title: '', footer: '' };
          }
        }
      })).subscribe(res => console.log(res))

    });

  }
  ngAfterViewChecked() {
   
      // if($(e.target).attr('data-toggle') == 'popover')
      // $('.popover').css({top:this.clickTop-119,left:this.clickLeft-68}).fadeIn();
      // });
  
    $('[data-toggle="popover"]').popover({
      html : true,
      placement: 'bottom',
      sanitize: false,
      sanitizeFn: content => content
})



    //hack to close bootstrap popover when clcked outsde of it
    // $('body').on('click', function (e) {
    //   //did not click a popover toggle, or icon in popover toggle, or popover
    //   if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('[data-toggle="popover"]').length === 0
    //       && $(e.target).parents('.popover.in').length === 0) {
    //       (($('[data-toggle="popover"]').popover('hide').data('bs.popover') || {}).inState || {}).click = false;
    //   }
    //   });

  }
  ngOnDestroy() {
    $('.popover').hide();
    $('[data-toggle="popover"]').popover('hide');
    $('[data-toggle="popover"]').popover('dispose');
  }
  
}
