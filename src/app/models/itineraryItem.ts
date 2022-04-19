export default interface ItineraryItem {
  name: string;
  tag: string;
  startDate: Date;
  endDate: Date;
  costEstimate: number;
  startLocationLat?: string | null;
  startLocationLong?: string | null;
  endLocationLat?: string | null;
  endLocationLong?: string | null;
  notes?: string | null;
}
