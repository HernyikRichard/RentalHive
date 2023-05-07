import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/interfaces/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  sideBarOpen = false;
  constructor(public authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      console.log('User data:', user);
    });
  }



  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit() {
  }

}
