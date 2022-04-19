import ItineraryItem from './itineraryItem';

export default interface TripsModel {
  tripID: string;
  userID: string;
  userEmail: string;
  name: string;
  description?: string;
  currency: string;
  itinerary: ItineraryItem[];
}
