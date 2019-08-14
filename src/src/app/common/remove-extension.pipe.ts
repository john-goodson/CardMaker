import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeExtension'
})
export class RemoveExtensionPipe implements PipeTransform {

  transform(value: any): any {
    if(value)
    return value.replace(/\.[^/.]+$/, "");
    else{
      return "";
    }
  }

}
