import { Injectable, NgZone } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import User from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authorize: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {}

  registerUser(email: string, password: string) {
    this.authorize
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (!!res?.user) {
          const user: User = {
            uid: res.user.uid,
            displayName: res.user.displayName || '',
            email: res.user.email || '',
            photoURL: res.user.photoURL || '',
            emailVerified: res.user.emailVerified,
          };
          // this.createUser(user);
          this.fireStore.collection('Users').add({ ...user });
        }
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  }

  async updateUser(email: string, password: string) {
    return this.authorize
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['my-trips']);
        });
        if (!!res?.user) {
          const user: User = {
            uid: res.user.uid,

            displayName: res.user.displayName || '',
            email: res.user.email || '',
            photoURL: res.user.photoURL || '',
            emailVerified: res.user.emailVerified,
          };
          // this.createUser(user);
          this.fireStore
            .doc(`Users/${user.uid}`)
            .set({ ...user }, { merge: true });
        }
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  }

  // createUser(user: User) {
  //   const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
  //     `Users/${user.uid}`
  //   );
  //   userRef.set(Object.assign({}, user), { merge: true }).then(() => {
  //     console.log('Yes I work');
  //   });
  // }
}
