import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItinerariesComponent } from './my-itineraries.component';

describe('MyItinerariesComponent', () => {
  let component: MyItinerariesComponent;
  let fixture: ComponentFixture<MyItinerariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyItinerariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyItinerariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
