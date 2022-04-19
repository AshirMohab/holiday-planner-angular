import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

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

  constructor(public authorise: AuthService) {}

  signOut() {
    this.authorise.logOutUser();
  }
}
