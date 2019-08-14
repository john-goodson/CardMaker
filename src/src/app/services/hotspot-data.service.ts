import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class HotspotDataService {
  url: string;
  site : string;
  folder : string;
  constructor(private http:HttpClient
  ,private _configSvc: ConfigService) { 
    this.url = _configSvc.config.url
    this.site = _configSvc.config.site
    this.folder = _configSvc.config.folder
  }
  // Add the file to the file collection in the specified folder.
  public addTextFileToFolder(digest,hotspotname:string,filename:string,content:string) {

    var serverUrl = this.url;
    var serverRelativeUrlToFolder = `${this.folder}/${hotspotname}`;
    var arrayBuffer = this.stringToArrayBuffer(content);
    // Construct the endpoint.

    var fileCollectionEndpoint = `${serverUrl}/${this.site}/_api/web/getfolderbyserverrelativeurl('${serverRelativeUrlToFolder}')/files/add(overwrite=true, url='${filename}')`

    let headers = new HttpHeaders();
    headers = headers.append("accept", "application/json; odata=verbose");
    headers = headers.append("X-RequestDigest", digest);
    //headers = headers.append("content-length",arrayBuffer.byteLength.toString());
    headers = headers.append("Content-Type", "application/octet-stream")

    // Send the request and return the response.
    // This call returns the SharePoint file.
    return this.http.post(fileCollectionEndpoint, arrayBuffer, {
      headers: headers,
      withCredentials: false,
    })

  }
  public addJSONFileToFolder(digest,hotspotname:string,filename:string,content:string) {

    var serverUrl = this.url;
    var serverRelativeUrlToFolder = `${this.folder}/${hotspotname}`;
    
    // Construct the endpoint.

    var fileCollectionEndpoint = `${serverUrl}/${this.site}/_api/web/getfolderbyserverrelativeurl('${serverRelativeUrlToFolder}')/files/add(overwrite=true, url='${filename}')`

    let headers = new HttpHeaders();
    headers = headers.append("accept", "application/json; odata=verbose");
    headers = headers.append("X-RequestDigest", digest);
    //headers = headers.append("content-length",arrayBuffer.byteLength.toString());
    headers = headers.append("Content-Type", "application/json;odata=verbose")

    // Send the request and return the response.
    // This call returns the SharePoint file.
    return this.http.post(fileCollectionEndpoint, content, {
      headers: headers,
      withCredentials: false,
    })

  }
  public getFileFromFolder(digest:string,hotspotname:string,filename:string) {

    var serverUrl = this.url;
    var serverRelativeUrlToFolder = `${this.folder}/${hotspotname}`;
    // Construct the endpoint.

    var fileCollectionEndpoint = `${serverUrl}/${this.site}/_api/web/getfilebyserverrelativeurl('/${this.site}/${serverRelativeUrlToFolder}/${filename}')/$value`

    let headers = new HttpHeaders();
    headers = headers.append("accept", "application/json; odata=verbose");
    headers = headers.append("X-RequestDigest", digest);
    headers = headers.append("Content-Type", "application/octet-stream")
    // Send the request and return the response.
    // This call returns the SharePoint file.
    return this.http.get<Blob>(fileCollectionEndpoint, {
      headers: headers,
      withCredentials: false,
      responseType: 'text' as 'json'
    })

  }

  public deleteFileFromFolder(digest:string,hotspotname:string,filename:string) {

    var serverUrl = this.url;
    var serverRelativeUrlToFolder = `${this.folder}/${hotspotname}`;
    // Construct the endpoint.

    var fileCollectionEndpoint = `${serverUrl}/${this.site}/_api/web/getfilebyserverrelativeurl('/${this.site}/${serverRelativeUrlToFolder}/${filename}')`

    let headers = new HttpHeaders();
    headers = headers.append("accept", "application/json; odata=verbose");
    headers = headers.append("X-HTTP-Method", "DELETE"),
      headers = headers.append("If-Match", "*"),
      headers = headers.append("X-RequestDigest", digest);
    headers = headers.append("Content-Type", "application/json; odata=verbose")
    // Send the request and return the response.
    // This call returns the SharePoint file.
    return this.http.post(fileCollectionEndpoint, {}, {
      headers: headers,
      withCredentials: false,
    })

  }

  public getRequestDigestToken() {
    let url = `${this.url}/${this.site}/_api/contextinfo`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json;odata=verbose')

    let options = {
      headers: headers,
      withCredentials: true
    };
    return this.http.post(url, {}, options).pipe(map(x => x));
  }

  stringToArrayBuffer(str) {
    // var byteArray = new Uint8Array(str.length);
    // for (var i = 0; i < str.length; i++) {
    //   byteArray[i] = str.codePointAt(i);
    // }
    // return byteArray;
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
    // return Uint8Array.from(str)
  }
}
