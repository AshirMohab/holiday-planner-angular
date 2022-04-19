import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { TripComponent } from './components/my-trips/list-of-trips/trip/trip.component';
import { UserComponent } from './components/user/user.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromTrip from './store/trip/trip.reducer';
import { TripEffects } from './store/trip/trip.effects';
import { EditDetailsComponent } from './components/user/edit-details/edit-details.component';
import { AddTripsComponent } from './components/my-trips/add-trips/add-trips.component';
import { ListOfTripsComponent } from './components/my-trips/list-of-trips/list-of-trips.component';
import { TripPipePipe } from './pipes/trip-pipe.pipe';
import { ItineraryPipePipe } from './pipes/itinerary-pipe.pipe';
import { EditTripsComponent } from './components/my-trips/edit-trips/edit-trips.component';
import { CalanderComponent } from './components/itinerary/calander/calander.component';
import { MyItinerariesComponent } from './components/itinerary/my-itineraries/my-itineraries.component';
import { AddItineraryComponent } from './components/itinerary/add-itinerary/add-itinerary.component';
import * as fromItinerary from './store/itinerary/itinerary.reducer';
import { ItineraryEffects } from './store/itinerary/itinerary.effects';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    LoginComponent,
    RegisterComponent,
    MyTripsComponent,
    TripComponent,
    UserComponent,
    ItineraryComponent,
    NotFoundComponent,
    EditDetailsComponent,
    AddTripsComponent,
    ListOfTripsComponent,
    TripPipePipe,
    ItineraryPipePipe,
    EditTripsComponent,
    CalanderComponent,
    MyItinerariesComponent,
    AddItineraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forFeature([TripEffects, ItineraryEffects]),
    StoreModule.forFeature(fromTrip.tripFeatureKey, fromTrip.reducer),
    StoreModule.forFeature(fromItinerary.itineraryFeatureKey, fromItinerary.reducer),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
