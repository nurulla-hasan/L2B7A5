export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceWithRelations extends Service {
  category: { id: string; name: string };
  technician: { id: string; name: string };
}
