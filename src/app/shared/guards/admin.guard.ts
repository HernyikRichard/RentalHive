import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { User } from '../interfaces/User';
import { AuthService } from '../services/auth.service';

@Injectable({  providedIn: 'root' })
export class AdminAuthGuard  {
  constructor (
      private authService: AuthService,
      private router: Router
    ){}
  
  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      filter((user): user is User => user !== null && user !== undefined),
      map((user: User) => {
        if (user.role === 'admin') {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
}
