import ItineraryItem from './itineraryItem';

export default interface TripsModel {
  name: string;
  description: string;
  currency: number;
  itinerary: ItineraryItem[];
}
