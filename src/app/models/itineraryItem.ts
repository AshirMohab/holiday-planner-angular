export default interface ItineraryItem {
  name: string;
  tag: string;
  startTime: Date;
  endTime: Date;
  costEstimate: number;
  startLocationLat: string | null;
  startLocationLong: string | null;
  endLocationLat: string | null;
  endLocationLong: string | null;
  notes: string | null;
}
