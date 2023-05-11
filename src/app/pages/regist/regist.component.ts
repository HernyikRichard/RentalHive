import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../shared/interfaces/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})

export class RegistComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    private authService: AuthService, 
    private formbuilder: FormBuilder
    ) { }

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
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;
    const displayName = this.registrationForm.value.firstName+' '+this.registrationForm.value.lastName; 
    const photoURL = "https://firebasestorage.googleapis.com/v0/b/rentalhive-szakdolgozat-2023.appspot.com/o/profile-pictures%2F2zdiES73lOaCvLHbvdN8yuR3bjr1%2Fimage.png?alt=media&token=21e61d13-5e6e-4591-b05b-6b97c4d7a941";  
    const role = "user";  
  
    this.authService.register(email, password, displayName, photoURL, role)
      .then(() => {
        console.log('ok');
      })
      .catch(error => {
        console.error("Hiba történt a regisztráció során", error);
      });
  }
}
