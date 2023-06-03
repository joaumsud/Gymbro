export interface Events {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  isPublic: boolean;
  hasLimit: boolean;
  limitCount?: number;
  isActive: boolean;
  geocode: [number, number]
  adminId: number;
}

//Create event
export interface CreateEventDTO{
  title: string;
  description: string;
  eventDate: string;
  isPublic: boolean;
  hasLimit: boolean;
  limitCount?: number;
  geocode: [number, number];
}


//Event by id
export interface EventByIdDTO {
  event: Events
  isAdmin: boolean
  isParticipant: boolean
  participantsCount: number
  availableCount: number
}

// export interface EventById {
//   id: number;
//   title: string;
//   description: string;
//   eventDate: string;
//   isPublic: boolean;
//   hasLimit: boolean;
//   limitCount: number;
//   isActive: boolean;
//   geocode: number[];
//   adminId: number;
// }



