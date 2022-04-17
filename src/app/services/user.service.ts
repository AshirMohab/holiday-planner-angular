import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import TripsModel from '../models/tripsModel';
import User from '../models/user';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import ItineraryItem from '../models/itineraryItem';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fireStore: Firestore,
    private angularFireStore: AngularFirestore,
    private notificationService: NzNotificationService
  ) {}

  async addUserTrip(trip: TripsModel) {
    const tripCollection = collection(this.fireStore, 'Trips');
    return await addDoc(tripCollection, { ...trip });
  }

  async deleteUser(userID: string) {
    await deleteDoc(doc(this.fireStore, 'Users', userID));
    this.notificationService.success('User has been removed', 'true');
  }

  async getUserTrips(userEmail: string | null) {
    const tripsQuery = query(
      collection(this.fireStore, 'Trips'),
      where('userEmail', '==', userEmail)
    );
    // const tripID = this.angularFireStore.collection('Trips').doc();
    const tripsData = await getDocs(tripsQuery);
    let trips: TripsModel[] = [];
    tripsData.forEach((trip) => {
      trips.push(trip.data() as TripsModel);
    });
    return trips;
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
