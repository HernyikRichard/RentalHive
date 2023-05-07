import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      filter((user): user is User => user !== null && user !== undefined),
      map((user: User) => {
        if (user.role === 'admin' || user.role === 'user') {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }

}