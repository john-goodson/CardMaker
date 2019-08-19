import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ClosePopoverGuardService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    $('.popover').hide();
    $('[data-toggle="popover"]').popover('hide');
    $('[data-toggle="popover"]').popover('dispose');
    return true;
  }
  constructor() { }
}
