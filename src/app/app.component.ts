import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this
      .authService
      .isLoggedIn
      .subscribe(
        user => {
          this.loggedInUser = user;
          localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        }, error => {
          localStorage.setItem('user', JSON.stringify('null'));
        }
      );
  }
}
