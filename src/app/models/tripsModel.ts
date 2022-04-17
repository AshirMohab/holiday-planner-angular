import ItineraryItem from './itineraryItem';

export default interface TripsModel {
  userEmail: string;
  name: string;
  description: string;
  currency: string;
  itinerary: ItineraryItem[];
}
