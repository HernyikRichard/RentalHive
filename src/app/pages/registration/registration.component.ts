import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  
  registrationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService) { }


  onSubmit()
  {
    console.log(this.registrationForm.value);

    this.authService.regist(
      this.registrationForm.get('email')?.value!,
      this.registrationForm.get('password')?.value!
    ).then(
      cred => {
        console.log(cred);
      }
    ).catch (
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
