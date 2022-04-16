import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { TripComponent } from './components/my-trips/trip/trip.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  { path: 'home', component: ComponentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'my-trips',
    component: MyTripsComponent,
    children: [{ path: ':id', component: TripComponent }],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
