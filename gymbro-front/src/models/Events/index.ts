export interface Events {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  isPublic: boolean;
  hasLimit: boolean;
  limitCount: number;
  isActive: boolean;
  adminId: number;
  geocode: [number, number];
  }
