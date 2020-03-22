// This is the authentication guard to stop users getting to pages they shouldn't

import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationSectionService} from './authenticationSection.service';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationSectionGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationSectionService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.authenticationService.user.pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['/authenticationSection']);
      }));
  }
}
