export type Schedule = {
  id: number;
  userId: number;
  scheduleType: string;
  departureName?: string | null;
  destinationName?: string | null;
  departureLat: number;
  departureLng: number;
  destinationLat: number;
  destinationLng: number;
  departureTime: Date;
  arrivalTime: Date;
  schedulePattern?: boolean[] | null;
  schedulePreference?: string[] | null;
};

export type PaginatedSchedulesResponse = {
  schedules: Schedule[];
  nextCursor?: number | null;
};

export type FetchUserSchedulesParams = {
  pageParam?: number;
};
