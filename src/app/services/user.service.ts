import { Injectable } from '@angular/core';
import TripsModel from '../models/tripsModel';
import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  addUser(user: User) {}

  updateUser(user: User) {}

  fetchUser(userID: string) {}

  deleteUser(userID: string) {}

  getUserTrips(userID: string) {}

  addUserTrips(userID: string, trip: TripsModel) {}
}
