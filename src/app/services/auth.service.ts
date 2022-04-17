import { Injectable, NgZone } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable, of, switchMap } from 'rxjs';
import User from '../models/user';
import { Router } from '@angular/router';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { setUpUser } from '../shared/setUp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginSuccess: boolean = false;
  defaultUser!: User | null;

  constructor(
    private authorize: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private fireStore: Firestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.authorize.authState.subscribe((user) => {
      if (user) {
        this.defaultUser = {
          ...user,
          email: user.email || '',
          photoURL: user.photoURL || '',
          displayName: user.displayName || '',
        };
        localStorage.setItem('user', JSON.stringify(this.defaultUser));
      } else {
        localStorage.setItem('user', 'null');
        this.defaultUser = null;
      }
    });
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
          this.angularFireStore.collection('Users').add({ ...user });
          this.router.navigate(['/login']);
        }
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  }

  async editUserInfo(user: User, userID: string) {
    await setDoc(doc(this.fireStore, 'Users', userID), {
      name: user.displayName,
      email: user.email,
      photoURl: user.photoURL,
    });
  }

  loginSuccessful(): boolean {
    return this.loginSuccess;
  }

  // async updateUser(email: string, password: string) {
  //   return this.authorize
  //     .signInWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['my-trips']);
  //       });
  //       if (!!res?.user) {
  //         const user: User = {
  //           uid: res.user.uid,

  //           displayName: res.user.displayName || '',
  //           email: res.user.email || '',
  //           photoURL: res.user.photoURL || '',
  //           emailVerified: res.user.emailVerified,
  //         };
  //         // this.createUser(user);
  //         this.fireStore
  //           .doc(`Users/${user.uid}`)
  //           .set({ ...user }, { merge: true });
  //       }
  //     })
  //     .catch((err: Error) => {
  //       console.error(err.message);
  //     });
  // }

  get isLoggedIn(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    return !!user;
  }

  loginUser(email: string, password: string) {
    this.authorize
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['my-trips']);
          console.log('local storage: ', localStorage.getItem('user'));
        });
        this.loginSuccess = true;
      })
      .catch((err: Error) => {
        console.error(err);
        this.loginSuccess = false;
      });
  }

  logOutUser() {
    return this.authorize.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
