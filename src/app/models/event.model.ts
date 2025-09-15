
export interface Event {
  id: string; // uuid
  title: string;
  description?: string;
  location?: string;
  startAt: string; // ISO
  endAt?: string;  // ISO
  reminders?: number[]; // minutos antes => [1440, 60, 15]
  color?: string; // color hex #RRGGBB
  category?: string; // categoría del evento
}


