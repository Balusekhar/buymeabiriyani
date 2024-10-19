// src/types/dashboard.ts

export interface Creator {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  profilePhoto: string | null;
  coverPhoto: string | null;
  createdAt: Date;
  updatedAt: Date;
  donations: Donation[];
}

export interface Supporter {
  id: string;
  name: string | null;
  email: string | null;
  donations: Donation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  amount: number;
  message: string | null;
  paymentStatus: string | null;
  stripeSessionId: string | null;
  supporterId: string;
  supporter: Supporter;
  creatorId: string;
  creator: Creator;
  createdAt: Date;
  updatedAt: Date;
}
