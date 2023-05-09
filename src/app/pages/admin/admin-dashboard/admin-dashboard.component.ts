import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../shared/services/admin.service'
import { User } from '../../../shared/interfaces/User';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})

export class AdminDashboardComponent implements OnInit {
  
  users: User[] = [];
  displayedColumns: string[] = ['displayName', 'email', 'photoURL', 'actions'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}