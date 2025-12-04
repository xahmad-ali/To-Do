export interface Event {
  id: string;
  name: string;
  phoneNumber: string;
  dateTime: string;
  location: string;
  costPerPerson: string;
  description: string;
  flyerImage: string | null;
  backgroundImage: string | null;
  capacity?: number;
  photoGallery: string[];
  links: Link[];
  customModules: CustomModule[];
  privacy?: string;
  announcements?: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
}

export interface CustomModule {
  id: string;
  type: 'checklist' | 'announcement' | 'sparkle' | 'link' | 'photo';
  title: string;
  content: string;
}
