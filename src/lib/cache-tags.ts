export const CACHE_TAGS = {
  categories: "categories",
  services: "services",
  service: (id: string) => `service-${id}`,
  technicians: "technicians",
  technician: (id: string) => `technician-${id}`,
  user: "user",
} as const;

export const CACHE_TIME = {
  fiveMinutes: 300,
  hour: 3600,
  day: 86400,
} as const;
