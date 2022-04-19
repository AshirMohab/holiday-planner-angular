import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import TripsModel from '../models/tripsModel';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  async deleteUser(userID: string) {
    await deleteDoc(doc(this.fireStore, 'Users', userID));
    this.notificationService.success('User has been removed', 'true');
  }
}
