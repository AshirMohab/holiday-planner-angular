import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { TripComponent } from './components/my-trips/list-of-trips/trip/trip.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SignInGuardGuard } from './guards/sign-in-guard.guard';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { EditTripsComponent } from './components/my-trips/edit-trips/edit-trips.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [SignInGuardGuard] },
  { path: 'register', component: RegisterComponent },
  // {
  //   path: 'my-trips',
  //   component: MyTripsComponent,
  // },
  { path: 'itineraries', component: ItineraryComponent },
  {
    path: 'my-trips',
    loadChildren: () => import('./lazy/lazy.module').then((m) => m.LazyModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
