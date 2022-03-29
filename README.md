# Requirements & Checklist

## Brief

- I need a way to securely store my plans online so I can access them any time on any device.
- I need to be able to see the currency conversion of my choice [Currency API](https://api.currencyapi.com/v3/latest).
- I need to be able to add new, edit existing, and delete any of my itinerary items and to see a calendar of my entire trip.
- I need to be able to tag itinerary items as either travel or destination events.
- I'd like to be able to install this as an app, but it's not necessary as I plan to buy a SIM card when I get to my destination.

### Info I'll need per itinerary item:

- [ ] Name
- [ ] Tag
- [ ] Start time
- [ ] End time
- [ ] Cost estimate (and it's conversion to ZAR)
- [ ] (Optional) Start location (lat, lon)
- [ ] (Optional) End location (lat, lon)
- [ ] (Optional) Notes

## Backend

- [ ] Firebase (or other similarly functional backend)
- [ ] Sign up/Log in (Auth)
- [ ] Tables/Documents (Full CRUD support):
  - [ ] Users
  - [ ] Trips
  - [ ] Itinerary Item

## Angular

- [ ] Container & Presentational components
- [ ] Pipe(s)
- [ ] Evaluated attributes
- [ ] Proper management of lists i.e. trackBy
- [ ] Form handling
- [ ] Only absolutely necessary and cleaned up observable$ subscriptions (if any)
- [ ] Event handling
- [ ] State management - NgRx Store
  - [ ] Actions, Reducers, Selectors
  - [ ] Effects
- [ ] Routing:
  - [ ] Clean routing
  - [ ] Route guards
  - [ ] **Routes:**
    - [ ] Login
    - [ ] MyTrips
    - [ ] Trip/:id
    - [ ] Trip/:id/event/:eventId
    - Only the login route can be unprotected, the rest can be modularised and lazy loaded
- [ ] Network calls
  - [ ] Full CRUD capabilities
  - [ ] Proper use of the httpClient (rtfm)

### Component library options

- ant-design
- material

## Accessibility

- [ ] 100% on lighthouse

## UI Design

- [ ] Colour
- [ ] Contrast > 3.5 ratio
- [ ] Visual Hierarchy
- [ ] Whitespace
- [ ] Consistency
- [ ] Scale
- [ ] User Feedback
- [ ] Responsiveness - the expectation is fully responsive

## Bonuses **Only touch after everything else has been checked**

- [ ] PWA
- [ ] Cool Selectors
- [ ] Flexing your RxJS knowledge
- [ ] Extra mile stuff anywhere
- [ ] Animations
- [ ] Excellent design
- [ ] Full offline support
- [ ] Map/Timeline or using the map to add locations to itinerary items
- [ ] Lazy loading

# HolidayPlannerAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
