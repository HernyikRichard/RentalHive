import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('600ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('600ms ease-out', style({ opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInOut],
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  loginErrorMessage: string | null = null;

  constructor(
    public aServ: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  async login() {
    this.submitted = true;
    this.loginErrorMessage = null;

    if (this.loginForm.invalid) {
      return;
    }

    try {
      await this.aServ.login(
        this.loginForm.get("email")?.value,
        this.loginForm.get("password")?.value
      );
    } catch (error) {
      this.loginErrorMessage = "Hiba történt a bejelentkezés során. Kérjük, ellenőrizze az e-mail címét és jelszavát.";
    }
  }

  async googleLogin() {
    try {
      await this.aServ.googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }
}