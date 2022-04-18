import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import TripsModel from '../models/tripsModel';
import User from '../models/user';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import ItineraryItem from '../models/itineraryItem';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private angularFireStore: AngularFirestore,
    private fireStore: Firestore,
    private angularFireAuth: AngularFireAuth,
    private notificationService: NzNotificationService
  ) {}

  async addUserTrip(trip: TripsModel) {
    this.angularFireStore
      .collection('Trips')
      .add({
        ...trip,
        userID: await this.angularFireAuth.currentUser.then(
          (user) => user?.uid
        ),
        tripID: this.angularFireStore.createId(),
      })
      .then(() => console.log('Trip added'));
  }

  async deleteUser(userID: string) {
    await deleteDoc(doc(this.fireStore, 'Users', userID));
    this.notificationService.success('User has been removed', 'true');
  }

  getUserTrips(): Observable<TripsModel[]> {
    const userID = this.angularFireAuth.currentUser
      .then((user) => user?.uid)
      .then((res) => res?.toString);
    console.log(userID);
    const tripsCollection = this.angularFireStore.collection<TripsModel>(
      'Trips'
      // (ref) => ref.where('uid', '==', userID)
    );

    const userTrips$ = tripsCollection.valueChanges();

    return userTrips$;
  }

  async editUserTrip(tripID: string, trip: TripsModel) {
    const tripEdit = this.angularFireStore.collection('Trips', (ref) =>
      ref.where('tripID', '==', tripID)
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
    console.log('Trip has been updated');
  }

  getSingleUserTrip(tripID: string): Observable<TripsModel[]> {
    const userID = this.angularFireAuth.currentUser
      .then((user) => user?.uid)
      .then((res) => res?.toString);
    const tripsCollection = this.angularFireStore.collection<TripsModel>(
      'Trips',
      (ref) => ref.where('tripID', '==', tripID)
    );

    const userTrip$ = tripsCollection.valueChanges();

    return userTrip$;
  }

  async removeUserTrip(tripID: string) {
    await deleteDoc(doc(this.fireStore, 'Trips', tripID));
    this.notificationService.success('User has been removed', 'true');
  }

  async addTripItinerary(itinerary: ItineraryItem) {
    this.angularFireStore
      .collection('Itinerary')
      .add({
        ...itinerary,
        tripID: this.angularFireStore.createId(),
      })
      .then(() => console.log('Itinerary item added'));
  }

  async getTripItinerary(tripID: string) {
    const itineraryQuery = query(
      collection(this.fireStore, 'Itinerary'),
      where('tripID', '==', tripID)
    );
    const itineraryData = await getDocs(itineraryQuery);
    return itineraryData;
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
