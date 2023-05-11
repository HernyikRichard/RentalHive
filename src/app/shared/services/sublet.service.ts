import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Sublet } from '../interfaces/Sublet';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubletService {

  private subletCollection: AngularFirestoreCollection<Sublet>;
  sublets$: Observable<Sublet[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.subletCollection = this.afs.collection<Sublet>('sublets');
    this.sublets$ = this.subletCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Sublet;
          const { id, ...rest } = data;
          return { id: a.payload.doc.id, ...rest };
        })
      ) 
    );
  }

  getSublets(): Observable<Sublet[]> {
    return this.sublets$;
  }

  async addSublet(sublet: Sublet): Promise<void> {
    const docRef = await this.subletCollection.add(sublet);
    await docRef.update({id: docRef.id});
  }

  updateSublet(subletId: string, updates: Partial<Sublet>): Promise<void> {
    return this.subletCollection.doc(subletId).update(updates);
  }

  deleteSublet(subletId: string): Promise<void> {
    return this.subletCollection.doc(subletId).delete();
  }

  getSublet(id: string): Observable<Sublet> {
    return this.afs.collection('sublets').doc<Sublet>(id).valueChanges().pipe(
      map(sublet => {
        if (sublet) {
          return sublet;
        } else {
          throw new Error('Sublet not found');
        }
      }),
      catchError(err => throwError(err))
    );
  }

  async addSubletWithUserId(sublet: Sublet): Promise<void> {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      sublet.userId = currentUser.uid;
      await this.addSublet(sublet);
    }
  }


}