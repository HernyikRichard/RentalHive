import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { User } from '../interfaces/User';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LandlordGuard implements CanActivate {
  constructor (
    private authService: AuthService,
    private router: Router
  ){}
  
  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      filter((user): user is User => user !== null && user !== undefined),
      map((user: User) => {
        if (user.role === 'admin' || user.role === 'landlord') {
          return true;
        } else {
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  }
  
}
