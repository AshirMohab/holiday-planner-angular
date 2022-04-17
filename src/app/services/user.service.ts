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
    const user: User = JSON.parse(localStorage.getItem('user')!);
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

  // async getUserTrips(userID: string | null) {
  //   const tripsQuery = query(
  //     collection(this.fireStore, 'Trips'),
  //     where('userID', '==', userID)
  //   );
  //   // const tripID = this.angularFireStore.collection('Trips').doc();
  //   const tripsData = await getDocs(tripsQuery);
  //   let trips: TripsModel[] = [];
  //   tripsData.forEach((trip) => {
  //     trips.push(trip.data() as TripsModel);
  //     console.log(trip);
  //   });
  //   return trips;
  // }

  getUserTrips(): Observable<TripsModel[]> {
    const userID = this.angularFireAuth.currentUser
      .then((user) => user?.uid)
      .then((res) => res?.toString);
    const tripsCollection = this.angularFireStore.collection<TripsModel>(
      'Trips',
      (ref) => ref.where('userID', '==', userID)
    );

    const userTrips$ = tripsCollection.valueChanges();

    return userTrips$;
  }

  async editUserTrip(tripID: string, trip: TripsModel) {
    const tripEdit = this.angularFireStore.collection('Trips', (ref) =>
      ref.where('tripID', '==', tripID)
    );

    tripEdit.snapshotChanges().subscribe((res) => {
      let id = res[0].payload.doc.id;

      this.angularFireStore
        .collection('Trips')
        .doc(id)
        .update({ ...trip });
    });
    console.log('Trip has been updated');
  }

  getUserTrip(tripID: string): Observable<TripsModel[]> {
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
    const itineraryCollection = collection(this.fireStore, 'Itinerary');
    return await addDoc(itineraryCollection, itinerary);
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
      tripID: itinerary.tripID,
      name: itinerary.name,
      tag: itinerary.tag,
      startTime: itinerary.startTime,
      endTime: itinerary.endTime,
      costEstimate: itinerary.costEstimate,
      startLocationLat: itinerary.startLocationLat,
      startLocationLong: itinerary.startLocationLong,
      endLocationLat: itinerary.endLocationLat,
      endLocationLong: itinerary.endLocationLong,
      notes: itinerary.notes,
    });
  }
}
