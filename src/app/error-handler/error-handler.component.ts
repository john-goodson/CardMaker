import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {

  constructor(private route:ActivatedRoute,
  private configSvc : ConfigService
  ) { }
  errorMessage : string;
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      debugger;
      let errorCode = params.errorCode;
      let filename = params.filename;
      let error = this.configSvc.config.errors.find(t=>t.errorCode == errorCode)
      this.errorMessage = error.errorMessage.replace('{{filename}}',filename)
    })
  }

}
