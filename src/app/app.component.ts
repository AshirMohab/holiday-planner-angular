import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserState } from './store/user/user.reducer';
import { selectCurrentUser } from './store/user/user.selectors';

export interface NavLink {
  routerLink: string;
  activeRouterLink: string;
  displayName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userLogin$: Observable<boolean>;

  navLinks: NavLink[] = [
    {
      routerLink: '/login',
      activeRouterLink: 'active',
      displayName: 'Login',
    },
    {
      routerLink: '/register',
      activeRouterLink: 'active',
      displayName: 'Register',
    },
    {
      routerLink: '/my-trips',
      activeRouterLink: 'active',
      displayName: 'My Trips',
    },
  ];

  identifyLinks(index: number, navLink: NavLink) {
    return navLink.routerLink;
  }

  constructor(
    public authorise: AuthService,
    private userStore: Store<UserState>
  ) {
    this.userLogin$ = userStore.pipe(
      select(selectCurrentUser),
      map((user) => !!user?.uid)
    );
  }

  signOut() {
    this.authorise.logOutUser();
  }
}
