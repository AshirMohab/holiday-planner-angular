import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
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

  getUserTrips(): Observable<TripsModel[]> {
    const tripsCollection = this.angularFireStore.collection<TripsModel>(
      'Trips'
      // (ref) => ref.where('uid', '==', userID)
    );

    const userTrips$ = tripsCollection.valueChanges();

    return userTrips$;
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

    tripEdit.snapshotChanges().subscribe((res) => {
      if (!!res) {
        let id = res[0].payload.doc.id;

        this.angularFireStore
          .collection('Trips')
          .doc(id)
          .update({ ...trip });
      }
    });
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
