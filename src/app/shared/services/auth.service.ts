import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private fAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.fAuth.signInWithEmailAndPassword(email, password);
  }

  regist(email: string, password: string) {
    return this.fAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fAuth.signOut();
  }

  get isLoggedIn() {
    return this.fAuth.user;
  }


}
