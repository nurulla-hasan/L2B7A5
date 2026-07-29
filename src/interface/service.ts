export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  categoryId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  category: { id: string; name: string };
  technician: {
    id: string;
    name: string;
    technicianProfile?: {
      availability?: Record<string, string[]>;
    };
  };
}
