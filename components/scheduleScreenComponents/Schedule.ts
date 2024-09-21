export type Schedule = {
  id: number;
  scheduleType: string;
  departureName: string;
  destinationName: string;
  departureLat: number;
  departureLng: number;
  destinationLat: number;
  destinationLng: number;
  departureTime: Date;
  arrivalTime: Date;
  schedulePattern: boolean[];
};

export type PaginatedSchedulesResponse = {
  schedules: Schedule[];
  nextCursor?: number | null;
};

export type FetchUserSchedulesParams = {
  pageParam?: number;
};
