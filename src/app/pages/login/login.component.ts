import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component(
  {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  }
)

export class LoginComponent implements OnInit {

   loginForm!: FormGroup;
   submitted = false;

  constructor(
    public aServ: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  async login(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    try {
      await this.aServ.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    } catch (error) {
      console.error('Error during login:', error);
    }
    
  }
  

}

