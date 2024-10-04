// src/types/dashboard.ts

export interface Creator {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
  supporters: Supporter[];
  donations: Donation[];
}

export interface Supporter {
  id: string;
  name: string | null;
  email: string | null;
  creatorId: string;
  creator: Creator;
  donations: Donation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  amount: number;
  message: string | null;
  supporterId: string;
  supporter: Supporter;
  creatorId: string;
  creator: Creator;
  createdAt: Date;
  updatedAt: Date;
}
