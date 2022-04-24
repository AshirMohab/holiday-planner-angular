import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SignInGuardGuard } from './guards/sign-in-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [SignInGuardGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SignInGuardGuard],
  },

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
