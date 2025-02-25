export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  identificationNumber: string;
  identificationType: 'nationalId' | 'passport';
  isAirportPickup: boolean;
  airportPickupLocation?: string;
  createdAt: string;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  expiryDate: string;
  createdBy: string;
  status: 'active' | 'inactive';
  memberLimit: number;
  monthlyTarget: number;
  planType: 'bronze' | 'silver' | 'gold' | 'platinum';
  createdAt: string;
  updatedAt: string;
}

export interface CardMember {
  id: string;
  cardId: string;
  userId: string;
  status: 'pending' | 'active';
  joinedAt: string;
  user: User;
}

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  merchantName: string;
  status: 'pending' | 'completed' | 'failed';
  splitAmount: number;
  initiatedAt: string;
  completedAt?: string;
}

export interface PricingPlan {
  id: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  memberLimit: number;
  monthlyFee: number;
  features: string[];
  recommended?: boolean;
}