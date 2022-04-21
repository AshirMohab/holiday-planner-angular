import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY, from, map, mergeMap, Observable, retry } from 'rxjs';
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
        if (uid) {
          return from(
            this.angularFireStore.collection<TripsModel>('Trips').add({
              ...newTrip,
              userID: uid,
              tripID: this.angularFireStore.createId(),
            })
          );
        }
        return EMPTY;
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

  getTripId(trip: TripsModel) {
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

  updateTripById(trip: TripsModel, id: string) {
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

  editUserTrip(trip: TripsModel) {
    const tripEdit = this.angularFireStore.collection('Trips', (ref) =>
      ref.where('tripID', '==', trip.tripID)
    );

    tripEdit
      .snapshotChanges()
      .subscribe((res) => {
        if (!!res) {
          let id = res[0].payload.doc.id;

          this.angularFireStore
            .collection('Trips')
            .doc(id)
            .update({ ...trip });
        }
      })
      .unsubscribe();
    return tripEdit.valueChanges();
  }

  async removeUserTrip(tripID: string) {
    await deleteDoc(doc(this.fireStore, 'Trips', tripID));
    this.notificationService.success('User has been removed', 'true');
  }

  async addTripItinerary(itinerary: ItineraryItem) {
    this.angularFireStore.collection('Itinerary').add({
      ...itinerary,
      tripID: this.angularFireStore.createId(),
    });
  }

  async editItinerary(itinerary: ItineraryItem, itineraryID: string) {
    await setDoc(doc(this.fireStore, 'Itinerary', itineraryID), {
      name: itinerary.name,
      tag: itinerary.tag,
      startDate: itinerary.startDate,
      endDate: itinerary.endDate,
      costEstimate: itinerary.costEstimate,
      startLocationLat: itinerary.startLocationLat,
      startLocationLong: itinerary.startLocationLong,
      endLocationLat: itinerary.endLocationLat,
      endLocationLong: itinerary.endLocationLong,
      notes: itinerary.notes,
    });
  }
}
