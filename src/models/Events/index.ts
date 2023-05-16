export interface Events {
  id: number
  title: string
  description: string
  eventDate: string
  isPublic: boolean
  hasLimit: boolean
  limitCount?: number
  isActive: boolean
  geocode: [number, number]
  adminId: number;
}

export interface EventByIdDTO {
  event: EventById
  isAdmin: boolean
  isParticipant: boolean
}

export interface EventById {
  id: number
  title: string
  description: string
  eventDate: string
  isPublic: boolean
  hasLimit: boolean
  limitCount: number
  isActive: boolean
  geocode: number[]
  adminId: number
}
