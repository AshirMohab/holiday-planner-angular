import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY, from, map, mergeMap, Observable } from 'rxjs';
import ItineraryItem from '../models/itineraryItem';
import TripsModel from '../models/tripsModel';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(
    private angularFireStore: AngularFirestore,
    private fireStore: Firestore,
    private angularFireAuth: AngularFireAuth,
    private notificationService: NzNotificationService
  ) {}

  addUserTrip(newTrip: TripsModel): Observable<DocumentReference<TripsModel>> {
    return from(
      this.angularFireAuth.currentUser.then((currentUser) => currentUser?.uid)
    ).pipe(
      mergeMap((uid) => {
        if (!uid) return EMPTY;
        return from(
          this.angularFireStore.collection<TripsModel>('Trips').add({
            ...newTrip,
            userID: uid,
            tripID: this.angularFireStore.createId(),
          })
        );
      })
    );
  }

  getUserTrips(userID: string): Observable<TripsModel[]> {
    if (!userID) {
      return EMPTY;
    }
    return this.angularFireStore
      .collection<TripsModel>('Trips', (ref) =>
        ref.where('userID', '==', userID)
      )
      .valueChanges();
  }

  getTripId(trip: TripsModel): Observable<string | null> {
    //Gets the ID of the trip document

    return this.angularFireStore
      .collection<TripsModel>('Trips', (ref) =>
        ref.where('tripID', '==', trip.tripID).limit(1)
      )
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<TripsModel>[]) => {
          if (actions.length === 0) return null;
          return actions[0].payload.doc.id;
        })
      );
  }

  updateTripById(trip: TripsModel, id: string): Observable<void> {
    if (id?.length === 0) return EMPTY;
    return from(
      this.angularFireStore
        .collection('Trips')
        .doc(id)
        .update({ ...trip })
    );
  }

  getTripItinerary(tripID: string): Observable<ItineraryItem[]> {
    const itineraryCollection = this.angularFireStore.collection<ItineraryItem>(
      'Itinerary',
      (ref) => ref.where('tripID', '==', tripID)
    );

    return itineraryCollection.valueChanges();
  }

  removeUserTrip(tripID: string): Observable<void> {
    if (tripID?.length === 0) return EMPTY;
    return from(this.angularFireStore.collection('Trips').doc(tripID).delete());
  }
}
