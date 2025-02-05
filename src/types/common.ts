import { ObjectId } from 'mongodb';

// Status Types
export type ProjectStatus = 'active' | 'inactive' | 'deleted';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'deleted';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'cash' | 'bank_transfer' | 'digital_wallet';

// Common Base Types
export interface BaseEntity {
  _id?: ObjectId;
  created_at: Date;
  updated_at: Date;
  created_by_user?: string;
  created_by_service?: string;
  last_modified_by?: string;
} 