import { Injectable,APP_INITIALIZER } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../entities';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config:Config;
  constructor(private http:HttpClient) { }
  ReadConfig()
  {
    return new Promise((resolve, reject) => {
     return this.http.get("assets/configuration/config.jso").subscribe(t=>{
      // console.log("configuration map= " + JSON.stringify(t.json()))
        // this.config = t.json() as Config
        this.config = t as Config;
        resolve(true);
      })
      
    })
  }
  }


