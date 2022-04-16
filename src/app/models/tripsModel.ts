import ItineraryItem from './itineraryItem';

export default interface TripsModel {
  userID: string;
  name: string;
  description: string;
  currency: number;
  itinerary: ItineraryItem[];
}
