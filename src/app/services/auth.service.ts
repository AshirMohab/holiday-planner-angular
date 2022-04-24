import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import User from '../models/user';
import { Router } from '@angular/router';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.reducer';
import { setCurrenctUser } from '../store/user/user.actions';

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
    private ngZone: NgZone,
    private userStore: Store<UserState>
  ) {
    this.authorize.authState.subscribe((user) => {
      if (user) {
        this.defaultUser = {
          uid: user.uid,
          emailVerified: user.emailVerified,
          email: user.email || '',
          photoURL: user.photoURL || '',
          displayName: user.displayName || '',
        };
        this.userStore.dispatch(
          setCurrenctUser({ currentUser: this.defaultUser })
        );
        localStorage.setItem('user', JSON.stringify(this.defaultUser));
        this.router.navigate(['my-trips']);
      } else {
        this.userStore.dispatch(setCurrenctUser({ currentUser: null }));

        localStorage.setItem('user', 'null');
        this.defaultUser = null;
        this.router.navigate(['login']);
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

  get isLoggedIn(): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('user')!);
    this.userStore.dispatch(setCurrenctUser({ currentUser }));
    return !!currentUser;
  }

  loginUser(email: string, password: string) {
    this.authorize
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.loginSuccess = true;
      })
      .catch((err: Error) => {
        console.error(err);
        this.loginSuccess = false;
      });
  }

  logOutUser() {
    return this.authorize.signOut().then(() => {
      this.userStore.dispatch(setCurrenctUser({ currentUser: null }));
      localStorage.removeItem('user');
    });
  }
}
