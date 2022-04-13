import { Injectable, NgZone } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable, of, switchMap } from 'rxjs';
import User from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users$: Observable<User | null | undefined>;

  constructor(
    private authorize: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.users$ = this.authorize.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fireStore.doc<User>(`Users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  registerUser(email: string, password: string, name: string) {
    this.authorize
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (!!res?.user) {
          const user: User = {
            uid: res.user.uid,
            displayName: name || '',
            email: res.user.email || '',
            photoURL: res.user.photoURL || '',
            emailVerified: res.user.emailVerified,
          };
          // this.createUser(user);
          this.fireStore.collection('Users').add({ ...user });
          this.router.navigate(['/login']);
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

  loginUser(email: string, password: string) {
    this.authorize
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['my-trips']);
        });
        console.log('User hass been loggeed in:', email);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  logOutUser() {
    this.authorize.signOut();
    this.router.navigate(['/home']);
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
