import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  constructor(private firebase: AngularFirestore) {}

  ngOnInit(): void {}
}
