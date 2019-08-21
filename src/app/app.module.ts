import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageMapComponent } from './image-map/image-map.component';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule} from '@angular/router';
import { ModalDirective } from './modal.directive';
import { SimpleModalComponent } from './common/simple-modal/simple-modal.component';
import { RtEditorComponent } from './common/rt-editor/rt-editor.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { RtEditorToolbarComponent } from './rt-editor-toolbar/rt-editor-toolbar.component';
import { RtModalComponent } from './rt-modal/rt-modal.component';
import { FormsModule }   from '@angular/forms';
import { RemoveExtensionPipe } from './common/remove-extension.pipe';
import { ConfigService } from './services/config.service';
import { ClosePopoverGuardService } from './services/close-popover-guard.service';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';

//let jQuery : Object;// Add this function
export function initConfig(configSvc: ConfigService) {
  return () => configSvc.ReadConfig()
}

@NgModule({
  declarations: [
    AppComponent,
    ImageMapComponent,
    ModalDirective,
    SimpleModalComponent,
    RtEditorComponent,
    RtEditorToolbarComponent,
    RtModalComponent,
    RemoveExtensionPipe,
    ErrorHandlerComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    RouterModule.forRoot([
      { path:"home/:hotspotname",component:ImageMapComponent,canActivate:[ClosePopoverGuardService]},
      { path:"home",component:ImageMapComponent,canActivate:[ClosePopoverGuardService]},
      {path:"edit/template/:hotspotname/:hotspotid/:templatefile",component:RtModalComponent,canActivate:[ClosePopoverGuardService]},
      {path:"edit/:hotspotname/:hotspotid/:filename",component:RtModalComponent,canActivate:[ClosePopoverGuardService]},
      {path:"edit/:hotspotname/:hotspotid",component:RtModalComponent,canActivate:[ClosePopoverGuardService]},
      { path:"error/:errorCode/:filename",component:ErrorHandlerComponent},
      {path:"",pathMatch:'full',redirectTo:'home'}
    ],{enableTracing:true,useHash:true})
  ],
  providers: [ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig, // And use it here
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
