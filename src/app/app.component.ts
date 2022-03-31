import { Component } from '@angular/core';

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
      routerLink: '/home',
      activeRouterLink: 'active',
      displayName: 'Home',
    },
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
    {
      routerLink: '/**',
      activeRouterLink: 'active',
      displayName: 'Not Found',
    },
  ];

  identifyLinks(index: number, navLink: NavLink) {
    return navLink.routerLink;
  }
}
