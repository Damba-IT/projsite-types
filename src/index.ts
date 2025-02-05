import { ObjectId, Db } from 'mongodb';

// Common Types & Enums
export type ProjectStatus = 'active' | 'inactive' | 'deleted';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'deleted';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'cash' | 'bank_transfer' | 'digital_wallet';

// Settings Interfaces
export interface OrganizationSettings {
  warehouse_module: boolean;
}

export interface ProjectSettings {
  waste_booking_color: string;
  resource_booking_color: string;
  information: string;
  shipment_module: boolean;
  checkpoint_module: boolean;
  warehouse_module: boolean;
  waste_module: boolean;
  inbox_module: boolean;
  auto_approval: boolean;
  waste_auto_approval: boolean;
  sub_projects_enabled: boolean;
}

export interface FormValidationRules {
  shipment_booking: {
    contractor: boolean;
    responsible_person: boolean;
    supplier: boolean;
    unloading_zone: boolean;
    prevent_zone_collide: boolean;
    sub_project: boolean;
    resources: boolean;
    env_data: boolean;
  };
  resource_booking: {
    contractor: boolean;
    responsible_person: boolean;
    sub_project: boolean;
    resources: boolean;
  };
  waste_booking: {
    sub_project: boolean;
    waste: boolean;
  };
}

// Core Entity Interfaces
export interface Organization {
  _id?: ObjectId;
  name: string;
  active: boolean;
  is_deleted: boolean;
  logo?: string;
  settings: OrganizationSettings;
  created_by_user?: string;
  created_by_service?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  _id?: ObjectId;
  project_id: string;
  name: string;
  organization_id: ObjectId;
  start_date: Date;
  end_date: Date;
  status: ProjectStatus;
  location_address?: string;
  location_formatted_address?: string;
  location_place_id?: string;
  location_lat?: string;
  location_lng?: string;
  created_by: string;
  last_modified_by?: string;
  created_at: Date;
  updated_at: Date;
  settings: ProjectSettings;
  form_validation_rules: FormValidationRules;
}

export interface User {
  _id?: ObjectId;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  old_phone_number?: string;
  password?: string;
  organization_id?: ObjectId;
  super_admin: boolean;
  image?: string;
}

// Ninja Order Types
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface NinjaOrder {
  _id?: ObjectId;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  notes?: string;
  created_by: string;
  last_modified_by?: string;
  created_at: Date;
  updated_at: Date;
}

// API-specific types (for MongoDB API)
export interface MongoHonoEnv {
  Bindings: {
    MONGODB_URI: string;
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
  };
  Variables: {
    db: Db;
  };
}

// Re-export all types and schemas
export * from './types';
export * from './schemas'; 