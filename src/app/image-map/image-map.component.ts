import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked, ViewChild, ElementRef, ContentChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ContentDetails, Hotspot, Markup } from '../entities';
import { ActivatedRoute, Router } from '@angular/router'

import { Observable, Subscription } from 'rxjs';
import { SimpleModalComponent } from '../common/simple-modal/simple-modal.component';
import { RtEditorToolbarComponent } from '../rt-editor-toolbar/rt-editor-toolbar.component';
import { Renderer } from '@angular/core';
import { map } from 'rxjs/operators';
import { HotspotDataService } from '../services/hotspot-data.service';
import { ConfigService } from '../services/config.service';
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
    private route: ActivatedRoute,
    private router: Router,
    private configSvc: ConfigService
    , private elementRef: ElementRef
    , private renderer: Renderer) { }
  imageDetails: ContentDetails;
  hotspotname: string;
  clickTop: any;
  clickLeft: any;
 //Subscriptions to clean up later
 sub: Subscription[]=[];

  ngOnInit() {

  }

  ngAfterViewInit() {
    let routeSub = this.route.params.subscribe(params => {
      if (!params.hotspotname) {
        //TODO: remove this code later
        this.hotspotname = "ci_cd";
      }
      else {
        this.hotspotname = params.hotspotname;
      }

      let dataSub = this.http.get(`${this.configSvc.config.url}/${this.configSvc.config.site}/${this.configSvc.config.contentFolder}/${this.hotspotname}/data.jso`).pipe(map((t: ContentDetails) => {
        this.imageDetails = t;

        for (var i = 0; i < this.imageDetails.hotspots.length; i++) {
          let hotspot = this.imageDetails.hotspots[i];
          if (hotspot.targetFilename) {
            let digestSub = this.hotspotservice.getRequestDigestToken().subscribe(digest => {
             let fileSub =  this.hotspotservice.getFileFromFolder(digest["d"].GetContextWebInformation.FormDigestValue, this.hotspotname, hotspot.targetFilename).subscribe(value => {
                hotspot.markup.body = value.toString();
                $(this.popoverToolbarEdit.nativeElement).find(".editLink").attr("href", `#edit/${this.hotspotname}/${hotspot.hotspotId}/${hotspot.targetFilename}`);
                console.log(this.popoverToolbarEdit.nativeElement.innerHTML)
                hotspot.markup.title = hotspot.targetFilename.split("_")[0];
                hotspot.markup.body = hotspot.markup.body + this.popoverToolbarEdit.nativeElement.innerHTML;
              },(error)=>{
                this.router.navigate([`error/2/${hotspot.targetFilename}`]);
              })
              this.sub.push(fileSub)
            },(error)=>{
              this.router.navigate([`error/1/data.jso`]);
            })
            
            this.sub.push(digestSub)
          }
          else {

            if (hotspot.template) {
              $(this.popoverToolbarCreate.nativeElement).find(".editLink").attr("href", `#edit/template/${this.hotspotname}/${hotspot.hotspotId}/${hotspot.template}`)
            }
            else {
              $(this.popoverToolbarCreate.nativeElement).find(".editLink").attr("href", `#edit/${this.hotspotname}/${hotspot.hotspotId}`)

            }
            hotspot.markup = { body: this.popoverToolbarCreate.nativeElement.innerHTML, title: '', footer: '' };
          }
        }
      })).subscribe(res => console.log(res))
      this.sub.push(dataSub)
    });

  }
  ngAfterViewChecked() {

    // if($(e.target).attr('data-toggle') == 'popover')
    // $('.popover').css({top:this.clickTop-119,left:this.clickLeft-68}).fadeIn();
    // });
    console.log($('[data-toggle="popover"]').attr('title'))
    $('[data-toggle="popover"]').popover({
      html: true,
    });

    //$(".closePopover").click(function() {$(this).closest(".popover").toggle();$(this).closest(".popover").remove();});
   $('[data-toggle="popover"]').each(function () {
    var button = $(this);
    button.popover().on('shown.bs.popover', function() {
        $($(button).popover().data('bs.popover').getTipElement()).find(".closePopover").on('click', function () {
            button.popover('hide');
        });
    });
});
  }
  ngOnDestroy() {
    $('.popover').hide();
    $('[data-toggle="popover"]').popover('hide');
    $('[data-toggle="popover"]').popover('dispose');
    for(var i=0;i<this.sub.length;i++)
    {
      this.sub[i].unsubscribe()
    }
  }

}
