import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('I am guarding');

    const loggedIn = window.sessionStorage.getItem('loggedIn');
    if (loggedIn == 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
