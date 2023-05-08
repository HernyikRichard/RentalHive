import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  
  user?: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }


}