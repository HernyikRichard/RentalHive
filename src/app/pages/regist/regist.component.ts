import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

function matchPasswords(g: FormGroup) {
  return g.get('password')!.value === g.get('confirmPassword')!.value ? null : { 'mismatch': true };
}

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})

export class RegistComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private authService: AuthService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z]{3,}")]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        ]],
        confirmPassword: ['', [Validators.required]],
      }, { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.authService.regist(this.registrationForm.get('email')?.value, this.registrationForm.get('email')?.value);
  }
}
