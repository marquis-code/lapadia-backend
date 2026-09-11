export class CreateEventDto {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  status?: string;
}

export class UpdateEventDto {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  status?: string;
}
