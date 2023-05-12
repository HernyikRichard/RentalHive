import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';
import { OptionalUser } from '../interfaces/OptionalUser';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }

  async changePassword(newPassword: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.updatePassword(newPassword);
    }
  }

  async googleSignIn(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    await this.updateUserData(credential.user);
    await this.router.navigate(['/']);
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    await this.router.navigate(['/login']);
  }

  async register(email: string, password: string, displayName: string, photoURL: string, role: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.updateUserData(credential.user, { displayName, photoURL, role });
      await this.router.navigate(['/home']);
    } catch (error) {
      throw new Error('Hiba történt a regisztráció során');
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.router.navigate(['/home']);
    } catch (error) {
      throw new Error('Hiba történt a Bejelentkezés során');
    }
  }

  getUserById(userId: string): Observable<User | undefined> {
    return this.afs.doc<User>(`users/${userId}`).valueChanges();
  }

  async updateUser(uid: string, updates: Partial<User>): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    await userRef.update(updates);
  }

  public async getUser(): Promise<User | null | undefined> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userData = await this.afs.doc<User>(`users/${user.uid}`).get().toPromise();
      return userData!.data() as User;
    } else {
      return null;
    }
  }

  public updateUserData(user: firebase.User | null, customData?: OptionalUser): Promise<void> {
    
    if (user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data: OptionalUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
  
      if (customData) {
        Object.assign(data, customData);
      }
  
      return userRef.set(data as User, { merge: true });
    } else {
      return Promise.resolve();
    }
  }

}